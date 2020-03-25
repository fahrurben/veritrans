import { checkStatus, parseJSON, getApiUrl, getHeaderForAjax } from '../services/ServiceHelper';
import { LOGIN_INITIAL, LOGIN_GET_INSTITUSI, LOGIN_SUBMITTING, LOGIN_SUBMITTED } from '../Constants';
import { STATUS_SUCCESS, STATUS_ERROR } from '../Constants';
import { AsyncStorage } from 'react-native';

const loginInitial = () => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_INITIAL });
  }
}

const getAllInstitusi = () => {
  return async (dispatch) => {
    let apiUrl = getApiUrl() +'/institusi';
    fetch(apiUrl, {
      method: 'GET',
      headers: getHeaderForAjax(),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({ type: LOGIN_GET_INSTITUSI, payload: data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_GET_INSTITUSI, payload: { isSuccess: false, message: error.message } });
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

      if( response.status >= 200 && response.status < 300 ) {
        let data = await response.json();
        console.log(data);
        await AsyncStorage.setItem('accessToken', data.api_token);

        console.log('success');
        dispatch({ type: LOGIN_SUBMITTED, 
          payload: {
            ...data,
            status: STATUS_SUCCESS,
          }
        });
      } else {
        let data = await response.json();
        dispatch({ type: LOGIN_SUBMITTED, 
          payload: {
            status: STATUS_ERROR,
            message: data.message,
          } 
        });
      }
    } catch (error) {
      console.log('Error');
      dispatch({ type: LOGIN_SUBMITTED, payload: {
        status: STATUS_ERROR,
      } });
    }
  }
}

export { loginInitial, getAllInstitusi, submit }