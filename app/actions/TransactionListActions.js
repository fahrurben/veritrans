import { checkStatus, parseJSON, getApiUrl, getHeaderForAjaxAsync } from '../services/ServiceHelper';
import { TRANS_LIST_GET_DATA, TRANS_LIST_GET_DATA_DONE, STATUS_ERROR } from '../Constants';

const getAllData = () => {
  return async (dispatch) => {

    dispatch({ type: TRANS_LIST_GET_DATA });

    let apiUrl = getApiUrl() +'/transaction';
    fetch(apiUrl, {
      method: 'GET',
      headers: await getHeaderForAjaxAsync(),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({ type: TRANS_LIST_GET_DATA_DONE, payload: data });
      })
      .catch((error) => {
        dispatch({ type: HOME_LIST_GET_DATA_DONE, payload: { status: STATUS_ERROR, message: error.message } });
      });
  }
}

export { getAllData }