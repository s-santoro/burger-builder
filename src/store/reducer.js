import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0
  },
  totalPrice: 6
};

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 1.5,
  bacon: 1.75,
  meat: 2.4
};

const reducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default reducer;