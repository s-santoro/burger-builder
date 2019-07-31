import React, {Component} from 'react';
import {Redirect, Route} from "react-router";
import {connect} from "react-redux";

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };


  render() {
    // redirect to starting page when ingredients aren't loaded yet
    let summary = <Redirect to={'/'}/>;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to={'/'}/> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          {/* instead of using component we use render for an arrow-function, which returns the component with props */}
          {/* trick to pass probs while using Route ===> with redux this is unnecessary */}
          <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilding.ingredients,
    // purchaseInit action is dispatched in the burgerBuilder right before continuing to checkout
    // in order to have the right state when checkout renders
    purchased: state.order.purchased
  }
};

export default connect(mapStateToProps)(Checkout);