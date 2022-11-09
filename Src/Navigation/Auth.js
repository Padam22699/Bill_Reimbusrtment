import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screen/LoginScreen';
import RegisterScreen from '../Screen/RegisterScreen';
import OrganizationLoginScreen from '../Screen/OrganizationLoginScreen';
import OrganizationSignUpScreen from '../Screen/OrganizationSignUpScreen';
import SplashScreen from '../Screen/SplashScreen';
import LandingScreen from '../Screen/LandingScreen';


const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrganizationLoginScreen" component={OrganizationLoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrganizationSignUpScreen" component={OrganizationSignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
export default AuthStack;