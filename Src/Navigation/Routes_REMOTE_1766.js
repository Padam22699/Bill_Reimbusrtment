import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
      drawerContent={(props) => (
        <SideMenu navigation={props.navigation} />
      )}
    >
      <Drawer.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
function Routes({ loggedin }) {
  return (
    <Stack.Navigator initialRouteName={loggedin ? 'Drawer' : 'AuthStack'}>
      <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      <Stack.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
export default Routes;