import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import Notification from '../Screen/Notification';
import { theme } from '../core/theme';
import Reimbursement from '../Screen/Reimbursement';
import { DARK } from '../Organization/Colors/Color';
import Ehome from '../Screen/Ehome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Transactions } from '../Navigation/Auth';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          height:  Platform.OS === 'ios' ? responsiveScreenHeight(12) : 60,
          position: 'absolute',
          backgroundColor: "#E6E6FA",
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
        component={Ehome}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="home"
                size={25}
                color={focused ? theme.colors.primary : 'black'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Bills"
        component={Transactions}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Bills', { screen: 'ToptabBar' });
          }
        })}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={require('../Assets/Images/T.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? theme.colors.primary : DARK,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={Reimbursement}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={require('../Assets/Images/A.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? theme.colors.primary : DARK,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={require('../Assets/Images/N.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? theme.colors.primary : DARK,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={BottomTab}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.openDrawer();
          }
        })}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={require('../Assets/Images/m.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? theme.colors.primary : DARK,
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
