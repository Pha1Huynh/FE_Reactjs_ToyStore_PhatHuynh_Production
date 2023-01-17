import actionTypes from '../actions/actionTypes';
const initialState = {
  tokens: [],
  userInfo: [],
};
const authReducer = (state = initialState, action) => {
  let copyState = {};
  switch (action.type) {
    //login
    case actionTypes.LOGIN_SUCCESS:
      copyState = { ...state };
      copyState.tokens = action.tokens;
      copyState.userInfo = action.user;
      return {
        ...copyState,
      };
    case actionTypes.LOGIN_FAILED:
      copyState = { ...state };
      copyState.tokens = [];
      return {
        ...copyState,
      };
    //logout
    case actionTypes.LOGOUT_SUCCESS:
      copyState = { ...state };
      copyState = {};
      return {
        ...copyState,
      };
    case actionTypes.LOGOUT_FAILED:
      copyState = { ...state };
      copyState = {};
      return {
        ...copyState,
      };
    //get userinfo

    //refresh token
    case actionTypes.REFRESH_TOKEN_SUCCESS:
      copyState = { ...state };
      copyState.tokens = action.tokens;
      copyState.userInfo = action.user;
      return {
        ...copyState,
      };
    case actionTypes.REFRESH_TOKEN_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
