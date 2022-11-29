import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const LoaderOrg = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.conatianer]}>
      <ActivityIndicator size={40} color={'#E14D2A'}/>
    </View>
  );
};

export default LoaderOrg;

const styles = StyleSheet.create({
  conatianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
  },
});
