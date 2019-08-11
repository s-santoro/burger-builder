import * as actionTypes from './actionTypes';
import axios from 'axios';

const SIGN_IN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGe6SoqVWIrS5t4HmQa5qB1SQ3USlhGeM';
const SIGN_UP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGe6SoqVWIrS5t4HmQa5qB1SQ3USlhGeM';

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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userID');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};

export const checkTokenExpiration = (expirationTime) => {
  const expirationTimeInMillsec = expirationTime * 1000;
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, expirationTimeInMillsec);
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
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationTime', expirationDate);
        localStorage.setItem('userID', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkTokenExpiration(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  }
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SETH_AUTH_REDIRECT_PATH,
    payload: {
      path: path
    }
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(authLogout());
    }
    else {
      const expirationTime = new Date(localStorage.getItem('expirationTime'));
      if (expirationTime < new Date()) {
        dispatch(authLogout());
      }
      else {
        const userID = localStorage.getItem('userID');
        dispatch(authSuccess(token, userID));
        // divide time difference to get seconds
        dispatch(checkTokenExpiration((expirationTime.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
};
