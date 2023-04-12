import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

import Past from '../Screen/Past';
import {theme} from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

import PendingRequiest from './RequiestScreens/PendingRequiest';
import ForwardedRequiest from './RequiestScreens/ForwardedRequiest';
import CompleteRequiest from './RequiestScreens/CompleteRequiest';
import AllRequiest from './RequiestScreens/AllRequiest';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const Bills = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          marginHorizontal: 20,
          borderBottomLeftRadius: 30,
        }}>
        <Text
          style={{
            alignSelf: 'center',
            color: theme.colors.white,
            fontSize: 24,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          Requests
        </Text>
      </View>
      {/* <View style={{flex: 1 ,backgroundColor:'red' ,borderBottomLeftRadius:30}}> */}
      <Tab.Navigator
        initialRouteName="Pending"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '900',
            color: 'white',
            textTransform: 'capitalize',
            width: responsiveScreenHeight(10),
          },

          tabBarStyle: {
            backgroundColor: '#D182EE',
            marginTop: 10,
            marginHorizontal: 20,
            borderRadius: 20,
            marginBottom: 30,
            paddingHorizontal: 10,
          },

          tabBarPressColor: '#D182EE',
          tabBarIndicatorStyle: {
            opacity: 0,
          },
        }}>
        <Tab.Screen
          name="Pending"
          component={PendingRequiest}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '900',
                    color: 'white',
                    textTransform: 'capitalize',
                    backgroundColor: focused ? '#BB6BD9' : null,
                    paddingHorizontal: 7,
                    paddingVertical: 5,
                  }}>
                  Pending
                </Text>
              );
            },
          }}
        />
        <Tab.Screen
          name="Forwarded"
          component={ForwardedRequiest}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '900',
                    color: 'white',
                    textTransform: 'capitalize',
                    backgroundColor: focused ? '#BB6BD9' : null,
                    paddingHorizontal: 7,
                    paddingVertical: 5,
                    marginLeft: -15,
                  }}>
                  Forwarded
                </Text>
              );
            },
          }}
        />
        <Tab.Screen
          name="Completed"
          component={CompleteRequiest}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '900',
                    color: 'white',
                    textTransform: 'capitalize',
                    backgroundColor: focused ? '#BB6BD9' : null,
                    paddingHorizontal: 7,
                    paddingVertical: 5,
                    marginLeft: -15,
                  }}>
                  Completed
                </Text>
              );
            },
          }}
        />
        <Tab.Screen
          name="All"
          component={AllRequiest}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '900',
                    color: 'white',
                    textTransform: 'capitalize',
                    backgroundColor: focused ? '#BB6BD9' : null,
                    paddingHorizontal: 7,
                    paddingVertical: 5,
                    marginLeft: -15,
                    marginRight: 25,
                  }}>
                  All
                </Text>
              );
            },
          }}
        />
      </Tab.Navigator>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Bills;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    // // borderRadius: 10,
    // borderTopLeftRadius: 20,

    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 20,
  },
});
