import React, {Component} from 'react';
import {Route} from "react-router";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const newIngredients = {};
    let price = 0;
    // Iterator which returns on each step: ["ingredient", "amount"]
    for(let q of query.entries()) {
      // + in front of amount to convert it to number
      if(q[0] === 'price') {
        price = q[1];
      }
      else {
        newIngredients[q[0]] = +q[1];
      }
    }
    this.setState({ingredients: newIngredients, price: price});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };


  render() {
    // language=HTML
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        {/* instead of using component we use render for an arrow-function, which returns the component with props */}
        {/* trick to pass probs while using Route */}
       <Route path={`${this.props.match.path}/contact-data`} render={(props) => {
         return (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>);
       }}/>
      </div>
    );
  }
}

export default Checkout;