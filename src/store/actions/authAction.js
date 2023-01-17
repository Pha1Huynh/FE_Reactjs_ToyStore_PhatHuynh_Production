import actionTypes from './actionTypes';
import { logout, refreshTokenApi, login } from '~/services/clientService';
import { toast } from 'react-toastify';

export const handleLogin = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await login(data);

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          tokens: res.tokens,
          user: res.user,
        });
        toast.success(res.errMessage);
      } else {
        dispatch({
          type: actionTypes.LOGIN_FAILED,
        });
        toast.error(res.errMessage);
      }
    } catch (e) {
      dispatch({
        type: actionTypes.LOGIN_FAILED,
      });
      toast.error('Oops, something went wrong');
    }
  };
};
export const handleLogout = (refreshToken) => {
  return async (dispatch, getState) => {
    try {
      let res = await logout(refreshToken);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.LOGOUT_SUCCESS,
          data: res.tokens,
        });
        toast.success(res.errMessage);
      } else {
        dispatch({
          type: actionTypes.LOGOUT_FAILED,
        });
        toast.error('Opps, Some thing went wrong, please login again');
      }
    } catch (e) {
      dispatch({
        type: actionTypes.LOGOUT_FAILED,
      });
      toast.error('Opps, Something went wrong...');
    }
  };
};

export const handleRefreshToken = (refreshToken) => {
  return async (dispatch, getState) => {
    try {
      console.log('Call API');
      let res = await refreshTokenApi(refreshToken);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.REFRESH_TOKEN_SUCCESS,
          tokens: res.tokens,
          user: res.user,
        });

        return res;
      } else {
        dispatch({
          type: actionTypes.REFRESH_TOKEN_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.REFRESH_TOKEN_FAILED,
      });
    }
  };
};
