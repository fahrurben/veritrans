import { checkStatus, parseJSON, getApiUrl, getHeaderForAjax } from '../services/ServiceHelper';
import { HOME_LIST_GET_DATA, HOME_LIST_GET_DATA_DONE } from '../Constants';

const getAllData = () => {
  return async (dispatch) => {

    dispatch({ type: HOME_LIST_GET_DATA });

    let apiUrl = getApiUrl() +'/transaction';
    fetch(apiUrl, {
      method: 'GET',
      headers: getHeaderForAjax(),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({ type: HOME_LIST_GET_DATA_DONE, payload: data });
      })
      .catch((error) => {
        dispatch({ type: HOME_LIST_GET_DATA_DONE, payload: { isSuccess: false, message: error.message } });
      });
  }
}

export { getAllData }