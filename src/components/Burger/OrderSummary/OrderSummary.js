import React, {Component} from 'react';

import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux/Aux';

/**
 * Lifecylce Hooks were used, to improve performance of rendering.
 *
 */
class OrderSummary extends Component {

  // Used to check when OrderSummary will be updated.
  // As soon as ingredients are added, Modal updates OrderSummary even though it's not shown.
  // Only updating OrderSummary when Modal will be shown, improves performance.
  componentWillUpdate(nextProps, nextState, nextContext) {
  }

  render() {

    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}
          </span>: {this.props.ingredients[igKey]}
          </li>
        );
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Total Price: <strong>{this.props.totalPrice.toFixed(2)} $</strong></p>
        <p>Continue with Checkout?</p>
        <Button btnType={"Danger"} clicked={this.props.cancelOrder}>CANCEL</Button>
        <Button btnType={"Success"} clicked={this.props.continueOrder}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;