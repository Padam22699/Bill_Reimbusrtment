import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screen/LoginScreen';
import RegisterScreen from '../Screen/RegisterScreen';
import OrganizationLoginScreen from '../Screen/OrganizationLoginScreen';
import OrganizationSignUpScreen from '../Screen/OrganizationSignUpScreen';
import SplashScreen, {styles} from '../Screen/SplashScreen';
import LandingScreen from '../Screen/LandingScreen';
import FullDetailScreen from '../Organization/Stutes/FullDetailScreen';
import OrganizationDeatailScreeen from '../Organization/Stutes/OrganizationDeatailScreeen';
import AttechedImageViewer from '../Organization/Stutes/AttechedImageViewer';
import Tabs from '../Organization/Navigation/Tabs';
import Profile from '../Organization/Screens/Profile';
import OrgSignin from '../Organization/Screens/OrgSignin';
import OrgSignup from '../Organization/Screens/OrgSignup';
import ImageViwers from '../components/ImageViwers';
import Reimbursement from '../Screen/Reimbursement';
import DetailScreen from '../Screen/DetailScreen';

import ToptabBar from '../Common/ToptabBar';
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrgSignin"
        component={OrgSignin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrgSignup"
        component={OrgSignup}
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
        name="ImageViwers"
        component={ImageViwers}
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
  );
}
export default AuthStack;

export const Organization = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailScreen"
        component={OrganizationDeatailScreeen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ImageView"
        component={AttechedImageViewer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserDetail"
        component={FullDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export const Transactions = () => {
  return (
    <Stack.Navigator
    initialRouteName='ToptabBar'
    >
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
        name="ImageViwers"
        component={ImageViwers}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};


