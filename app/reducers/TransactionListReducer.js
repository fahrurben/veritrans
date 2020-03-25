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
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TRANS_LIST_GET_DATA:
      return {
        ...state,
        loading: true,
      }
    case TRANS_LIST_GET_DATA_DONE: 
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