import AsyncStorage from '@react-native-async-storage/async-storage';
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

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    dispatch(setToken(null))
    try {
      const value = await AsyncStorage.getItem('@user_data')
      console.log("value", value)
      if (value !== null) {
        const data = JSON.parse(value)
        if (data != null) {
          if (data.loggedin) {
            setLoggedin(true)
          } else {
            setLoggedin(false)
          }
          dispatch(setToken(data.token))
        } else {
          setLoggedin(false)
        }
      } else {
        setLoggedin(false)
      }
    } catch (e) {
      console.log("storage error", e)
    }
    setReady(true)
  }

  if (ready) {
    return (
      <NavigationContainer>
        <Routes loggedin={loggedin} />
      </NavigationContainer>
    )
  } else {
    return (
      <View></View>
    )
  }
};
export default App;
