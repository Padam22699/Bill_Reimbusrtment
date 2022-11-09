import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../Assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      
        {children}
    
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: "100%",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
