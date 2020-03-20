import { 
  STATUS_SUCCESS,
  LOGIN_SUBMITTED,
  LOGOUT,
} from '../Constants';

const initialState = {
  isAuthenticated: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUBMITTED: 
      if (action.payload.status == STATUS_SUCCESS) {
        return {
          ...state,
          isAuthenticated: true,
        }
      } else {
        // Return Error
      }
    case LOGOUT: 
      return {
        ...state,
        isAuthenticated: false,
      }
    default:
      return state;
  }
}

export default reducer;