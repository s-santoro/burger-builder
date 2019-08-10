import React, {Component} from 'react';
import axios from '../../../Axios-orders';
import {connect} from "react-redux";

import errorWrapper from '../../../hoc/Aux/errorWrapper';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import {purchaseInProgress} from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderDetails: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Postal Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: ['standard', 'express', 'prime']
        },
        validation: {},
        value: 'standard',
        valid: true
      },
    },
    formIsValid: false
  };

  orderHandler = (event) => {
    // avoid page reloading by form submission
    event.preventDefault();
    this.setState({ loading: true });
    // create key-value of orderDetails {"email": "test@test.com"}
    let orderDetails = {};
    for(let key in this.state.orderDetails) {
      orderDetails[key] = this.state.orderDetails[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderDetails: orderDetails,
      userID: this.props.userID
    };
    this.props.onPurchase(order, this.props.token);
  };

  changeHandler = (event, inputIdentifier) => {
    // create deep-clone of orderDetails by first creating a shallow clone
    let newOrderDetails = {...this.state.orderDetails};
    // then create shallow clone of the correct input (i.e. email)
    let detailInfo = {...newOrderDetails[inputIdentifier]};
    // then change value of new input clone
    detailInfo.value = event.target.value;
    // check validity
    detailInfo.valid = this.checkValidation(detailInfo.value, detailInfo.validation);
    // then change input from orderDetails clone with the updated input
    newOrderDetails[inputIdentifier] = detailInfo;
    // check if all are valid
    let formIsValid = true;
    for(let detail in newOrderDetails) {
      formIsValid = newOrderDetails[detail].valid && formIsValid;
    }
    // finally set state
    this.setState({orderDetails: newOrderDetails, formIsValid: formIsValid});
  };

  checkValidation = (value, rules) => {
    let isValid = true;
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
      isValid = value.replace(/ /g, '').length >= rules.minLength && isValid
    }
    if(rules.maxLength) {
      isValid = value.replace(/ /g, '').length <= rules.maxLength && isValid
    }
    if(rules.isEmail) {
      isValid = (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g).test(value) && isValid
    }
    return isValid;
  };

  render() {
    let formArray = [];
    for (let key in this.state.orderDetails) {
      formArray.push({
        id: key,
        config: this.state.orderDetails[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formArray.map(item => {
          return (
            <Input
              key={item.id}
              id={item.id}
              elementType={item.config.elementType}
              elementConfig={item.config.elementConfig}
              value={item.config.value}
              changed={(event) => {this.changeHandler(event, item.id)}}
              valid={item.config.valid}
              shouldValidate={item.config.validation}
            />
          );
        })}
        <Button
          btnType={"Success"}
          disabled={!this.state.formIsValid}
        >Order</Button>
      </form>
    );
    if(this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilding.ingredients,
    price: state.burgerBuilding.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchase: (orderData, token) => dispatch(purchaseInProgress(orderData, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorWrapper(ContactData, axios));