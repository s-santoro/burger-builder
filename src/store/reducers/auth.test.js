import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

  const initialState = {
    token: null,
    userID: null,
    error: null,
    loading: null,
    authRedirectPath: '/'
  };

  it('should return initial state when new state undefined', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return auth-credentials', () => {
    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      payload: {
        token: 'token-XY',
        userID: 'userID-XY'
      }
    })).toEqual({
      token: 'token-XY',
      userID: 'userID-XY',
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should return an error', () => {
    expect(reducer(initialState, {
      type: actionTypes.AUTH_FAIL,
      error: 'some-error'
    })).toEqual({
      token: null,
      userID: null,
      error: 'some-error',
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should return all credentials with null', () => {
    expect(reducer(initialState, {type: actionTypes.AUTH_LOGOUT})).toEqual({
      token: null,
      userID: null,
      error: null,
      loading: null,
      authRedirectPath: '/'
    });
  });

  it('should return new Path', () => {
    expect(reducer(initialState, {
      type: actionTypes.SETH_AUTH_REDIRECT_PATH,
      payload: {
        path: 'some-path'
      }
    })).toEqual({
      token: null,
      userID: null,
      error: null,
      loading: null,
      authRedirectPath: 'some-path'
    });
  });
});