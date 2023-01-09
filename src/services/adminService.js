import axios from '../axios';
const getAllUsers = () => {
  return axios.get('/api/get-all-users');
};
const getToy = (option) => {
  return axios.get(`/api/get-toy?option=${option}`);
};
const getAllCodesByType = (allcodeType) => {
  return axios.get(`/api/get-allcodes-by-type?allcodeType=${allcodeType}`);
};
const getToyById = (id) => {
  return axios.get(`/api/get-toy-by-id?id=${id}`);
};
const updateToy = (data) => {
  return axios.put(`/api/update-toy`, data);
};
const createANewToy = (data) => {
  return axios.post(`/api/create-a-new-toy`, data);
};
const getAllToy = () => {
  return axios.get(`/api/get-all-toy`);
};
export { getAllUsers, getToy, getAllCodesByType, getToyById, updateToy, createANewToy, getAllToy };
