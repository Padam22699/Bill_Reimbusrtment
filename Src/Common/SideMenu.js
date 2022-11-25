import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Imagepath from '../Assets/Images/Imagepath';
import {theme} from '../core/theme';
import {DARK, GREY, PRIMARY, WHITE} from '../Organization/Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
const SideMenu = ({navigation}) => {
  const [name, setName] = useState(null);
  const [email, setemail] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_data');
      console.log('value', value);
      if (value !== null) {
        const data = JSON.parse(value);
        if (data != null) {
          setName(data.first_name + ' ' + data.last_name);
          setemail(data.email);
        } else {
          setName(null);
          setemail(null);
        }
      } else {
        setName(null);
        setemail(null);
      }
    } catch (e) {
      console.log('storage error', e);
    }
  };

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
      <View style={{flexDirection: 'row', alignItems: 'center',borderBottomColor:GREY,borderBottomWidth:1}}>
        {/* <View
          style={{
            // borderColor: GREY,
            // borderWidth: 2,
            padding: 10,
            borderRadius: 40,
            marginRight: 10,
          }}>
          <Icon name="user" size={20} color={GREY} style/>
        </View> */}
        <View
          style={{
            borderBottomColor: GREY,
            // borderBottomWidth: 1,
            // paddingBottom: 20,
            marginBottom:20
          }}>
          <Text style={styles.text}>{name}</Text>
          <Text style={{color: '#6F7378'}}>{email}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Home')}>
          <View style={styles.manuconatiner}>
            <Icon
              name="home"
              size={20}
              style={{marginRight: 10}}
              color="#808080"
            />
            <Text style={styles.heading}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Bills')}>
          <View style={styles.manuconatiner}>
            <Icon
              name="exchange-alt"
              size={20}
              style={{marginRight: 10}}
              color="#808080"
            />
            <Text style={styles.heading}>Bills</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Add')}>
          <View style={styles.manuconatiner}>
            <Icon
              name="plus-circle"
              size={20}
              style={{marginRight: 10}}
              color="#808080"
            />
            <Text style={styles.heading}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Notification')}>
          <View style={styles.manuconatiner}>
            <Icon
              name="bell"
              size={20}
              style={{marginRight: 10}}
              color="#808080"
            />
            <Text style={styles.heading}>Notification</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => logout()}>
          <View style={styles.manuconatiner}>
            <Icon
              name="sign-out-alt"
              size={20}
              style={{marginRight: 10}}
              color="#808080"
            />
            <Text style={styles.heading}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    color: DARK,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    marginVertical: 5,
  },
  options: {
    color: theme.colors.primary,
    fontSize: 16,
    marginVertical: 5,
  },
  imageview: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imagestyle: {
    height: 120,
    width: 120,
  },
  manuconatiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenCiantainer: {
    marginTop: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#808080',
    paddingBottom: 12,
  },
  heading: {
    fontSize: 18,

    color: '#808080',
  },
  logout: {
    textShadowColor: 'rgba(0, 0, 0, 0.23)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: DARK,
  },
});
export default SideMenu;
