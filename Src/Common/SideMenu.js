import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { theme } from '../core/theme';
import { DARK } from '../Organization/Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SideMenu = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setemail] = useState(null);
  const [data , setdata] =useState()

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
          console.log("Datatatatatatatt  => " ,data)
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
        routes: [{ name: 'AuthStack' }],
      });
    } catch (e) {
      console.log('error in saving data', e);
    }
  };

  return (
    <View style={{ flex: 1, borderLeftWidth: 2, borderColor: '#5D3FD3' }}>
      <View style={{ borderBottomColor: '#5D3FD3', borderBottomWidth: 1, padding: 20, backgroundColor: "#E6E6FA", }}>
        <Text style={styles.text}>{name}</Text>
        <Text adjustsFontSizeToFit={true} allowFontScaling={true} numberOfLines={1} style={{ color: '#5D3FD3' }}>{email}</Text>
      </View>

      <View style={{backgroundColor: 'white', flex: 1, paddingTop: 20}}>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Home')}>
          <View style={styles.manuconatiner}>
            <Icon
              name="home"
              size={20}
              style={{ marginRight: 10 }}
              color='#000'
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
              style={{ marginRight: 10 }}
              color='#000'
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
              style={{ marginRight: 10 }}
              color='#000'
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
              style={{ marginRight: 10 }}
              color='#000'
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
              style={{ marginRight: 10 }}
              color='#000'
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
    // marginTop :Platform.OS === 'ios' ? 33 :0 ,
    color: '#5D3FD3',
    fontSize: 22,
    fontWeight: '700',
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
    // borderBottomWidth: 1,
    paddingHorizontal: 20, 
    paddingVertical: 5
  },
  screenCiantainer: {
    marginBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#808080',
  },
  heading: {
    fontSize: 14,
    color: '#000',
  },
  logout: {
    textShadowColor: 'rgba(0, 0, 0, 0.23)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: DARK,
  },
});
export default SideMenu;
