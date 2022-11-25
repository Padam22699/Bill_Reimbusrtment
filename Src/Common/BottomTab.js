import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Image, Touchable} from 'react-native';
import Notification from '../Screen/Notification';
import {theme} from '../core/theme';
import ToptabBar from './ToptabBar';
import Reimbursement from '../Screen/Reimbursement';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from '../Screen/DetailScreen';
import {DARK, PRIMARY, WHITE} from '../Organization/Colors/Color';
import Ehome from '../Screen/Ehome';
import Emanu from '../Screen/Emanu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Transactions} from '../Navigation/Auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { MyDrawer } from '../Navigation/Routes';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="ToptabBar">
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
    </Stack.Navigator>
  );
}

function BottomTab(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          height: 60,
          elevation: 1,
          position: 'absolute',
          backgroundColor: WHITE,
        },
        tabBarLabelStyle: {
          marginBottom: 7,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Ehome}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return (
              <Icon
                name="home"
                size={24}
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
            navigation.navigate('Bills',{screen:'ToptabBar'});
          }
        })}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return (
              <Image
                source={require('../Assets/Images/T.png')}
                style={{
                  width: 24,
                  height: 24,
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
          tabBarIcon: ({focused, color}) => {
            return (
              <Image
                source={require('../Assets/Images/A.png')}
                style={{
                  width: 24,
                  height: 24,
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
          tabBarIcon: ({focused, color}) => {
            return (
              <Image
                source={require('../Assets/Images/N.png')}
                style={{
                  width: 24,
                  height: 24,
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
          // navigation.openDrawer()
          // headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return (
              // <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Image
                  source={require('../Assets/Images/m.png')}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? theme.colors.primary : DARK,
                  }}
                />
              // </TouchableOpacity>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
  // return (
  //     <Tab.Navigator initialRouteName='ImageSlider'
  //         screenOptions={{
  //             tabBarHideOnKeyboard: true,
  //             tabBarStyle: {
  //                 padding: 10,
  //                 height: 55,
  //                 backgroundColor: theme.colors.primary,
  //                 borderTopColor: "transparent",
  //                 shadowOffset: {
  //                     width: 0, height: 10
  //                 },
  //                 marginTop: -20
  //             },

  //         }} >
  //         <Tab.Screen name='HomeStack' component={HomeStack}
  //             options={{
  //                 headerShown: false,
  //                 tabBarLabel: '',
  //                 tabBarIcon: ({ focused, size }) => (
  //                     <Ionicons name="home" color={focused ? theme.colors.white : theme.colors.green} size={30} />
  //                 ),
  //             }}
  //         />
  //         <Tab.Screen name='Reimbursement' component={Reimbursement}

  //             options={{
  //                 headerShown: false,
  //                 tabBarLabel: '',
  //                 tabBarIcon: ({ focused, size }) => (
  //                     <View style={{ top: -20, backgroundColor: focused ? theme.colors.violet : theme.colors.white, height: 70, width: 70, borderRadius: 68, alignItems: 'center', justifyContent: "center" }}>
  //                         <AntDesign name="pluscircle" color={focused ? theme.colors.primary : theme.colors.green} size={60} />
  //                     </View>
  //                 ),
  //             }}
  //         />
  //         <Tab.Screen name='Notification' component={Notification}
  //             options={{
  //                 headerShown: false,
  //                 tabBarLabel: '',
  //                 tabBarIcon: ({ focused, size }) => (
  //                     <Ionicons name="ios-notifications" color={focused ? theme.colors.white : theme.colors.green} size={30} />
  //                 ),
  //             }}
  //         />
  //     </Tab.Navigator>
  // );
}
export default BottomTab;
const styles = StyleSheet.create({
  antdesign: {},
});
