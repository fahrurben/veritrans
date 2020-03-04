import { 
  LOGIN_INITIAL,
  LOGIN_GET_ALL_DAYAH, 
  LOGIN_SUBMITTING, 
  LOGIN_SUBMITTED, 
  STATUS_SUCCESS,
  SUBMITTING,
  SUBMITTED,
} from '../Constants';

const initialState = {
  arrDayah: [],
  loading: false,
  formState: '',
  status: STATUS_SUCCESS,
  message: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_INITIAL: 
      return {
        ...state,
        loading: false,
        formState: null,
        status: null,
        message: ''
      }
    case LOGIN_GET_ALL_DAYAH:
      return {
        ...state,
        arrDayah: action.payload,
      }
    case LOGIN_SUBMITTING:
      return {
        ...state,
        loading: true,
        formState: SUBMITTING,
      }
    case LOGIN_SUBMITTED:
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