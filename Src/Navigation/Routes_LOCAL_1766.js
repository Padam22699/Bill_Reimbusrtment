import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../Screen/SplashScreen';
import LandingScreen from '../Screen/LandingScreen';
import LoginScreen from '../Screen/LoginScreen';
import Dashboard from '../Screen/Dashboard';
import ToptabBar from '../Common/ToptabBar';
import RegisterScreen from '../Screen/RegisterScreen';
import SideMenu from '../Common/SideMenu';
import BottomTab from '../Common/BottomTab';
import DetailScreen from '../Screen/DetailScreen';
import OrganizationLoginScreen from '../Screen/OrganizationLoginScreen';
import OrganizationSignUpScreen from '../Screen/OrganizationSignUpScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        drawerPosition: 'right',
      }}
      drawerContent={props => <SideMenu navigation={props.navigation} />}>
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
function Routes() {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={MyDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ToptabBar"
          component={ToptabBar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrganizationLoginScreen"
          component={OrganizationLoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrganizationSignUpScreen"
          component={OrganizationSignUpScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
