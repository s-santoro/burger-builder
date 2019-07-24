import React, {Component} from 'react';
import Axios from '../../../Axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: '',
    },
    loading: false
  };

  orderHandler = (event) => {
    // avoid page reloading by form submission
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "John Doe",
        email: "test@test.com"
      }
    };
    Axios
      .post("/orders.json", order)
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
        // history is only available because special props are passed to ContactData
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="your name"/>
        <input type="email" name="email" placeholder="your email"/>
        <input type="text" name="street" placeholder="your street"/>
        <input type="text" name="zipCode" placeholder="your zip code"/>
        <Button
          btnType={"Success"}
          clicked={this.orderHandler}
        >Order</Button>
      </form>
    );
    if(this.state.loading) {
      form = <Spinner/>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;