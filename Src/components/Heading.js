import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  DARK,
  PRIMARY,
  WHITE,
  A,
  B,
  C,
  GREY,
} from '../Organization/Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {theme} from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Heading = (props) => {
  
  useEffect(() => {
    console.log('props' + JSON.stringify(props))
    getUserData();
  }, []);

  const getUserData = async () => {
    console.log('helo')
    try {
      const value = await AsyncStorage.getItem('@user_data');
      console.log('value', value);
      if (value !== null) {
        const data = JSON.parse(value);
        if (data != null) {
          setName(data.first_name + ' ' + data.last_name);
        } else {
          setName(null);
        }
      } else {
        setName(null);
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

      props.navigation.navigate('AuthStack')
      console.log('hello')
    } catch (e) {
      console.log('error in saving data  ', e);
    }
  };
  const [name, setName] = useState(null);
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.heading}>{name}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => logout()}>
          <Icon
            name="sign-out-alt"
            size={22}
            color={theme.colors.primary}
            style={{paddingRight: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
 
    marginTop: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
