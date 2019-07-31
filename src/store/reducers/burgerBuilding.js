import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 6,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 1.5,
  bacon: 1.75,
  meat: 2.4
};

const burgerBuilding = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // [action.ingredientName] can be used access key
          [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // [action.ingredientName] can be used access key
          [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          // necessary mapping to have this specific order of ingredients
          salad: action.payload.ingredients.salad,
          bacon: action.payload.ingredients.bacon,
          cheese: action.payload.ingredients.cheese,
          meat: action.payload.ingredients.meat
        },
        totalPrice: 6,
        error: false
      };
    case actionTypes.INIT_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default burgerBuilding;