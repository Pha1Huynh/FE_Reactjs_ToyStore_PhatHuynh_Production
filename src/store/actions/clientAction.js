import actionTypes from './actionTypes';
import {
  getAllToy,
  addItemToCart,
  getCartByUserId,
  deleteItemFromCart,
  payItemFromCart,
} from '~/services/clientService';
import { toast } from 'react-toastify';
//get all toy
export const fetchAllToy = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllToy();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_TOY_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_TOY_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALL_TOY_FAILED,
      });
    }
  };
};
//add item to cart
export const handleAddItemToCart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await addItemToCart(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.ADD_ITEM_TO_CART_SUCCESS,
        });
        dispatch(fetchCartByUserId());
        if (data.number < 0) {
          toast.success('Remove item success');
        }
        if (data.number > 0) {
          toast.success('Add to cart success');
        }
      } else {
        dispatch({
          type: actionTypes.ADD_ITEM_TO_CART_FAILED,
        });
        toast.error('Add to cart failed');
      }
    } catch (e) {
      dispatch({
        type: actionTypes.ADD_ITEM_TO_CART_FAILED,
      });
      toast.error('Oops, something went wrong');
    }
  };
};
//get cart by user id
export const fetchCartByUserId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getCartByUserId();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_CART_BY_USER_ID_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_CART_BY_USER_ID_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_CART_BY_USER_ID_FAILED,
      });
    }
  };
};
//delete item from cart
export const handleDeleteItemFromCart = (toyId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteItemFromCart(toyId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.DELETE_ITEM_FROM_CART_SUCCESS,
          data: res.data,
        });
        toast.success('Remove item from cart success');
      } else {
        dispatch({
          type: actionTypes.DELETE_ITEM_FROM_CART_FAILED,
        });
        toast.error('Remove item from cart failed');
      }
    } catch (e) {
      dispatch({
        type: actionTypes.DELETE_ITEM_FROM_CART_FAILED,
      });
      console.log('some thiong wrong', e);
      toast.error('Oops, something went wrong');
    }
  };
};
export const handlePayItemFromCart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await payItemFromCart();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.PAY_ITEM_FROM_CART_SUCCESS,
          data: res.data,
        });
        dispatch(fetchCartByUserId());
        toast.success('Pay success');
      } else {
        dispatch({
          type: actionTypes.PAY_ITEM_FROM_CART_FAILED,
        });
        toast.error('Pay failed');
      }
    } catch (e) {
      dispatch({
        type: actionTypes.PAY_ITEM_FROM_CART_FAILED,
      });
      toast.error('Oops, something went wrong');
    }
  };
};
