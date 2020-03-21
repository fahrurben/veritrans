import { 
  HOME_LIST_GET_DATA,
  HOME_LIST_GET_DATA_DONE,
} from '../Constants';

const initialState = {
  arrTransaction: [],
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case HOME_LIST_GET_DATA:
      return {
        ...state,
        loading: true,
      }
    case HOME_LIST_GET_DATA_DONE: 
      return {
        ...state,
        arrTransaction: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}

export default reducer;