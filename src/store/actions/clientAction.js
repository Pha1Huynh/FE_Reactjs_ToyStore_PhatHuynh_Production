import actionTypes from './actionTypes';
import { getAllToy } from '~/services/adminService';

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
