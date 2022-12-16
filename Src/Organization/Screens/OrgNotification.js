import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GREY, WHITE} from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
const OrgNotification = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: WHITE}}>
      <View style={{alignItems: 'center', marginTop: 20, flexDirection: 'row'}}>
        <Icon
          name="arrow-left"
          size={28}
          color={GREY}
          style={{marginLeft: 20}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{fontSize: 24, color: GREY, marginLeft: '20%'}}>
          Notifications
        </Text>
      </View>
    </View>
  );
};

export default OrgNotification;

const styles = StyleSheet.create({});
