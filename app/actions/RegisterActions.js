import { checkStatus, parseJSON, getApiUrl, getHeaderForAjax } from '../services/ServiceHelper';
import { REGISTER_GET_ALL_DAYAH } from '../Constants';

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

export { getAllDayah }