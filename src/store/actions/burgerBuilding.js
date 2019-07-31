import * as actionTypes from "./actionTypes";
import axios from "../../Axios-orders";

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { ingredient: ingredient}
  }
};

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: { ingredient: ingredient}
  }
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: {ingredients: ingredients}
  }
};

export const initIngredientsFailed = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS_FAILED,
  }
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(res => {
        return dispatch(setIngredients(res.data));
      })
      .catch(err => {
        console.log(err);
        return dispatch(initIngredientsFailed());
      });
  }
};