import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  /**
   * Function TransformedIngredients
   * Function to return <BurgerIngredient> with correct type.
   * First create an array similar to ["salad", "meat", ...].
   * Then use spread to create new array for each ingredient with length equal to amount of that ingredient.
   * Map over new array and return ingredient with type and key.
   * Key was combined with index of new array to avoid console.error (sibling-components need unique key).
   * At the end, the returned array consisting of BurgerIngredient-components ist flatted with reduce.
   * Flatted array is needed, to check how many ingredients are used (if ingredients = 0 => set message).
   * @type {string[]}
   */
  let transformedIngredients = Object.keys(props.ingredients)
    .map(
      ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
          return <BurgerIngredient key={ingredientKey + i} type={ingredientKey}/>
        });
      }
    ).reduce((arr, elem) => {
      return arr.concat(elem);
    }, []);
    //.flat();  // flat ist experimental, but does the same as reduce

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"}/>
      {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"}/>
    </div>
  );

};

export default burger;