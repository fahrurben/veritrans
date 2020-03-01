import { combineReducers } from 'redux';
import RegisterReducer from './RegisterReducer';

const reducers = combineReducers({
  register: RegisterReducer
});

export default reducers;