import React, {Component} from 'react';
import Axios from '../../Axios-orders';

import Order from '../../components/Order/Order';
import errorWrapper from "../../hoc/Aux/errorWrapper";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    Axios.get("/orders.json")
      .then(res => {
        let fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({orders: fetchedOrders, loading: false});
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return (
            <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />);
        })}
      </div>
    );
  }
}

export default errorWrapper(Orders, Axios);