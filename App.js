import AsyncStorage from '@react-native-async-storage/async-storage';
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, } from 'react-native';
import { useDispatch } from 'react-redux';
import Routes from './Src/Navigation/Routes';
import { setToken } from './Src/redux/actions/tokenAction';

const App = () => {

  const dispatch = useDispatch()

  const [ready, setReady] = useState(false)
  const [loggedin, setLoggedin] = useState(false)
=======
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Routes from './Src/Navigation/Routes';
import {Organization} from './Src/Navigation/Auth';
import DetailScreen from './Src/Screen/DetailScreen';
const App = () => {
  const [ready, setReady] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [loggedintype, setLoggedintype] = useState('');
>>>>>>> 51922f0a85637289835db01db5d876ca869e4efc

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    dispatch(setToken(null))
    try {
      const value = await AsyncStorage.getItem('@user_data');
      console.log('value', value);
      if (value !== null) {
        const data = JSON.parse(value);
        if (data != null) {
          setLoggedintype(data.loggedIntype);
          if (data.loggedin) {
            setLoggedin(true);
          } else {
            setLoggedin(false);
          }
          dispatch(setToken(data.token))
        } else {
          setLoggedin(false);
        }
      } else {
        setLoggedin(false);
      }
    } catch (e) {
      console.log('storage error', e);
    }
    setReady(true);
  };

  if (ready) {
    return (
      <NavigationContainer>
        <Routes loggedin={loggedin} loggedIntype={loggedintype} />
      </NavigationContainer>
    );
  } else {
    return <View></View>;
  }

  // return (
  //   <NavigationContainer>
  //     <Organization />
  //   </NavigationContainer>
  // );
};
export default App;
