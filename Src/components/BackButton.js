import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { theme } from '../core/theme'

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../Assets/arrow_back.png')}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
   paddingHorizontal:20,
   width:70,
  },
  image: {
    width: 30,
    height: 30,
    tintColor:theme.colors.PRIMARY
  },
})
