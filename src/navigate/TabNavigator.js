import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FirstPage from 'pages/firstPage';
import SecondPage from 'pages/secondPage';
import ThirdPage from 'pages/thirdPage';
import FourthPage from 'pages/fourthPage';
import FifthPage from 'pages/fifthPage';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const shadowSyles = {
  shadowColor: '#7F5DF0',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
  elevation: 5,
};

const customTabButton = (children, onPress) => (
  <TouchableOpacity onPress={onPress} style={{ top: -30 }}>
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#e32f45',
      ...shadowSyles,
    }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const customIcon = (iconName, text, focused) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
    <Icon name={iconName} style={{ fontSize: 25, color: focused ? '#e32f45' : '#748c94' }} />
    <Text style={{ fontSize: 12, color: focused ? '#e32f45' : '#748c94' }}>{text}</Text>
  </View>
);

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="First"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 15,
          right: 15,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 75,
          ...shadowSyles,
        },
      }}
    >
      <Tab.Screen
        name="First"
        component={FirstPage}
        options={{ tabBarIcon: ({ focused }) => customIcon('bell', 'Alertas', focused) }}
      />
      <Tab.Screen
        name="Second"
        component={SecondPage}
        options={{ tabBarIcon: ({ focused }) => customIcon('clipboard-list', 'Registros', focused) }}
      />
      <Tab.Screen
        name="Third"
        component={ThirdPage}
        options={{
          tabBarIcon: () => (<Icon name="plus" style={{ fontSize: 30, color: '#fff' }} />),
          tabBarButton: ({ children, onPress }) => customTabButton(children, onPress),
        }}
      />
      <Tab.Screen
        name="Fourth"
        component={FourthPage}
        options={{ tabBarIcon: ({ focused }) => customIcon('capsules', 'Inventario', focused) }}
      />
      <Tab.Screen
        name="Fifth"
        component={FifthPage}
        options={{ tabBarIcon: ({ focused }) => customIcon('cog', 'Configuración', focused) }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
