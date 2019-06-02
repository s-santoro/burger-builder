import React from 'react';

import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}
          </span>: {props.ingredients[igKey]}
        </li>
      );
    })

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total Price: <strong>{props.totalPrice.toFixed(2)} $</strong></p>
      <p>Continue with Checkout?</p>
      <Button btnType={"Danger"} clicked={props.cancelOrder}>CANCEL</Button>
      <Button btnType={"Success"} clicked={props.continueOrder}>CONTINUE</Button>
    </Aux>
  );


};

export default orderSummary;