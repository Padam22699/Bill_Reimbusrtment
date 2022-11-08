import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Headers } from '../Common/Headers';
import { theme } from '../core/theme';

const Notification = () => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>Notification Screen</Text>

    </View>

  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1, paddingHorizontal: 10, backgroundColor: theme.colors.white,
    alignItems: "center", justifyContent: "center",
  },
  text: {
    fontSize: 22, color: "#000"
  }
})
export default Notification;
