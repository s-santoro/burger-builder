import React, {Component} from 'react';
import Axios from '../../Axios-orders';
import {connect} from "react-redux";

import * as actions from '../../store/actions/index';
import Order from '../../components/Order/Order';
import errorWrapper from "../../hoc/Aux/errorWrapper";
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    this.props.fetchingOrders(this.props.token, this.props.userID);
  }

  render() {
    let orders = <Spinner/>;
    if (!this.props.loading) {
      orders = (
        this.props.orders.map(order => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />);
        })
      );
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchingOrders: (token, userID) => dispatch(actions.fetchOrders(token, userID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorWrapper(Orders, Axios));