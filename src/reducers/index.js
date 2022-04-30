import {combineReducers} from 'redux';
import CustomerAuthReducer from './CustomerAuthReducer';

// import customerOrders from './dis/customerOrders';

export default combineReducers({
  customerAuth: CustomerAuthReducer,
  // custOrders: customerOrders,
});
