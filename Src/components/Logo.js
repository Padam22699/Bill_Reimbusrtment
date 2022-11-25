import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../Assets/L7.png')} style={styles.image}  />
}

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
    marginBottom: 8,
    borderRadius:90,
    resizeMode:'cover'
  },
})
