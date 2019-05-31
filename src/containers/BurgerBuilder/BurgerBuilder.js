import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';



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
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 6,
      purchasable: false
    }
  }

  updatePurchasable = (prevIngredients) => {
    const sum = Object.keys(prevIngredients)
      .map(key => {
        return prevIngredients[key];
      })
      .reduce((acc, sum) => {
        return acc + sum;
      }, 0);
    this.setState({purchasable: sum > 0});
  };

  addIngredient = (type) => {
    const oldInCount = this.state.ingredients[type];
    const updatedCount = oldInCount + 1;
    // create clone of ingredients for safer updating
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    // update state
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    // call updateIngredients with newest state of ingredients
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredient = (type) => {
    const oldInCount = this.state.ingredients[type];
    if (oldInCount <= 0){
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
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    // call updateIngredients with newest state of ingredients
    this.updatePurchasable(updatedIngredients);
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

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients }/>
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;