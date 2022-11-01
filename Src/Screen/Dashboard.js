import React from 'react'
import { View, StyleSheet ,Text} from 'react-native'
import { theme } from '../core/theme'


export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container} >
      <Text>Dashboard</Text>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1, paddingHorizontal: 10, backgroundColor: theme.colors.white
  },
})