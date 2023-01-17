import actionTypes from '../actions/actionTypes';
const initialState = {
  allToy: [],
  isLogin: false,
  cartByUserId: [],
};
const clientReducer = (state = initialState, action) => {
  let copyState = {};
  switch (action.type) {
    //client-get-all-toy
    case actionTypes.FETCH_ALL_TOY_SUCCESS:
      copyState = { ...state };
      copyState.allToy = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_TOY_FAILED:
      copyState = { ...state };
      copyState.allToy = [];
      return {
        ...copyState,
      };
    //client-get-cart-by-user-id
    case actionTypes.FETCH_CART_BY_USER_ID_SUCCESS:
      copyState = { ...state };
      copyState.cartByUserId = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_CART_BY_USER_ID_FAILED:
      copyState = { ...state };
      copyState.cartByUserId = [];
      return {
        ...copyState,
      };
    //add item to cart
    case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
      copyState = { ...state };

      return {
        ...copyState,
      };
    case actionTypes.ADD_ITEM_TO_CART_FAILED:
      return {
        ...state,
      };
    case actionTypes.DELETE_ITEM_FROM_CART_SUCCESS:
      copyState = { ...state };
      let newData = copyState.cartByUserId.filter((item, index) => {
        return item.toyId !== action.data.toyId;
      });
      copyState.cartByUserId = [...newData];
      return { ...copyState };
    case actionTypes.DELETE_ITEM_FROM_CART_FAILED:
      return { ...state };
    default:
      return state;
  }
};

export default clientReducer;
