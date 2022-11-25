import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {DARK, GREY, PRIMARY, WHITE} from '../Organization/Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {theme} from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Heading from '../components/Heading';
const Emanu = ({navigation}) => {
  const logout = async () => {
    let data = {
      loggedin: false,
      loggedIntype: '',
    };
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.mergeItem('@user_data', jsonValue);
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthStack'}],
      });
    } catch (e) {
      console.log('error in saving data', e);
    }
  };
  return (
    <View style={{paddingHorizontal: 12}}>
      <View>
        <Heading navigation={navigation} />
      </View>
      <View>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Home')}>
          <View style={styles.manuconatiner}>
            <Icon name="home" size={16} style={{marginRight:10}}  color='#808080'/>
            <Text style={styles.heading}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Bills')}>
          <View style={styles.manuconatiner}>
            <Icon name="exchange-alt" size={16} style={{marginRight:10}}  color='#808080'/>
            <Text style={styles.heading}>Bills</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Add')}>
          <View style={styles.manuconatiner}>
            <Icon name="plus-circle" size={16} style={{marginRight:10}} color='#808080'/>
            <Text style={styles.heading}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Notification')}>
          <View style={styles.manuconatiner}>
            <Icon name="bell" size={16} style={{marginRight:10}} color='#808080'/>
            <Text style={styles.heading}>Notification</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => logout()}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 280,
            alignSelf:'baseline'
          }}>
          {/* <Text style={[styles.logout]}>Logout</Text> */}

          {/* <Icon
            name="sign-out-alt"
            size={24}
            color={theme.colors.primary}
            style={{marginRight: 20}}
          /> */}
        </View>
      </TouchableOpacity>

    </View>
  );
};

export default Emanu;

const styles = StyleSheet.create({
  manuconatiner: {
    flexDirection: 'row',
    alignItems:'center',
     
  },
  screenCiantainer: {
    marginTop: 35,
    borderBottomWidth:1,
    borderBottomColor:"#808080"
    ,paddingBottom:12
  },
  heading: {
    fontSize: 18,

    color: '#808080',
  },logout:{
    textShadowColor: 'rgba(0, 0, 0, 0.23)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color:DARK,
  }
});
