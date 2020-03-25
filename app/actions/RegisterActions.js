import { checkStatus, parseJSON, getApiUrl, getHeaderForAjax } from '../services/ServiceHelper';
import { REGISTER_INITIAL, REGISTER_GET_ALL_INSTITUSI, REGISTER_SUBMITTING, REGISTER_SUBMITTED, STATUS_SUCCESS, STATUS_ERROR } from '../Constants';


const registerInitial = () => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_INITIAL });
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
        dispatch({ type: REGISTER_GET_ALL_INSTITUSI, payload: data });
      })
      .catch((error) => {
        dispatch({ type: REGISTER_GET_ALL_INSTITUSI, payload: { isSuccess: false, message: error.message } });
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
        console.log(data);
        dispatch({ type: REGISTER_SUBMITTED,
          payload: {
            ...data,
            status: STATUS_SUCCESS,
          }  
        });
      })
      .catch((data) => {
        dispatch({ type: REGISTER_SUBMITTED,
          payload: {
            ...data,
            status: STATUS_ERROR,
          }  
        });
      });
  }
}

export { registerInitial, getAllInstitusi, submit }