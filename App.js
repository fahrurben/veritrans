/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './app/Store';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

const {store, persistor} = configureStore();

import RegisterPage from './app/pages/RegisterPage';

function HomeScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <View>
        <Button
          title="Register"
          onPress={() =>props.navigation.navigate('Register')}
        />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Provider store={ store } >
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Register" component={RegisterPage} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ApplicationProvider>
  );
};

export default App;
