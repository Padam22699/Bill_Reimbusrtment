import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Routes from './Src/Navigation/Routes';
import { useDispatch } from 'react-redux';
import { setToken } from './Src/redux/actions/tokenAction';
import {Organization} from './Src/Navigation/Auth';
import DetailScreen from './Src/Screen/DetailScreen';
import Loader from './Src/Organization/Componets/Loader';

const App = () => {
  const [ready, setReady] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [loggedintype, setLoggedintype] = useState('');

  const dispatch = useDispatch()

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
      // <Loader/>
      <NavigationContainer>
        <Routes loggedin={loggedin} loggedIntype={loggedintype} />
      </NavigationContainer>
    );
  } else {
    return <View></View>;
  }
};
export default App;
