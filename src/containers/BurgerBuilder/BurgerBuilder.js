import React, { Component } from "react";
import axios from "../../Axios-orders";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorWrapper from "../../hoc/Aux/errorWrapper";

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 1.5,
  bacon: 1.75,
  meat: 2.4
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 6,
      purchasable: false,
      ordered: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    axios
      .get("https://burger-builder-24571.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({error: true});
      });
  }

  updatePurchasable = prevIngredients => {
    const sum = Object.keys(prevIngredients)
      .map(key => {
        return prevIngredients[key];
      })
      .reduce((acc, sum) => {
        return acc + sum;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredient = type => {
    const oldInCount = this.state.ingredients[type];
    const updatedCount = oldInCount + 1;
    // create clone of ingredients for safer updating
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    // update state
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

    // call updateIngredients with newest state of ingredients
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredient = type => {
    const oldInCount = this.state.ingredients[type];
    if (oldInCount <= 0) {
      return;
    }
    const updatedCount = oldInCount - 1;
    // create clone of ingredients for safer updating
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    // update state
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

    // call updateIngredients with newest state of ingredients
    this.updatePurchasable(updatedIngredients);
  };

  orderBurger = () => {
    this.setState({ ordered: true });
  };

  cancelOrder = () => {
    this.setState({ ordered: false });
  };

  continueOrder = () => {
    this.setState({ loading: true });
    console.log("continue order");
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "John Doe",
        email: "test@test.com"
      }
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        console.log(res);
        this.setState({ loading: false, ordered: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false, ordered: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
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
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredient}
            removeIngredient={this.removeIngredient}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordering={this.orderBurger}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          continueOrder={this.continueOrder}
          cancelOrder={this.cancelOrder}
          totalPrice={this.state.totalPrice}
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

// export of component is wrapped in an error-handling HOC which shows a modal with the error message
export default errorWrapper(BurgerBuilder, axios);
