import { 
  TRANS_CONFIRM_INITIAL,
  TRANS_CONFIRM_GET_ALL_BANK, 
  TRANS_CONFIRM_SUBMITTING, 
  TRANS_CONFIRM_SUBMITTED, 
  STATUS_SUCCESS,
  SUBMITTING,
  SUBMITTED,
} from '../Constants';

const initialState = {
  arrBank: [],
  loading: false,
  formState: '',
  status: STATUS_SUCCESS,
  message: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case TRANS_CONFIRM_INITIAL: 
      return {
        ...state,
        loading: false,
        formState: null,
        status: null,
        message: ''
      }
    case TRANS_CONFIRM_GET_ALL_BANK:
      return {
        ...state,
        arrBank: action.payload,
      }
    case TRANS_CONFIRM_SUBMITTING:
      return {
        ...state,
        loading: true,
        formState: SUBMITTING,
      }
    case TRANS_CONFIRM_SUBMITTED:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
        formState: SUBMITTED,
      }
    default:
      return state;
  }
}

export default reducer;