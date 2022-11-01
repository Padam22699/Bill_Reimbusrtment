import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Notification from '../Screen/Notification';
import Current from '../Screen/Current';
import { theme } from '../core/theme';
import ToptabBar from './ToptabBar';
import Reimbursement from '../Screen/Reimbursement';

const Tab = createBottomTabNavigator();

function BottomTab(props) {
    return (
        <Tab.Navigator initialRouteName='ImageSlider'
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    padding: 10,
                    height: 55,
                    backgroundColor: theme.colors.primary,
                    borderTopColor: "transparent",
                    shadowOffset: {
                        width: 0, height: 10
                    },
                    marginTop: -20
                },

            }} >
            <Tab.Screen name='ToptabBar' component={ToptabBar}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, size }) => (
                        <Ionicons name="home" color={focused ? theme.colors.white : theme.colors.green} size={30} />
                    ),
                }}
            />
            <Tab.Screen name='Reimbursement' component={Reimbursement}

                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, size }) => (
                        <View style={{ top: -20, backgroundColor: focused ? theme.colors.violet : theme.colors.white, height: 70, width: 70, borderRadius: 68, alignItems: 'center', justifyContent: "center" }}>
                            <AntDesign name="pluscircle" color={focused ? theme.colors.primary : theme.colors.green} size={60} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen name='Notification' component={Notification}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, size }) => (
                        <Ionicons name="ios-notifications" color={focused ? theme.colors.white : theme.colors.green} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default BottomTab
const styles = StyleSheet.create({
    antdesign: {
    }
})
