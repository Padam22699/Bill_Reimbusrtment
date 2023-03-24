import React, {useState, useEffect} from 'react';
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
import {clearLogin, login} from '../../redux/actions/loginAction';
import Logo from '../../components/Logo';
import Backbtn from '../Componets/Backbtn';
import {theme} from '../../core/theme';
import {PRIMARY} from '../Colors/Color';
import {emailValidator} from '../../helpers/emailValidator';
import {passwordValidator} from '../../helpers/passwordValidator';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import OrgtextInput from '../Componets/OrgtextInput';
import Loader from '../Componets/Loader';
import messaging from '@react-native-firebase/messaging';
import {
  clearForgotPassword,
  forgotPassword,
} from '../../redux/actions/forgotPasswordAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderOrg from '../Componets/LoaderOrg';
import {setToken} from '../../redux/actions/tokenAction';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

export default function OrgSignin({navigation}) {
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
    console.log('hi');
    await messaging()
      .getToken()
      .then(token => {
        loginAPI(token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loginAPI = firebase_token => {
    const request = {
      email: email.value,
      password: password.value,
      role: 'organization',
      device_type: Platform.OS,
      device_token: firebase_token,
      device_id: DeviceInfo.getDeviceId(),
    };
    dispatch(login(request));
  };

  const saveData = async newData => {
    let Organizationdata = newData;
    Organizationdata = {
      ...Organizationdata,
      ...{loggedin: true, loggedIntype: 'Org'},
    };
    try {
      const jsonValue = JSON.stringify(Organizationdata);
      await AsyncStorage.setItem('@user_data', jsonValue);

      dispatch(setToken(newData.token));
      navigation.reset({
        index: 0,
        routes: [{name: 'OrgDrawer'}],
      });
    } catch (e) {
      console.log('error in saving data', e);
    }
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
      role: 'organization',
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.keyboar}>
        <StatusBar
          backgroundColor={theme.colors.surface}
          barStyle="dark-content"
        />
        <View style={styles.backbtncontiner}>
          <Backbtn goBack={navigation.goBack} />
        </View>

        <ScrollView
          style={{flex: 1, padding: 20}}
          contentContainerStyle={{alignItems: 'center'}}
          keyboardShouldPersistTaps="always">
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? responsiveScreenHeight(-3) : 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Logo />
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: PRIMARY,
                marginVertical: 20,
              }}>
              LOGIN
            </Text>
          </View>
          <OrgtextInput
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
          <OrgtextInput
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
          <View
            style={{
              padding: 20,
              width: '100%',
              maxWidth: '100%',
            }}>
            <TouchableOpacity
              mode="contained"
              onPress={onLoginPressed}
              // onPress={() =>
              //   navigation.navigate('OrgDrawer')
              //   // onLoginPressed()
              // }
              activeOpacity={0.9}>
              <LinearGradient
                colors={['#FAC898', '#E14D2A']}
                useAngle={true}
                angle={10}
                style={styles.touchabltext}>
                <Text style={styles.textstyle}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.replace('OrgSignup')}>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {(loading || forgetloading) && <LoaderOrg />}
    </>
  );
}

const styles = StyleSheet.create({
  keyboar: {
    flex: 1,
    // padding: 20,
    // width: '100%',
    // maxWidth: '100%',
    // alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
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
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  forgot: {
    fontSize: 13,
    color: PRIMARY,
    fontWeight: 'bold',
  },
  link: {
    fontWeight: 'bold',
    color: PRIMARY,
  },
  touchabltext: {
    height: 45,
    justifyContent: 'center',
    borderRadius: 7,
    alignItems: 'center',
  },
  textstyle: {
    fontSize: 18,
    color: '#fff',
  },
  backbtncontiner: {
    marginTop: Platform.OS === 'ios' ? responsiveScreenHeight(5) : 10,
  },
});
