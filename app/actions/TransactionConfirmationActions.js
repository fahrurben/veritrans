import { checkStatus, parseJSON, getApiUrl, getHeaderForAjax, getHeaderForAjaxAsync } from '../services/ServiceHelper';
import { TRANS_CONFIRM_INITIAL, TRANS_CONFIRM_GET_ALL_BANK, TRANS_CONFIRM_SUBMITTING, TRANS_CONFIRM_SUBMITTED } from '../Constants';


const transConfirmInitial = () => {
  return async (dispatch) => {
    dispatch({ type: TRANS_CONFIRM_INITIAL });
  }
}

const getAllBankByInstitution = (id) => {
  return async (dispatch) => {
    let apiUrl = getApiUrl() +'/institusi/bank/'+id;
    fetch(apiUrl, {
      method: 'GET',
      headers: getHeaderForAjax(),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log(data);
        dispatch({ type: TRANS_CONFIRM_GET_ALL_BANK, payload: data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: TRANS_CONFIRM_GET_ALL_BANK, payload: { isSuccess: false, message: error.message } });
      });
  }
}

const submit = (registerObj) => {
  return async (dispatch) => {
    console.log(registerObj);
    let apiUrl = getApiUrl() +'/transaksi';
    
    dispatch({ type: TRANS_CONFIRM_SUBMITTING });

    fetch(apiUrl, {
      method: 'POST',
      headers: await getHeaderForAjaxAsync(),
      body: JSON.stringify(registerObj)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log(data);
        dispatch({ type: TRANS_CONFIRM_SUBMITTED, payload: data });
      })
      .catch((data) => {
        console.log(data);
        dispatch({ type: TRANS_CONFIRM_SUBMITTED, payload: data });
      });
  }
}

export { transConfirmInitial, getAllBankByInstitution, submit }