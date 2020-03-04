import { combineReducers } from 'redux';
import RegisterReducer from './RegisterReducer';
import LoginReducer from './LoginReducer';

const reducers = combineReducers({
  register: RegisterReducer,
  login: LoginReducer
});

export default reducers;