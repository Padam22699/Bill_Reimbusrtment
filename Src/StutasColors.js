import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState, useFocusEffect} from 'react';
export const StatusColorss = () => {
  // const [loggedin1, setLoggedin1] = useState(false);
  // const [loggedintype1, setLoggedintype1] = useState('');

  let loggedin1 = false;
  let loggedIntype1 = '';

  useEffect(() => {
    initializeApp();
  }, []);
  const initializeApp = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_data');
      console.log('valueRoute', value);
      if (value !== null) {
        const data = JSON.parse(value);
        if (data != null) {
          loggedIntype1 = data.loggedIntype;
          if (data.loggedin) {
            loggedin1 = true;
          } else {
            loggedin1 = false;
          }
        } else {
          loggedin1 = false;
        }
      } else {
        loggedin1 = false;
      }
    } catch (e) {
      console.log('storage error', e);
    }
  };

  console.log("loggedin1" , loggedin1)
  console.log("loggedintype" , loggedIntype1)
  return {loggedin1, loggedIntype1};
};
