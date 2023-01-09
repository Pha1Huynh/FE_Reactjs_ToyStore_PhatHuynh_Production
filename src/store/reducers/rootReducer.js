import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import clientReducer from './clientReducer';
const rootReducer = combineReducers({
  admin: adminReducer,
  client: clientReducer,
});
export default rootReducer;
