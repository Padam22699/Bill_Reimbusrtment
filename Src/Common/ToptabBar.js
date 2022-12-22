import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import Current from '../Screen/Current';
import Past from '../Screen/Past';
import { theme } from '../core/theme';

const Tab = createMaterialTopTabNavigator();

function ToptabBar() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="default" />

      <Tab.Navigator
        initialRouteName="Current"
        screenOptions={{
          tabBarInactiveTintColor: '#000',
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabelStyle: { fontSize: 14, fontWeight: '700' },
          tabBarStyle: { backgroundColor: theme.colors.white },
        }}>
        <Tab.Screen
          name="Current"
          component={Current}
          options={{ tabBarLabel: 'This month' }}
        />

        <Tab.Screen
          name="Past"
          component={Past}
          options={{
            tabBarLabel: 'All',
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    // marginTop:Platform.OS ==='ios' ? 45 :0
  },
});
export default ToptabBar;
