import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideMenu from '../Common/SideMenu';
import BottomTab from '../Common/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './Auth';
import Tabs from '../Organization/Navigation/Tabs';
import AttechedImageViewer from '../Organization/Stutes/AttechedImageViewer';
import FullDetailScreen from '../Organization/Stutes/FullDetailScreen';
import OrganizationDeatailScreeen from '../Organization/Stutes/OrganizationDeatailScreeen';
import OrgSlide from '../Organization/Componets/OrgSlide';
import {Dimensions, Platform, StatusBar, View} from 'react-native';
import AddSuperAdminS from '../Organization/Screens/AddSuperAdmin';
import React, {useCallback, useEffect, useState, useFocusEffect} from 'react';
import {setToken} from '../../Src/redux/actions/tokenAction';
import OrgNotification from '../Organization/Screens/OrgNotification';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const orgDrawer = createDrawerNavigator();
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {theme} from '../core/theme';
import {PRIMARY, WHITE} from '../Organization/Colors/Color';
import {useDispatch} from 'react-redux';

export const MyDrawer = () => {
  const [loggedin1, setLoggedin1] = useState(false);
  const [loggedintype1, setLoggedintype1] = useState('');
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_data');
      console.log('valueRoute', value);
      if (value !== null) {
        const data = JSON.parse(value);
        if (data != null) {
          setLoggedintype1(data.loggedIntype);
          if (data.loggedin) {
            setLoggedin1(true);
          } else {
            setLoggedin1(false);
          }
        } else {
          setLoggedin1(false);
        }
      } else {
        setLoggedin1(false);
      }
    } catch (e) {
      console.log('storage error', e);
    }
  };

  return (
    <>
      <SafeAreaProvider>
        <CusttomStatusBar
          backgroundColor={statusColor(loggedintype1, loggedin1)}
        />
        <Drawer.Navigator
          screenOptions={{drawerPosition: 'right'}}
          drawerContent={props => <SideMenu navigation={props.navigation} />}>
          <Drawer.Screen
            name="BottomTab"
            component={BottomTab}
            options={{
              headerShown: false,
              drawerType: 'front',
              drawerStyle: {
                backgroundColor: 'transparent',
                marginBottom: Platform.OS === 'ios' ? 97 : 62,
                width: Dimensions.get('window').width / 2,
              },
            }}
          />
        </Drawer.Navigator>
      </SafeAreaProvider>
    </>
  );
};

export const OrgDrawer = () => {

  const [loggedin1, setLoggedin1] = useState(false);
  const [loggedintype1, setLoggedintype1] = useState('');

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_data');
      console.log('valueRoute', value);
      if (value !== null) {
        const data = JSON.parse(value);
        if (data != null) {
          setLoggedintype1(data.loggedIntype);
          if (data.loggedin) {
            setLoggedin1(true);
          } else {
            setLoggedin1(false);
          }
        } else {
          setLoggedin1(false);
        }
      } else {
        setLoggedin1(false);
      }
    } catch (e) {
      console.log('storage error', e);
    }

  };

  return (
    <>
      <SafeAreaProvider>
        <CusttomStatusBar
          backgroundColor={statusColor(loggedintype1, loggedin1)}
        />
        <orgDrawer.Navigator
          screenOptions={{drawerPosition: 'right'}}
          drawerContent={props => <OrgSlide navigation={props.navigation} />}>
          <orgDrawer.Screen
            name="Tabs"
            component={Tabs}
            options={{
              headerShown: false,
              drawerType: 'front',
              drawerStyle: {
                backgroundColor: 'transparent',
                marginBottom: 62,
                width: Dimensions.get('window').width / 2,
              },
            }}
          />
          <orgDrawer.Screen
            name="ImageView"
            component={AttechedImageViewer}
            options={{
              headerShown: false,
              drawerType: 'front',
              drawerStyle: {
                backgroundColor: 'transparent',
                marginBottom: 62,
                width: Dimensions.get('window').width / 2,
              },
            }}
          />
          <orgDrawer.Screen
            name="UserDetail"
            component={FullDetailScreen}
            options={{
              headerShown: false,
              drawerType: 'front',
              drawerStyle: {
                backgroundColor: 'transparent',
                marginBottom: 62,
                width: Dimensions.get('window').width / 2,
              },
            }}
          />
          <orgDrawer.Screen
            name="DetailScreen"
            component={OrganizationDeatailScreeen}
            options={{
              headerShown: false,
              drawerType: 'front',
              drawerStyle: {
                backgroundColor: 'transparent',
                marginBottom: 62,
                width: Dimensions.get('window').width / 2,
              },
            }}
          />
          <orgDrawer.Screen
            name="AddSuperAdmin"
            component={AddSuperAdminS}
            options={{
              headerShown: false,
              drawerType: 'front',
              drawerStyle: {
                backgroundColor: 'transparent',
                marginBottom: 62,
                width: Dimensions.get('window').width / 2,
              },
            }}
          />
          <orgDrawer.Screen
            name="OrgNotification"
            component={OrgNotification}
            options={{
              headerShown: false,
              drawerType: 'front',
              drawerStyle: {
                backgroundColor: 'transparent',
                marginBottom: 62,
                width: Dimensions.get('window').width / 2,
              },
            }}
          />
          {/* <orgDrawer.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      /> */}
        </orgDrawer.Navigator>
      </SafeAreaProvider>
    </>
  );
};
const CusttomStatusBar = ({backgroundColor}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{height: insets.top, backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle="light-content"
      />
    </View>
  );
};

const statusColor = (loggedintype1, loggedin1) => {
  if (loggedintype1 === 'Org') return PRIMARY;
  if (loggedintype1 === 'Emp') return theme.colors.primary;
  if (loggedin1 == false) return theme.colors.violet;
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
