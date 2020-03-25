import { AsyncStorage } from 'react-native';
import { API_URL } from 'react-native-dotenv';

export async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorObj = await response.json();
  return Promise.reject(errorObj);
}

export function parseJSON(response) {
  console.log(response);
  return response.json();
}

export function getApiUrl() {
  let apiUrl = 'http://192.168.122.1:82/veritrans/public';

  if (process.env.NODE_ENV === "development") {
    apiUrl = 'http://192.168.122.1:82/veritrans/public';
  }

  console.log(apiUrl);
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