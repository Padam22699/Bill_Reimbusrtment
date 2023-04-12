import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform} from 'react-native';
import Notification from '../Screen/Notification';
import {theme} from '../core/theme';
import Reimbursement from '../Screen/Reimbursement';
import {DARK, WHITE} from '../Organization/Colors/Color';
import Ehome from '../Screen/Ehome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AddBillsScreen, Transactions} from '../Navigation/Auth';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import UserProfile from '../Screen/UserProfile';
import Bills from '../Screen/Bills';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: WHITE,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? responsiveScreenHeight(12) : 60,
          position: 'absolute',
          backgroundColor: theme.colors.PRIMARY,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarLabelStyle: {
          paddingVertical: 5,
          fontSize: 15,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Ehome}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="home"
                size={25}
                color={focused ? WHITE : 'black'}
                style={{marginTop: 5}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Bills"
        component={Bills}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Bills', {screen: 'ToptabBar'});
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../Assets/Images/T.png')}
                style={{
                  marginTop: 5,
                  width: 25,
                  height: 25,
                  tintColor: focused ? WHITE : DARK,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddBillsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../Assets/Images/A.png')}
                style={{
                  marginTop: 5,
                  width: 25,
                  height: 25,
                  tintColor: focused ? WHITE : DARK,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../Assets/Images/user-Profile.png')}
                style={{
                  marginTop: 5,
                  width: 25,
                  height: 25,
                  tintColor: focused ? WHITE : DARK,
                }}
              />
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="Menu"
        component={BottomTab}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
        options={{
          tabBarIcon: ({focused}) => {
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
      /> */}
    </Tab.Navigator>
  );
}

export default BottomTab;
