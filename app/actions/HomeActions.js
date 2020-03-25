import { checkStatus, parseJSON, getApiUrl, getHeaderForAjaxAsync } from '../services/ServiceHelper';
import { HOME_LIST_GET_DATA, HOME_LIST_GET_DATA_DONE } from '../Constants';

const getAllData = () => {
  return async (dispatch) => {

    dispatch({ type: HOME_LIST_GET_DATA });

    let apiUrl = getApiUrl() +'/transaction';
    fetch(apiUrl, {
      method: 'GET',
      headers: await getHeaderForAjaxAsync(),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('success');
        console.log(data);
        dispatch({ type: HOME_LIST_GET_DATA_DONE, payload: data });
      })
      .catch((error) => {
        dispatch({ type: HOME_LIST_GET_DATA_DONE, payload: { isSuccess: false, message: error.message } });
      });
  }
}

export { getAllData }