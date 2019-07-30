import React, { Component } from "react";
import axios from "../../Axios-orders";
import {connect} from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorWrapper from "../../hoc/Aux/errorWrapper";
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasable: false,
      ordered: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({error: true});
      });
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
    this.setState({ ordered: true });
  };

  cancelOrder = () => {
    this.setState({ ordered: false });
  };

  continueOrder = () => {
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
    let burger = this.state.error ? <p style={{textAlign: "center"}}>Ingredients can't be loaded!</p> : <Spinner />;
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
    if (this.state.loading) {
      orderSummary = <Spinner />;
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredient) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      payload: { ingredient: ingredient}
    }),
    onIngredientRemoved: (ingredient) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      payload: { ingredient: ingredient}
    }),
  }
};

// export of component is wrapped in an error-handling HOC which shows a modal with the error message
export default connect(mapStateToProps, mapDispatchToProps)(errorWrapper(BurgerBuilder, axios));
