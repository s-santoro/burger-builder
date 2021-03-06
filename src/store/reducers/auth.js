import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userID: null,
  error: null,
  loading: null,
  authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userID: action.payload.userID,
        loading: false,
        error: null
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userID: null
      };
    case actionTypes.SETH_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.payload.path
      };
    default:
      return state;
  }
};

export default reducer;