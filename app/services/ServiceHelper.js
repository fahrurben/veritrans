import { API_URL } from '../Constants';
import { AsyncStorage } from 'react-native';

export async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorObj = await response.json();
  return Promise.reject(errorObj);
}

export function parseJSON(response) {
  return response.json();
}

export function getApiUrl() {
  let apiUrl = API_URL;
  apiUrl += '/api';
  return apiUrl;
}

export function getHeaderForAjax() {
  return new Headers({
    'Content-Type': 'application/json',
  });
}

export async function getHeaderForAjaxAsync() {
  let apiToken = await AsyncStorage.getItem('accessToken');

  return new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + apiToken,
  });
}