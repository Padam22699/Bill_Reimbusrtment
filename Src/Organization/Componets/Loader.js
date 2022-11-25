import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DARK} from '../Colors/Color';

const Loader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.conatianer]}>
      <ActivityIndicator size={60} />
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
