import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Text} from 'react-native-paper';
import Logo from '../components/Logo';
import EmpTextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import {nameValidator} from '../helpers/nameValidator';
import {LastnameValidator} from '../helpers/LastnameValidator';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {clearRegister, register} from '../redux/actions/registerAction';
import {setToken} from '../redux/actions/tokenAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Loader from '../Organization/Componets/Loader';

export default function RegisterScreen({navigation}) {
  const dispatch = useDispatch();

  const [name, setName] = useState({value: '', error: ''});
  const [Lastname, setLastname] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [ConfirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });
  const [Organization, setOrganization] = useState({
    value: 'Wedig335431',
    error: '',
  });

  const registerResponse = useSelector(state => state.registerReducer.data);
  const loading = useSelector(state => state.registerReducer.loading);

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const lastnameError = LastnameValidator(Lastname.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError || lastnameError) {
      setName({...name, error: nameError});
      setLastname({...Lastname, error: lastnameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    if (password.value != ConfirmPassword.value) {
      setConfirmPassword({
        ...ConfirmPassword,
        error: 'Confirm Password do not match with Password',
      });
      return;
    }
    requestUserPermission();
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
        signup(token);
      });
  };

  const signup = firebase_token => {
    let request = {
      first_name: name.value,
      last_name: Lastname.value,
      email: email.value,
      password: password.value,
      confirm_password: password.value,
      organization_code: 'Wedig335431',
      role: 'employee',
      device_type: Platform.OS,
      device_token: firebase_token,
      device_id: DeviceInfo.getDeviceId(),
    };

    dispatch(register(request));
  };

  useEffect(() => {
    if (registerResponse != null) {
      console.log('registerResponse', registerResponse);
      if (
        Object.keys(registerResponse).length != 0 &&
        registerResponse.statusCode != 200
      ) {
        alert(registerResponse.message);
        dispatch(clearRegister());
      }
      if (
        Object.keys(registerResponse).length != 0 &&
        registerResponse.statusCode == 200
      ) {
        console.log('response', registerResponse.data);
        saveData(registerResponse.data);
        dispatch(setToken(registerResponse.data.token));
      }
    }
  }, [registerResponse]);

  const saveData = async data => {
    let userData = data;
    userData = {...userData, ...{loggedin: true, loggedIntype: 'Emp'}};
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('@user_data', jsonValue);
      dispatch(setToken(data.token));
      dispatch(clearRegister());
      navigation.reset({
        index: 0,
        routes: [{name: 'MyDrawer'}],
      });
    } catch (e) {
      console.log('error in saving data', e);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.colors.surface}
          barStyle="dark-content"
        />
        <View style={{marginTop: Platform.OS === 'ios' ? 50 : 0}}>
          <BackButton goBack={navigation.goBack} />
        </View>

        <View style={{alignItems: 'center'}}>
          <Logo />
          <Text style={styles.textcreate}>Create Account</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboarstyle}>
          <ScrollView
            nestedScrollEnabled={true}
            //scrollEnabled={this.state.openCountryDropwdown ? false : true}
            keyboardShouldPersistTaps={'handled'}
            style={styles.innerContainer}>
            <EmpTextInput
              placeholder="First Name"
              returnKeyType="next"
              value={name.value}
              onChangeText={text => setName({value: text, error: ''})}
              error={!!name.error}
              errorText={name.error}
            />
            <EmpTextInput
              placeholder="Last Name"
              returnKeyType="next"
              value={Lastname.value}
              onChangeText={text => setLastname({value: text, error: ''})}
              error={!!Lastname.error}
              errorText={Lastname.error}
            />
            <EmpTextInput
              placeholder="Email"
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
            <EmpTextInput
              placeholder="Confirm Password"
              returnKeyType="done"
              value={ConfirmPassword.value}
              onChangeText={text =>
                setConfirmPassword({value: text, error: ''})
              }
              error={!!ConfirmPassword.error}
              errorText={ConfirmPassword.error}
              password={true}
            />
            <EmpTextInput
              editable={false}
              placeholder="Organization id"
              returnKeyType="done"
              value={Organization.value}
              onChangeText={text => setOrganization({value: text, error: ''})}
              error={!!Organization.error}
              errorText={Organization.error}
            />
            <View style={styles.signview}>
              <TouchableOpacity
                mode="contained"
                onPress={onSignUpPressed}
                activeOpacity={0.9}>
                <LinearGradient
                  colors={['#CF9FFF', '#5D3FD3']}
                  useAngle={true}
                  angle={10}
                  style={styles.touchabltext}>
                  <Text style={styles.textstyle}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.replace('LoginScreen')}>
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {loading && <Loader />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingVertical: 10,
    width: '100%',
  },
  textcreate: {
    fontSize: 18,
    color: theme.colors.PRIMARY,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    marginBottom: 30,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.PRIMARY,
  },
  keyboarstyle: {
    flex: 1,
    width: '100%',
  },
  touchabltext: {
    marginVertical: 20,
    height: 45,
    justifyContent: 'center',
    borderRadius: 15,
  },
  textstyle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  signview: {
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: '100%',
  },
  innerContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 15,
    width: '100%',
  },
});
