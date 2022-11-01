import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet } from 'react-native';
import Current from '../Screen/Current';
import Past from '../Screen/Past'
import { theme } from '../core/theme';
import { Headers } from './Headers';
import BottomTab from './BottomTab';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Tab = createMaterialTopTabNavigator();

function ToptabBar({ navigation }) {
    return (
        <View style={styles.container}>
            <Headers backicon="menu-sharp"
                onPress={() => navigation.openDrawer()}
                Text=''
            />
            <Tab.Navigator
                initialRouteName="Current"
                screenOptions={{
                    tabBarInactiveTintColor: "#000",
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarLabelStyle: { fontSize: 14, fontWeight: "700" },
                    tabBarStyle: { backgroundColor: theme.colors.white },
                }}  >
                <Tab.Screen
                    name="Current"
                    component={Current}
                    options={{ tabBarLabel: 'Current' }} />

                <Tab.Screen
                    name="Past"
                    component={Past}
                    options={{
                        tabBarLabel: 'Past',
                        // tabBarIcon: ({ Color, size }) => (
                        //     <AntDesign name='leftcircle' size={24} Color={Color} />
                        // ),
                    }}

                />

            </Tab.Navigator>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: theme.colors.white
    },
})
export default ToptabBar;
