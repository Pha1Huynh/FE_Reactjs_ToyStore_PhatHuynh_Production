import axios from '../axios';
import axios2 from '../axios2';
const getAllToy = () => {
  return axios.get(`/api/get-all-toy`);
};
const createNewUser = (data) => {
  return axios.post('/api/create-new-user', data);
};
const login = (data) => {
  return axios.post(`/api/login`, data);
};
const logout = (refreshToken) => {
  return axios.post(`/api/logout`, refreshToken);
};
const refreshTokenApi = (refreshToken) => {
  return axios.post('/api/refresh-access-token', refreshToken);
};
const addItemToCart = (data) => {
  return axios2.post('/api/add-item-to-cart', data);
};
const getCartByUserId = () => {
  return axios2.get('/api/get-cart-by-user-id');
};
const deleteItemFromCart = (toyId) => {
  return axios2.delete(`/api/delete-item-from-cart?toyId=${toyId}`);
};
const payItemFromCart = () => {
  return axios2.patch(`/api/pay-item-from-cart`);
};
export {
  getAllToy,
  createNewUser,
  login,
  logout,
  refreshTokenApi,
  addItemToCart,
  getCartByUserId,
  deleteItemFromCart,
  payItemFromCart,
};
