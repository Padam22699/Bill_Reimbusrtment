import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../Screens/Home';
import CompleteRequest from '../Screens/CompleteRequest';
import ForwordedRequest from '../Screens/ForwordedRequest';
import PenddingRequsest from '../Screens/PenddingRequsest';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DARK, PRIMARY, WHITE} from '../Colors/Color';

import {Image} from 'react-native';
import Menu from '../Screens/Menu';

import Icon from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: PRIMARY,
        tabBarStyle: {
          height: 60,
          elevation: 1,
          position: 'absolute',
          backgroundColor: WHITE,
        },
        tabBarLabelStyle: {
          marginBottom: 7,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return (
              <Icon name="home" size={24} color={focused ? PRIMARY : 'black'} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompleteRequest}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return (
              <Image
                source={require('../../Assets/Images/checked.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? PRIMARY : DARK,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Forwarded"
        component={ForwordedRequest}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return (
              <Image
                source={require('../../Assets/Images/forward.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? PRIMARY : DARK,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Pending"
        component={PenddingRequsest}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return (
              <Image
                source={require('../../Assets/Images/pending.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? PRIMARY : DARK,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return (
              <Image
                source={require('../../Assets/Images/m.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? PRIMARY : DARK,
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
