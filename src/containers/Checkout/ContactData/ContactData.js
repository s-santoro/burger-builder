import React, {Component} from 'react';
import Axios from '../../../Axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderDetails: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: ''
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Postal Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: ['standard', 'express', 'prime']
        },
        value: ''
      },
    },
    loading: false
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
      orderDetails: orderDetails
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

  changeHandler = (event, inputIdentifier) => {
    // create deep-clone of orderDetails by first creating a shallow clone
    let newOrderDetails = {...this.state.orderDetails};
    // then create shallow clone of the correct input (i.e. email)
    let detailInfo = {...newOrderDetails[inputIdentifier]};
    // then change value of new input clone
    detailInfo.value = event.target.value;
    // then change input from orderDetails clone with the updated input
    newOrderDetails[inputIdentifier] = detailInfo;
    // finally set state
    this.setState({orderDetails: newOrderDetails});
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
              elementType={item.config.elementType}
              elementConfig={item.config.elementConfig}
              value={item.config.value}
              changed={(event) => {this.changeHandler(event, item.id)}}
            />
          );
        })}
        <Button
          btnType={"Success"}
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