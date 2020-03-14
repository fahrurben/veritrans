import { combineReducers } from 'redux';
import RegisterReducer from './RegisterReducer';
import LoginReducer from './LoginReducer';
import TransactionConfirmationReducer from './TransactionConfirmationReducer';

const reducers = combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  transConfirm: TransactionConfirmationReducer
});

export default reducers;