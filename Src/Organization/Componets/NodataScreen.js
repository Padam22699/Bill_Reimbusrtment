import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GREY} from '../Colors/Color';

const NodataScreen = () => {
  return (
    <View style={{alignItems: 'center', marginTop: '40%'}}>
      <Text style={{color: GREY, fontWeight: '600', fontSize: 24}}>
        List is Empty
      </Text>
    </View>
  );
};

export default NodataScreen;

const styles = StyleSheet.create({});
