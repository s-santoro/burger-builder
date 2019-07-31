import * as actionTypes from './actionTypes';
import axios from 'axios';

const SIGN_IN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLjeLDgXkB5BmyexrnTlKBA2lz35j099c';
const SIGN_UP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLjeLDgXkB5BmyexrnTlKBA2lz35j099c';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (token, id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      userID: id
    }
  }
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};

export const checkTokenExpiration = (expirationTime) => {
  const expirationTimeInSeconds = expirationTime * 1000;
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, expirationTimeInSeconds);
  }
};

export const auth = (email, password, signUp) => {
  return dispatch => {
    dispatch(authStart());
    const authBody = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = SIGN_UP;
    if (!signUp) {
      url = SIGN_IN;
    }
    axios.post(url, authBody)
      .then(res => {
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkTokenExpiration(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  }
};