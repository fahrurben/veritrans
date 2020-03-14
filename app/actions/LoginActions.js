import { checkStatus, parseJSON, getApiUrl, getHeaderForAjax } from '../services/ServiceHelper';
import { LOGIN_INITIAL, LOGIN_GET_ALL_DAYAH, LOGIN_SUBMITTING, LOGIN_SUBMITTED } from '../Constants';
import { STATUS_SUCCESS, STATUS_ERROR } from '../Constants';
import { setSession } from '../services/Auth';


const loginInitial = () => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_INITIAL });
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
        dispatch({ type: LOGIN_GET_ALL_DAYAH, payload: data.dayahs });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_GET_ALL_DAYAH, payload: { isSuccess: false, message: error.message } });
      });
  }
}

const submit = (loginObj) => {

  return async (dispatch) => {
    let apiUrl = getApiUrl() +'/login';
    
    dispatch({ type: LOGIN_SUBMITTING });

    try {
      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: getHeaderForAjax(),
        body: JSON.stringify(loginObj)
      });

      console.log(response);
      if( response.status >= 200 && response.status < 300 ) {
        let data = await response.json();
        if (data.status == STATUS_SUCCESS) {
          await setSession(data.token);
        }

        dispatch({ type: LOGIN_SUBMITTED, payload: data });
      }
    } catch (error) {
      console.log('error' + error);
    }
  }
}

export { loginInitial, getAllDayah, submit }