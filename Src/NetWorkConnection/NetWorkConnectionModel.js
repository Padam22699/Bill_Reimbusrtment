import {Modal, StyleSheet, Text, View, Button, Image} from 'react-native';
import React, {useState} from 'react';
import {GREY, PRIMARY, WHITE} from '../Organization/Colors/Color';

const NetWorkConnectionModel = ({color}) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color == null ? PRIMARY : color,
        flexDirection: 'row',
        paddingBottom: 10,
      }}>
      <Image
        style={{width: 20, height: 20, tintColor: WHITE, alignSelf: 'center'}}
        source={require('../Assets/no-wifi.png')}
      />
      <Text
        style={{
          fontSize: 16,
          color: WHITE,
          fontWeight: '700',
          marginLeft: 4,
        }}>
        No internet connection
      </Text>
    </View>
  );
};

export default NetWorkConnectionModel;

const styles = StyleSheet.create({});
