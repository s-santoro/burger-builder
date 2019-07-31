import * as actionTypes from './actionTypes';
import axios from '../../Axios-orders';

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
};

export const purchaseStart = () => {
  return {
    type: actionTypes.PURCHASE_START
  }
};

export const purchaseInProgress = (orderData) => {
  return dispatch => {
    dispatch(purchaseStart());
    axios.post('/orders.json', orderData)
      .then(res => {
          dispatch(purchaseSuccess(res.data.name, orderData));
        }
      ).catch(err => {
      console.log(err);
      dispatch(purchaseFail(err));
    })

  }
};

export const purchaseSuccess = (orderID, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    payload: {
      orderID: orderID,
      orderData: orderData
    }
  }
};

export const purchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error: error
  }
};

// fetching orders
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS__START
  }
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get("/orders.json")
      .then(res => {
        let fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchOrdersFail(err));
      });
  }

};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS__SUCCESS,
    payload: {
      orders: orders
    }
  }
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS__FAIL,
    error: error
  }
};