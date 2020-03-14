import { checkStatus, parseJSON, getApiUrl, getHeaderForAjax } from '../services/ServiceHelper';
import { REGISTER_INITIAL, REGISTER_GET_ALL_DAYAH, REGISTER_SUBMITTING, REGISTER_SUBMITTED } from '../Constants';


const registerInitial = () => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_INITIAL });
  }
}

const getAllDayah = () => {
  return async (dispatch) => {
    let apiUrl = getApiUrl() +'/dayahs';
    fetch(apiUrl, {
      method: 'GET',
      headers: getHeaderForAjax(),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({ type: REGISTER_GET_ALL_DAYAH, payload: data.dayahs });
      })
      .catch((error) => {
        dispatch({ type: REGISTER_GET_ALL_DAYAH, payload: { isSuccess: false, message: error.message } });
      });
  }
}

const submit = (registerObj) => {
  console.log(registerObj);
  return async (dispatch) => {
    let apiUrl = getApiUrl() +'/register';
    
    dispatch({ type: REGISTER_SUBMITTING });

    fetch(apiUrl, {
      method: 'POST',
      headers: getHeaderForAjax(),
      body: JSON.stringify(registerObj)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({ type: REGISTER_SUBMITTED, payload: data });
      })
      .catch((data) => {
        dispatch({ type: REGISTER_SUBMITTED, payload: data });
      });
  }
}

export { registerInitial, getAllDayah, submit }