import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {GREY, DARK} from '../Organization/Colors/Color';
const SearchName = ({upadteState}) => {
  return (
    <View
      //sss
      style={{
        marginHorizontal: 10,
        elevation: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginVertical: 7,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
      }}>
      <TextInput
        placeholder="Search"
        onChangeText={text => {
          console.log(text);
          upadteState(text);
        }}
        placeholderTextColor={GREY}
        style={{
          height: Platform.OS === 'ios' ? 50 : 50,
          width: '90%',
          color: DARK,
        }}
      />
    </View>
  );
};

export default SearchName;

const styles = StyleSheet.create({});
