import React, {Component} from 'react';
import {Route} from "react-router";
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
    return (
      <div>
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
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
};

export default connect(mapStateToProps)(Checkout);