import { combineReducers } from 'redux';
import GlobalReducer from './GlobalReducer';
import RegisterReducer from './RegisterReducer';
import LoginReducer from './LoginReducer';
import TransactionConfirmationReducer from './TransactionConfirmationReducer';
import TransactionListReducer from './TransactionListReducer';
import HomeReducer from './HomeReducer';

const reducers = combineReducers({
  global: GlobalReducer,
  home: HomeReducer,
  register: RegisterReducer,
  login: LoginReducer,
  transConfirm: TransactionConfirmationReducer,
  transList: TransactionListReducer,
});

export default reducers;