import { 
  TRANS_LIST_INITIAL,
  TRANS_LIST_GET_DATA,
  TRANS_LIST_GET_DATA_DONE,
  STATUS_SUCCESS,
  SUBMITTING,
  SUBMITTED,
} from '../Constants';

const initialState = {
  arrTransaction: [],
  loading: false,
  status: STATUS_SUCCESS,
  message: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TRANS_LIST_INITIAL: 
      return {
        ...state,
        loading: false,
      }
    case TRANS_LIST_GET_DATA_DONE: 
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}

export default reducer;