import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importacion de componentes para la ruta
import Login from 'pages/Login';
import Register from 'pages/Register';
import TabNavigator from './TabNavigator';

// Navegador Stack para el inicio de sesión y La aplicación
function MyStack() {
  const Stack = createNativeStackNavigator();
  const options = { headerShown: false };
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={options} />
      <Stack.Screen name="Register" component={Register} options={options} />
      <Stack.Screen name="Drawer" component={TabNavigator} options={options} />
    </Stack.Navigator>
  );
}

export default MyStack;
