import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from 'navigate/StackNavigator';
import { StatusBar } from 'react-native';

function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
