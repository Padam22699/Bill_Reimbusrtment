import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {DARK, WHITE} from '../Organization/Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ShowDate = ({date, updateDate}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 10,
          elevation: 10,
          backgroundColor: 'red',
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: 20,
          backgroundColor: WHITE,
          width: '36%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: DARK, fontWeight: '700'}}>{date}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            updateDate('');
          }}>
          <Icon name="times" size={20} color={DARK} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ShowDate;

const styles = StyleSheet.create({});
