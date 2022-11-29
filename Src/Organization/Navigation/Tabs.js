import {Image} from 'react-native';
import React from 'react';
import Home from '../Screens/Home';
import CompleteRequest from '../Screens/CompleteRequest';
import ForwordedRequest from '../Screens/ForwordedRequest';
import PenddingRequsest from '../Screens/PenddingRequsest';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DARK, PRIMARY} from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();
export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          backgroundColor: "#FAC898",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarLabelStyle: {
          paddingVertical: 5,
          fontSize:12
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Icon name="home" size={25} color={focused ? PRIMARY : 'black'} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompleteRequest}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../../Assets/Images/checked.png')}
                style={{
                  width: 25,
                  height: 25,
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
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../../Assets/Images/forward.png')}
                style={{
                  width: 25,
                  height: 25,
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
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../../Assets/Images/pending.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? PRIMARY : DARK,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Tabs}
        listeners={({navigation}) => ({
          tabPress: e => {
            console.log(navigation)
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../../Assets/Images/m.png')}
                style={{
                  width: 25,
                  height: 25,
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
