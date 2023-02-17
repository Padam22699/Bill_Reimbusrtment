import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';


import {PRIMARY} from '../Organization/Colors/Color';
const NetWorkConnected = () => {
  const [iscoonected, setIsConnected] = useState(false);
  const [openModel, setModel] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      console.log('Connection type', iscoonected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../Assets/NoConnectio.png')}
        style={{width: 200, height: 200}}
      />
      <Text>NoConnection</Text>
      <TouchableOpacity
        style={{
          marginTop: 10,
          width: 50,
          height: 30,
          alignItems: 'center',
          backgroundColor: PRIMARY,
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text style={{color: '#fff', fontWeight: '900'}}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NetWorkConnected;

const styles = StyleSheet.create({});
