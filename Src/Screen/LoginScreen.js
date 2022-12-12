import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {Text} from 'react-native-paper';
import Logo from '../components/Logo';
import Header from '../components/Header';
import EmpTextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {clearLogin, login} from '../redux/actions/loginAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {
  clearForgotPassword,
  forgotPassword,
} from '../redux/actions/forgotPasswordAction';
import Loader from '../Organization/Componets/Loader';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const loginResponse = useSelector(state => state.loginReducer.data);
  const loading = useSelector(state => state.loginReducer.loading);
  const forgetloading = useSelector(
    state => state.forgotPasswordReducer.loading,
  );
  const forgotPasswordResponse = useSelector(
    state => state.forgotPasswordReducer.data,
  );

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    requestUserPermission();
    // saveData()
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFirebaseToken();
    }
  };

  const getFirebaseToken = async () => {
    await messaging()
      .getToken()
      .then(token => {
        loginAPI(token);
      });
  };

  const saveData = async newData => {
    let userData = newData;
    userData = {...userData, ...{loggedin: true, loggedIntype: 'Emp'}};
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('@user_data', jsonValue);

      navigation.reset({
        index: 0,
        routes: [{name: 'MyDrawer'}],
      });
    } catch (e) {
      console.log('error in saving data', e);
    }
  };
  const loginAPI = firebase_token => {
    const request = {
      email: email.value,
      password: password.value,
      role: 'employee',
      device_type: Platform.OS,
      device_token: firebase_token,
      device_id: DeviceInfo.getDeviceId(),
    };
    dispatch(login(request));
  };

  useEffect(() => {
    if (loginResponse != null) {
      console.log('loginResponse', loginResponse);
      if (
        Object.keys(loginResponse).length != 0 &&
        loginResponse.statusCode != 200
      ) {
        alert(loginResponse.Messages);
        dispatch(clearLogin());
      }
      if (
        Object.keys(loginResponse).length != 0 &&
        loginResponse.statusCode == 200
      ) {
        console.log('response', loginResponse);
        saveData(loginResponse.data);
        dispatch(clearLogin());
      }
    }
  }, [loginResponse]);

  const forgotPasswordPress = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
    forgotPasswordAPI();
  };
  const forgotPasswordAPI = () => {
    let request = {
      email: email.value,
      role: 'employee',
    };
    dispatch(forgotPassword(request));
  };
  useEffect(() => {
    if (forgotPasswordResponse != null) {
      console.log('forgotPasswordResponse', forgotPasswordResponse);
      if (
        Object.keys(forgotPasswordResponse).length != 0 &&
        forgotPasswordResponse.statusCode != 200
      ) {
        alert(forgotPasswordResponse.message);
        dispatch(clearForgotPassword());
      }
      if (
        Object.keys(forgotPasswordResponse).length != 0 &&
        forgotPasswordResponse.statusCode == 200
      ) {
        console.log('response', forgotPasswordResponse);
        alert(forgotPasswordResponse.message);
        dispatch(clearForgotPassword());
      }
    }
  }, [forgotPasswordResponse]);

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.colors.surface,
          width: '100%',
        }}>
        <StatusBar
          backgroundColor={theme.colors.surface}
          barStyle="dark-content"
        />
        <View style={{marginTop:Platform.OS === 'ios' ? 60 :0}}>
          <BackButton goBack={navigation.goBack} />
        </View>

        <KeyboardAvoidingView style={styles.keyboar}>
          <Logo />
          <Header>LOGIN</Header>
          <EmpTextInput
            placeholder="Email id"
            returnKeyType="next"
            value={email.value}
            onChangeText={text => setEmail({value: text, error: ''})}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <EmpTextInput
            placeholder="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
            password={true}
          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity activeOpacity={0.8} onPress={forgotPasswordPress}>
              <Text style={styles.forgot}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={{paddingHorizontal: 20, width: '100%', maxWidth: '100%' , marginTop:Platform.OS === 'ios' ?20 :0}}>
          <TouchableOpacity
            mode="contained"
            onPress={onLoginPressed}
            activeOpacity={0.9}>
            <LinearGradient
              colors={['#CF9FFF', '#5D3FD3']}
              useAngle={true}
              angle={10}
              style={styles.touchabltext}>
              <Text style={styles.textstyle}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {(loading || forgetloading) && <Loader />}
    </>
  );
}

const styles = StyleSheet.create({
  keyboar: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.PRIMARY,
    fontWeight: 'bold',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.PRIMARY,
  },
  touchabltext: {
    height: 45,
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
  },
  textstyle: {
    fontSize: 18,
    color: '#fff',
  },
});
