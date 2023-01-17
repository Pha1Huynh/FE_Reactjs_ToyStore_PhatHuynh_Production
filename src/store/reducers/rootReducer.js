import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import clientReducer from './clientReducer';
import authReducer from './authReducer';
const rootReducer = combineReducers({
  admin: adminReducer,
  client: clientReducer,
  auth: authReducer,
});
export default rootReducer;
