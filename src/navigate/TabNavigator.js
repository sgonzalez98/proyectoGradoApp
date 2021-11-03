import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Alertas from 'pages/Alertas';
import Calendario from 'pages/Calendario';
import Historial from 'pages/Historial';
import Medicinas from 'pages/Medicinas';
import Configuracion from 'pages/Configuracion';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const customTabButton = (children, onPress) => (
  <TouchableOpacity onPress={onPress} style={{ top: -20 }}>
    <View style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#0A99FF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    }}
    >
      {children}
      <Text style={{ fontSize: 12, color: 'white' }}>Calendario</Text>
    </View>
  </TouchableOpacity>
);

const customIcon = (iconName, text, focused) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Icon name={iconName} style={{ fontSize: 25, color: focused ? '#0A99FF' : '#748c94' }} />
    <Text style={{ fontSize: 12, color: focused ? '#0A99FF' : '#748c94' }}>{text}</Text>
  </View>
);

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Alertas"
      screenOptions={{
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
        name="Historial"
        component={Historial}
        options={{ tabBarIcon: ({ focused }) => customIcon('clipboard-list', 'Historial', focused) }}
      />
      <Tab.Screen
        name="Calendario"
        component={Calendario}
        options={{ tabBarIcon: ({ focused }) => customIcon('calendar-alt', 'Calendario', focused) }}
      />

      {/* <Tab.Screen
        name="Third"
        component={ThirdPage}
        options={{
          tabBarIcon: () => (<Icon name="calendar-alt" style={{ fontSize: 24, color: '#fff' }} />),
          tabBarButton: ({ children, onPress }) => customTabButton(children, onPress),
        }}
      /> */}
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
