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
import {DARK, GREY, PRIMARY, WHITE} from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
export const OrgSlide = ({navigation}) => {
  const [name, setName] = useState(null);

  //   useEffect(() => {
  //     getUserData();
  //   }, []);

  //   const getUserData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('@user_data');
  //       console.log('value', value);
  //       if (value !== null) {
  //         const data = JSON.parse(value);
  //         if (data != null) {
  //           setName(data.first_name + ' ' + data.last_name);
  //         } else {
  //           setName(null);
  //         }
  //       } else {
  //         setName(null);
  //       }
  //     } catch (e) {
  //       console.log('storage error', e);
  //     }
  //   };

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
      <View
      style={{borderBottomColor:GREY,borderBottomWidth:1,paddingBottom:15}}
      >
        <Text style={styles.text}>Admin</Text>
        <Text style={{color:'#6F7378'}}>Admin@gmail.com</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.screenCiantainer}
          onPress={() => navigation.navigate('Home')}>
          <View style={styles.manuconatiner}>
            <Icon
              name="home"
              size={18}
              style={{marginRight: 10}}
              color="#808080"
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
                width: 20,
                height: 20,
                tintColor: GREY,
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
                width: 20,
                height: 20,
                tintColor: GREY,
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
                width: 20,
                height: 20,

                tintColor: GREY,
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
              size={16}
              style={{marginRight: 10}}
              color="#808080"
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
    color: PRIMARY,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    marginVertical: 5,
  },
  options: {
    color: PRIMARY,
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
    marginTop: 13,
    // borderBottomWidth: 1,
    // borderBottomColor: '#808080',
    paddingBottom: 12,
  },
  heading: {
    fontSize: 18,
    marginLeft: 10,
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
export default OrgSlide;
