import React, { useState } from 'react'
import { TouchableOpacity, StatusBar, StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { Text } from 'react-native-paper'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux'
import DeviceInfo from 'react-native-device-info';
import { clearLogin, login } from '../redux/actions/loginAction';
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LoginScreen({ navigation }) {

  const dispatch = useDispatch();
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })


  const loginResponse = useSelector(state => state.loginReducer.data);
  const loading = useSelector(state => state.loginReducer.loading);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    loginAPI()
    // saveData()
  }

  const saveData = async (newData) => {
    let userData = newData;
    userData = { ...userData, ...{ loggedin: true } }
    try {
      const jsonValue = JSON.stringify(userData)
      await AsyncStorage.setItem('@user_data', jsonValue)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Drawer' }],
      })
    } catch (e) {
      console.log("error in saving data", e)
    }
  }

  const loginAPI = () => {
    const request = {
      'email': email.value,
      'password': password.value,
      'role': "employee",
      "device_type": Platform.OS,
      "device_token": "123456",
      "device_id": DeviceInfo.getDeviceId()
    }
    dispatch(login(request));
  }

  useEffect(() => {
    if (loginResponse != null) {
      console.log("loginResponse", loginResponse)
      if (Object.keys(loginResponse).length != 0 && loginResponse.statusCode != 200) {
        alert(loginResponse.Messages)
        dispatch(clearLogin())
      }
      if (Object.keys(loginResponse).length != 0 && loginResponse.statusCode == 200) {
        console.log("response", loginResponse)
        saveData(loginResponse.data)
        dispatch(clearLogin())
      }
    }

  }, [loginResponse])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.surface, }}>
      <StatusBar
        backgroundColor={theme.colors.surface}
        barStyle="dark-content" />
      <BackButton goBack={navigation.goBack} />
      <KeyboardAvoidingView style={styles.keyboar}>
        <Logo />
        <Header>LOGIN</Header>
        <TextInput
          label="Email id"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          keyboardType="numeric"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={{ paddingHorizontal: 20, width: '100%', maxWidth: "100%", }}>
        <TouchableOpacity mode="contained" onPress={onLoginPressed} activeOpacity={0.9}>
          <LinearGradient colors={["#7426f2", '#3d0891']} style={styles.touchabltext}>
            <Text style={styles.textstyle}>
              Login
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  keyboar: {
    flex: 1, padding: 20, width: '100%', maxWidth: "100%",
    alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
  },
  forgotPassword: {
    width: '100%', alignItems: 'flex-end', marginBottom: 18,
  },
  row: {
    flexDirection: 'row', marginTop: 12, justifyContent: "center"
  },
  forgot: {
    fontSize: 13, color: theme.colors.primary, fontWeight: 'bold'
  },
  link: {
    fontWeight: 'bold', color: theme.colors.primary,
  },
  touchabltext: {
    height: 45, justifyContent: 'center', borderRadius: 7, alignItems: 'center', justifyContent: 'center'
  },
  textstyle: {
    fontSize: 18, color: "#fff"
  },
})
