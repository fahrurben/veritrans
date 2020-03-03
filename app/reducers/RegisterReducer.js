import { 
  REGISTER_INITIAL,
  REGISTER_GET_ALL_DAYAH, 
  REGISTER_SUBMITTING, 
  REGISTER_SUBMITTED, 
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
    case REGISTER_INITIAL: 
      return {
        ...state,
        loading: false,
        formState: null,
        status: null,
        message: ''
      }
    case REGISTER_GET_ALL_DAYAH:
      return {
        ...state,
        arrDayah: action.payload,
      }
    case REGISTER_SUBMITTING:
      return {
        ...state,
        loading: true,
        formState: SUBMITTING,
      }
    case REGISTER_SUBMITTED:
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