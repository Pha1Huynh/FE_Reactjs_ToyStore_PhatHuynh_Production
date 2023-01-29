import actionTypes from './actionTypes';
import { getToy, getAllCodesByType, getToyById, updateToy, createANewToy, getAllToy } from '~/services/adminService';
import { toast } from 'react-toastify';
//get short toy
export const fetchDataShortToy = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getToy('SHORT');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOY_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOY_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TOY_FAILED,
      });
    }
  };
};
//get toytype on table allcode
export const fetchAllCodesToyType = () => async (dispatch) => {
  try {
    let res = await getAllCodesByType('TOYTYPE');
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.FETCH_ALLCODES_BY_TYPE_SUCCESS,
        data: res.data,
      });
    } else {
      dispatch({
        type: actionTypes.FETCH_ALLCODES_BY_TYPE_FAILED,
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.FETCH_ALLCODES_BY_TYPE_FAILED,
    });
  }
};
//get toy by id
export const fetchToyById = (id) => async (dispatch) => {
  try {
    let res = await getToyById(id);
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.FETCH_TOY_BY_ID_SUCCESS,
        data: res.data,
      });
    } else {
      dispatch({
        type: actionTypes.FETCH_TOY_BY_ID_FAILED,
      });
    }
    return res;
  } catch (e) {
    dispatch({
      type: actionTypes.FETCH_TOY_BY_ID_FAILED,
    });
  }
};
export const handleUpdateToy = (data) => async (dispatch) => {
  try {
    let res = await updateToy(data);
    if (res && res.errCode === 0) {
      toast.success('Update Toy Success');
    } else {
      toast.error('Update Toy failed');
    }
  } catch (e) {
    toast.error('Update Toy failed');
  }
};
export const handleCreateToy = (data) => async (dispatch) => {
  try {
    let res = await createANewToy(data);
    if (res && res.errCode === 0) {
      dispatch(fetchDataShortToy());
      toast.success('Create Toy Success');
    } else {
      toast.error('Create Toy failed');
    }
  } catch (e) {
    toast.error('Create Toy failed');
  }
};
