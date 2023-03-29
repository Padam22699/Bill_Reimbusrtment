import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';
import {GREY, PRIMARY, WHITE} from '../Organization/Colors/Color';
import {theme} from '../core/theme';
import {useState} from 'react';

const InputAmount = ({visibleModal}) => {
  const [visible, setVisible] = useState(visibleModal);
  const RenderItem = ({heading, placeholder}) => {
    return (
      <View>
        <Text
          style={{
            color: WHITE,
            fontSize: 16,
            marginHorizontal: 10,
            fontWeight: '700',
            marginTop: 10,
            marginBottom: 5,
          }}>
          {heading}
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: WHITE,
            marginHorizontal: 10,

            borderRadius: 10,
            paddingHorizontal: 5,
          }}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={GREY}></TextInput>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Modal visible={visible}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              width: '95%',
              height: 600,
              marginBottom: '30%',
              elevation: 10,
              borderRadius: 10,
            }}>
            <Image
              source={require('../Assets/Images/B.png')}
              style={{
                width: '100%',
                height: '50%',
                resizeMode: 'cover',
                borderRadius: 5,
              }}
            />
            <RenderItem heading={'Amount'} placeholder="Enter Amount" />
            <RenderItem heading={'Amount'} placeholder="Enter Amount" />
            <TouchableOpacity>
              <View>
                <Text style={{color: WHITE}}>Submie</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InputAmount;

const styles = StyleSheet.create({});
