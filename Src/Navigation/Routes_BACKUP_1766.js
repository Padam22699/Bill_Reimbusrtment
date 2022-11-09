import * as React from 'react';
<<<<<<< HEAD
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
=======
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
>>>>>>> fb61d1a8bc73a7d54b610f596e9dec8c446d0cad
import SplashScreen from '../Screen/SplashScreen';
import LandingScreen from '../Screen/LandingScreen';
import SideMenu from '../Common/SideMenu';
import BottomTab from '../Common/BottomTab';
import AuthStack from './Auth';

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
<<<<<<< HEAD
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
=======
}
function Routes({ loggedin }) {
  return (
    <Stack.Navigator initialRouteName={loggedin ? 'Drawer' : 'AuthStack'}>
      <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      <Stack.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} />
    </Stack.Navigator>
>>>>>>> fb61d1a8bc73a7d54b610f596e9dec8c446d0cad
  );
}
export default Routes;
