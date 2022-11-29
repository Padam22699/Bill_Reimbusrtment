import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.conatianer]}>
      <ActivityIndicator size={40} color={'#5D3FD3'}/>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  conatianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
  },
});
