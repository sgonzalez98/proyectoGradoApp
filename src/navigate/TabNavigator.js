import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Alertas from 'pages/Alertas';
import CalendarioList from 'pages/Calendario';
import CalendarioForm from 'pages/Calendario/form';
import Registro from 'pages/Registro';
import Medicinas from 'pages/Medicinas';
import Configuracion from 'pages/Configuracion';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const customIcon = (iconName, text, focused) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Icon name={iconName} style={{ fontSize: 25, color: focused ? '#0A99FF' : '#748c94' }} />
    <Text style={{ fontSize: 12, color: focused ? '#0A99FF' : '#748c94' }}>{text}</Text>
  </View>
);

const stackOptions = { headerShown: false };
const CalendarioStack = createNativeStackNavigator();

function CalendarioStackNavigation() {
  return (
    <CalendarioStack.Navigator initialRouteName="CalendarioList">
      <CalendarioStack.Screen name="CalendarioList" component={CalendarioList} options={stackOptions} />
      <CalendarioStack.Screen name="CalendarioForm" component={CalendarioForm} options={stackOptions} />
    </CalendarioStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Alertas"
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Alertas"
        component={Alertas}
        options={{ tabBarIcon: ({ focused }) => customIcon('bell', 'Alertas', focused) }}
      />
      <Tab.Screen
        name="Registro"
        component={Registro}
        options={{ tabBarIcon: ({ focused }) => customIcon('clipboard-list', 'Registro', focused) }}
      />
      <Tab.Screen
        name="Calendario"
        component={CalendarioStackNavigation}
        options={{ tabBarIcon: ({ focused }) => customIcon('calendar-alt', 'Calendario', focused) }}
      />
      <Tab.Screen
        name="Medicinas"
        component={Medicinas}
        options={{ tabBarIcon: ({ focused }) => customIcon('capsules', 'Medicinas', focused) }}
      />
      <Tab.Screen
        name="Configuracion"
        component={Configuracion}
        options={{ tabBarIcon: ({ focused }) => customIcon('cog', 'Ajustes', focused) }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
