import React, { Component } from "react";
import {connect} from "react-redux";
import axios from '../../Axios-orders';

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorWrapper from "../../hoc/Aux/errorWrapper";
import * as actions from '../../store/actions/index'


export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasable: false,
      ordered: false
    };
  }

  // on mount initialize ingredients with asynchronous actionCreator
  componentDidMount() {
    this.props.initIngredient();
  }

  updatePurchasable = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((acc, sum) => {
        return acc + sum;
      }, 0);
    return sum > 0 ;
  };

  orderBurger = () => {
    if(this.props.isAuthenticated) {
      this.setState({ ordered: true });
    }
    else {
      this.props.setAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  cancelOrder = () => {
    this.setState({ ordered: false });
  };

  continueOrder = () => {
    this.props.purchaseInit();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // creates array of {salad: true, bacon: true, cheese: true, meat: true} to track which button should
    // be disabled

    // create orderSummary to hold complete order or a spinner for indicating waiting for fetch
    // Modal checks if componentShouldUpdate in order to work, comparison of props.children must be done
    // orderSummary and burger/BuildControls depend on ingredients which are fetched
    // in oder to avoid error messages, set these components when ingredients are loaded
    let orderSummary = null;
    let burger = this.props.error ? <p style={{textAlign: "center"}}>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasable(this.props.ingredients)}
            ordering={this.orderBurger}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          continueOrder={this.continueOrder}
          cancelOrder={this.cancelOrder}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.ordered} closeModal={this.cancelOrder}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilding.ingredients,
    totalPrice: state.burgerBuilding.totalPrice,
    error: state.burgerBuilding.error,
    purchased: state.burgerBuilding.purchased,
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    initIngredient: () => dispatch(actions.initIngredients()),
    purchaseInit: () => dispatch(actions.purchaseInit()),
    setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

// export of component is wrapped in an error-handling HOC which shows a modal with the error message
export default connect(mapStateToProps, mapDispatchToProps)(errorWrapper(BurgerBuilder, axios));
