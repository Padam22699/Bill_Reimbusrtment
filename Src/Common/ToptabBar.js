import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, StyleSheet, StatusBar, Platform, Text} from 'react-native';
// import Current from '../Screen/Current';
import Past from '../Screen/Past';
import {theme} from '../core/theme';
import {useNetInfo} from '@react-native-community/netinfo';
import NetWorkConnectionModel from '../NetWorkConnection/NetWorkConnectionModel';
const Tab = createMaterialTopTabNavigator();

function ToptabBar() {
  const NetInfo = useNetInfo();
  return (
    <View style={styles.container}>
      <View>
        {!NetInfo.isConnected && NetInfo.isConnected != null ? (
          <NetWorkConnectionModel color={theme.colors.primary} />
        ) : null}
      </View>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="default" />

      <Tab.Navigator
        initialRouteName="Current"
        screenOptions={{
          indicatorStyle: null,
          tabBarInactiveTintColor: '#000',
          // tabBarActiveTintColor: theme.colors.primary,
          tabBarLabelStyle: {fontSize: 14, fontWeight: '700'},
          tabBarStyle: {
            indicatorStyle: null,
            backgroundColor: theme.colors.white,
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 20,
            height: 50,
          },
        }}>
        {/* <Tab.Screen
          name="Current"
          component={Current}
          options={{tabBarLabel: 'This month'}}
        /> */}

        <Tab.Screen
          name="Past"
          component={Past}
          options={{
            tabBarLabel: 'All',
          }}
        />
        <Tab.Screen
          name="Pasts"
          component={Past}
          options={{
            tabBarLabel: 'All',
          }}
        />
        <Tab.Screen
          name="Pastss"
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
