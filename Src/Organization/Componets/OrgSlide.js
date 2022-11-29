import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {DARK} from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OrgSlide = ({navigation}) => {

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
          setemail(data.email);
        } else {
          setemail(null);
        }
      } else {
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
    <View style={{flex: 1, borderTopLeftRadius: 40, borderBottomLeftRadius: 40, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: '#E14D2A'}}>
      <View
      style={{borderBottomColor: '#E14D2A', borderBottomWidth: 1, padding: 20, backgroundColor: "#FAC898", borderTopLeftRadius: 40,}}
      >
        <Text style={styles.text}>Admin</Text>
        <Text style={{color:'#E14D2A'}}>{email}</Text>
      </View>
      <View style={{borderBottomLeftRadius: 40, backgroundColor: 'white', flex: 1, paddingTop: 20}}>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Home')}>
          <View style={styles.manuconatiner}>
            <Icon
              name="home"
              size={15}
              style={{marginRight: 10}}
              color="#000"
            />
            <Text style={styles.heading}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Completed')}>
          <View style={styles.manuconatiner}>
            <Image
              source={require('../../Assets/Images/checked.png')}
              style={{
                width: 15,
                height: 15,
                tintColor: "#000",
                marginRight: 10
              }}
            />
            <Text style={styles.heading}>Completed</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Forwarded')}>
          <View style={styles.manuconatiner}>
            <Image
              source={require('../../Assets/Images/forward.png')}
              style={{
                width: 15,
                height: 15,
                tintColor: "#000",
                marginRight: 10
              }}
            />
            <Text style={styles.heading}>Forwarded</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Pending')}>
          <View style={styles.manuconatiner}>
            <Image
              source={require('../../Assets/Images/pending.png')}
              style={{
                width: 15,
                height: 15,
                tintColor: "#000",
                marginRight: 10
              }}
            />
            <Text style={styles.heading}>Pending</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => logout()}>
          <View style={styles.manuconatiner}>
            <Icon
              name="sign-out-alt"
              size={15}
              style={{marginRight: 10}}
              color="#000"
            />
            <Text style={[styles.heading,{marginLeft:1,}]}>Logout</Text>
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
    color: '#E14D2A',
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 5,
  },
  options: {
    color: "#E14D2A",
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
    borderBottomWidth: 1,
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
export default OrgSlide;
