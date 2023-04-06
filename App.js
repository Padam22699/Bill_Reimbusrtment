import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import Routes from './Src/Navigation/Routes';
import {useDispatch} from 'react-redux';
import {setToken} from './Src/redux/actions/tokenAction';
import {Organization} from './Src/Navigation/Auth';
import DetailScreen from './Src/Screen/DetailScreen';
import Loader from './Src/Organization/Componets/Loader';
import {theme} from './Src/core/theme';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {PRIMARY, WHITE} from './Src/Organization/Colors/Color';
import BufferLoader from './Src/Loader/BufferLoader';

import NetInfo from '@react-native-community/netinfo';
import NetWorkConnectionModel from './Src/NetWorkConnection/NetWorkConnectionModel';
import MultiSelectFilter from './Src/Filter/MultiSelectFilter';
const App = () => {
  const [ready, setReady] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [loggedintype, setLoggedintype] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();

  const NetWorkState = async () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
      console.log('isConnected', isConnected);
    });
  };

  useEffect(() => {
    // NetWorkState();
    initializeApp();
  }, []);

  // useEffect(() => {}, []);
  const initializeApp = async () => {
    dispatch(setToken(null));
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
          dispatch(setToken(data.token));
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
      // <MultiSelectFilter />

      <NavigationContainer>
        <Routes loggedin={loggedin} loggedIntype={loggedintype} />
      </NavigationContainer>
    );
  } else {
    return <View></View>;
  }
};
export default App;
