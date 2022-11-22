import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DARK} from '../Colors/Color';

const Loader = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 100,

          flexDirection: 'row',
        }}>
        <ActivityIndicator size={60} />
        <Text
          style={{
            color: DARK,
            fontWeight: '400',
            fontSize: 20,
            marginLeft: 10,
          }}>
          loading...
        </Text>
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
