import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../Screen/SplashScreen';
import LandingScreen from '../Screen/LandingScreen';
import SideMenu from '../Common/SideMenu';
import BottomTab from '../Common/BottomTab';
import AuthStack, {Organization} from './Auth';
import Tabs from '../Organization/Navigation/Tabs';
import AttechedImageViewer from '../Organization/Stutes/AttechedImageViewer';
import FullDetailScreen from '../Organization/Stutes/FullDetailScreen';
import OrganizationDeatailScreeen from '../Organization/Stutes/OrganizationDeatailScreeen';
import OrgSlide from '../Organization/Componets/OrgSlide';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const orgDrawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{drawerPosition: 'right'}}
      drawerStyle={{}}
      drawerContent={props => <SideMenu navigation={props.navigation} />}>
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
export const OrgDrawer = () => {
  return (
    <orgDrawer.Navigator
      screenOptions={{drawerPosition: 'right'}}
      drawerStyle={{}}
      drawerContent={props => <OrgSlide navigation={props.navigation}/>}>
      <orgDrawer.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
        <orgDrawer.Screen
        name="ImageView"
        component={AttechedImageViewer}
        options={{headerShown: false}}
      />
      <orgDrawer.Screen
        name="UserDetail"
        component={FullDetailScreen}
        options={{headerShown: false}}
      />
       <orgDrawer.Screen
        name="DetailScreen"
        component={OrganizationDeatailScreeen}
        options={{headerShown: false}}
      />
      {/* <orgDrawer.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      /> */}
    </orgDrawer.Navigator>
  );
};
function Routes({loggedin, loggedIntype}) {
  console.log(loggedin);
  console.log(loggedIntype);
  return (
    <Stack.Navigator
      initialRouteName={
        loggedin
          ? loggedIntype == 'Emp'
            ? 'MyDrawer'
            : 'OrgDrawer'
          : 'AuthStack'
      }>
      <Stack.Screen
        name="MyDrawer"
        component={MyDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />
 
      <Stack.Screen
        name="OrgDrawer"
        component={OrgDrawer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default Routes;
