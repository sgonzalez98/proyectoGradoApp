import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from 'navigate/StackNavigator';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message'

function App() {
  return (
    <>
      <StatusBar backgroundColor="#0A99FF" barStyle="light-content" />
      <NavigationContainer>
        <AppNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </>
  );
}

export default App;
