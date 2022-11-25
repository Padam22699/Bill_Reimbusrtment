import {StyleSheet, Text, View, Image, Touchable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {theme} from '../../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Welogo = props => {
  const logout = async () => {
    let data = {
      loggedin: false,
      loggedIntype: '',
    };
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.mergeItem('@user_data', jsonValue);

      props.navigation.navigate('AuthStack');
      console.log('hello');
    } catch (e) {
      console.log('error in saving data  ', e);
    }
  };
  return (
    <View style={styles.logocontainer}>
      {/* <View style={{backgroundColor:'#000' ,padding:7}}>
        <Image  source={require('../../Assets/we.png')} style={{height:20,width:20,resizeMode:'center'}} />
        </View> */}

      <Text style={styles.logo}>Wedigtech</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Icon name="sign-out-alt" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default Welogo;

const styles = StyleSheet.create({
  logocontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 12,
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  logo: {
    alignSelf: 'center',

    fontSize: 28,
    color: '#000',

    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.23)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginLeft: 82,
  },
});
