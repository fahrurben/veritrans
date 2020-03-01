import { REGISTER_GET_ALL_DAYAH } from '../Constants';

const initialState = {
  arrDayah: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_GET_ALL_DAYAH:
      return {
        ...state,
        arrDayah: action.payload
      }
    default:
      return state;
  }
}

export default reducer;