import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importacion de componentes para la ruta
import Login from 'pages/Login';
// import DrawerNavigator from './DrawerNavigator';

// Navegador Stack para el inicio de sesión y La aplicación
function MyStack() {
  const Stack = createNativeStackNavigator();
  const options = { headerShown: false };
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={options}
      />
      {/* <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={options}
      /> */}
    </Stack.Navigator>
  );
}

export default MyStack;
