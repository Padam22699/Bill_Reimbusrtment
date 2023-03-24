import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WHITE} from '../Colors/Color';
import {theme} from '../../core/theme';
import * as Animatable from 'react-native-animatable';
const Welogo = ({COLOR}) => {
  return (
    <View style={styles.logocontainer}>
      <Animatable.Text
        animation="fadeInLeft"
        duration={2000}
        style={[styles.logo, {color: COLOR ? COLOR : theme.colors.primary}]}>
        WEDIGTECH
      </Animatable.Text>
      {/* <TouchableOpacity onPress={() => logout()}>
        <Icon name="sign-out-alt" size={20} color="#5D3FD3" />
      </TouchableOpacity> */}
    </View>
  );
};

export default Welogo;

const styles = StyleSheet.create({
  logocontainer: {
    backgroundColor: WHITE,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  logo: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
