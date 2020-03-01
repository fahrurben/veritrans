import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

let middlewares = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => { 
  let store = createStore(
    persistedReducer,
    applyMiddleware(...middlewares)
  );
  
  let persistor = persistStore(store);

  return { store, persistor }
};
