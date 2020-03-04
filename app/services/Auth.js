import {AsyncStorage} from 'react-native';

// Sets user details in localStorage
export async function setSession(accessToken) {
  // Set the time that the access token will expire at
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
  } catch (error) {
    // Error saving data
  }
  // navigate to the home route

}

// removes user details from localStorage
export async function logout() {
  // Clear access token and ID token from local storage
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    // Error saving data
  }
  // navigate to the home route
}

// checks if the user is authenticated
export async function isAuthenticated() {
  // Check whether the current time is past the
  // access token's expiry time
  try {
    const value = await AsyncStorage.getItem('accessToken');

    return value !== null;
  } catch (error) {
    // Error retrieving data
  }
}

