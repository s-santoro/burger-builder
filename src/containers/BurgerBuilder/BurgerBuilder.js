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
      totalPrice: 6
    }
  }

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
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;