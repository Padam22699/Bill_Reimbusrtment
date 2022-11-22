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
import Logo from '../../components/Logo';
import Backbtn from '../Componets/Backbtn';
import {theme} from '../../core/theme';
import {PRIMARY} from '../Colors/Color';
import {emailValidator} from '../../helpers/emailValidator';
import {passwordValidator} from '../../helpers/passwordValidator';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import OrgtextInput from '../Componets/OrgtextInput';
export default function OrgSignin({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const loginResponse = useSelector(state => state.loginReducer.data);
  const loading = useSelector(state => state.loginReducer.loading);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    loginAPI();
  };
  const loginAPI = () => {
    const request = {
      email: email.value,
      password: password.value,
      role: 'organization',
      device_type: Platform.OS,
      device_token: '123456',
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
      await AsyncStorage.setItem('@Organization_data', jsonValue);
      navigation.reset({
        index: 0,
        routes: [{name: 'MyTabs'}],
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

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.colors.surface}}>
      <StatusBar
        backgroundColor={theme.colors.surface}
        barStyle="dark-content"
      />
      <Backbtn goBack={navigation.goBack} />
      <KeyboardAvoidingView style={styles.keyboar}>
        <Logo />
        {/* <Header>LOGIN</Header> */}
        <Text style={{fontSize: 22, fontWeight: 'bold', color: PRIMARY}}>
          LOGIN
        </Text>
        <OrgtextInput
          label="Email id"
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
          label="Password"
          keyboardType="numeric"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({value: text, error: ''})}
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
      <View style={{paddingHorizontal: 20, width: '100%', maxWidth: '100%'}}>
        <TouchableOpacity
          mode="contained"
          // onPress={onLoginPressed}
          onPress={() =>
            // navigation.navigate('MyTabs')
            onLoginPressed()
          }
          activeOpacity={0.9}>
          <LinearGradient
            colors={[PRIMARY, PRIMARY]}
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
    justifyContent: 'center',
  },
  textstyle: {
    fontSize: 18,
    color: '#fff',
  },
});
