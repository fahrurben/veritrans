import {AsyncStorage} from 'react-native';

export default class Auth {
  // Sets user details in localStorage
  setSession = async function(accessToken) {
    // Set the time that the access token will expire at
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
    } catch (error) {
      // Error saving data
    }
    // navigate to the home route

  }

  // removes user details from localStorage
  logout = async function() {
    // Clear access token and ID token from local storage
    try {
      await AsyncStorage.removeItem('accessToken');
    } catch (error) {
      // Error saving data
    }
    // navigate to the home route
  }

}
