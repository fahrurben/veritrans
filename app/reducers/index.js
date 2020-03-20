import { combineReducers } from 'redux';
import RegisterReducer from './RegisterReducer';
import LoginReducer from './LoginReducer';
import TransactionConfirmationReducer from './TransactionConfirmationReducer';
import TransactionListReducer from './TransactionListReducer';

const reducers = combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  transConfirm: TransactionConfirmationReducer,
  transList: TransactionListReducer,
});

export default reducers;