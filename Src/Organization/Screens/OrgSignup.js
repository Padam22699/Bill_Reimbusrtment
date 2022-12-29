import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Text} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import Logo from '../../components/Logo';
import OrgtextInput from '../Componets/OrgtextInput';
import {GREY, PRIMARY, WHITE} from '../Colors/Color';
import {
  OrganizationNameV,
  OrganizationAddressV,
  emailValidatorV,
  passwordValidatorV,
} from '../Validation/OrgnizationValidation';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {clearRegister, register} from '../../redux/actions/registerAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backbtn from '../Componets/Backbtn';
import Loader from '../Componets/Loader';
import messaging from '@react-native-firebase/messaging';
import {setToken} from '../../redux/actions/tokenAction';
import LoaderOrg from '../Componets/LoaderOrg';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

export default function OrgSignup({navigation}) {
  const dispatch = useDispatch();

  const [OrganizationName, setOrganizationName] = useState({
    value: '',
    error: '',
  });
  const [OrganizationAddres, setOrganizationAddres] = useState({
    value: '',
    error: '',
  });

  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });

  const registerResponse = useSelector(state => state.registerReducer.data);
  const loading = useSelector(state => state.registerReducer.loading);

  const onSignUpPressed = () => {
    const OrganizationNameError = OrganizationNameV(OrganizationName.value);
    const OrganizationAddError = OrganizationAddressV(OrganizationAddres.value);
    const emailError = emailValidatorV(email.value);
    const passwordError = passwordValidatorV(password.value);

    if (
      emailError ||
      passwordError ||
      OrganizationNameError ||
      OrganizationAddError
    ) {
      setOrganizationName({...OrganizationName, error: OrganizationNameError});
      setOrganizationAddres({
        ...OrganizationAddres,
        error: OrganizationAddError,
      });
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      // setOrganization({ ...Organization, error: OrganizationError })
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
      first_name: OrganizationName.value,
      last_name: OrganizationAddres.value,
      email: email.value,
      password: password.value,
      confirm_password: password.value,
      role: 'organization',
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
        alert(registerResponse.Messages);
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
    let Organizationdata = data;
    Organizationdata = {
      ...Organizationdata,
      ...{loggedin: true, loggedIntype: 'Org'},
    };
    try {
      const jsonValue = JSON.stringify(Organizationdata);
      console.log('Register', jsonValue);
      await AsyncStorage.setItem('@user_data', jsonValue);
      dispatch(setToken(data.token));
      dispatch(clearRegister());
      navigation.reset({
        index: 0,
        routes: [{name: 'OrgDrawer'}],
      });
    } catch (e) {
      console.log('error in saving data', e);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: Platform.OS === 'ios' ? responsiveScreenHeight(5) : 0,
        }}>
      <Backbtn goBack={navigation.goBack} />
      </View>

      <View
        style={{
          marginTop: responsiveScreenHeight(-3),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Logo />
        <Text style={styles.textcreate}>Create Account</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboarstyle}
        keyboardShouldPersistTaps="always">
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          //scrollEnabled={this.state.openCountryDropwdown ? false : true}
          keyboardShouldPersistTaps={'handled'}
          style={styles.innerContainer}>
          <OrgtextInput
            placeholder="Organization Name"
            returnKeyType="next"
            value={OrganizationName.value}
            onChangeText={text => setOrganizationName({value: text, error: ''})}
            error={!!OrganizationName.error}
            errorText={OrganizationName.error}
          />
          <OrgtextInput
            placeholder="Address of organization"
            returnKeyType="next"
            value={OrganizationAddres.value}
            onChangeText={text =>
              setOrganizationAddres({value: text, error: ''})
            }
            error={!!OrganizationAddres.error}
            errorText={OrganizationAddres.error}
          />
          <OrgtextInput
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
          <OrgtextInput
            placeholder="Password"
            returnKeyType="next"
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
            password={true}
          />
          <OrgtextInput
            placeholder="Confirm Password"
            returnKeyType="done"
            value={confirmPassword.value}
            onChangeText={text => setConfirmPassword({value: text, error: ''})}
            error={!!confirmPassword.error}
            errorText={confirmPassword.error}
            password={true}
          />
          {/* <Text style={{color:GREY}}>Optional</Text> */}
          {/* <TouchableOpacity
            style={styles.logoConatiner}
            onPress={() => imageCrop()}>
            <Text style={styles.logo}>Chose Logo</Text>
          </TouchableOpacity> */}

          <View style={styles.signview}>
            <TouchableOpacity
              mode="contained"
              onPress={onSignUpPressed}
              activeOpacity={0.9}>
              <LinearGradient
                colors={['#FAC898', '#E14D2A']}
                useAngle={true}
                angle={10}
                style={styles.touchabltext}>
                <Text style={styles.textstyle}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.replace('OrgSignin')}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <LoaderOrg />}
    </View>
  );
}

const styles = StyleSheet.create({
  cancel: {color: PRIMARY},
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingVertical: 10,
  },
  logoConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREY,
    opacity: 0.8,
    borderRadius: 10,
    marginTop: 10,
  },
  logo: {fontSize: 18, paddingVertical: 12, color: WHITE, fontWeight: 'bold'},
  textcreate: {
    fontSize: 18,
    color: PRIMARY,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    marginBottom: 40,
  },
  link: {
    fontWeight: 'bold',
    color: PRIMARY,
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
    backgroundColor: WHITE,
    paddingHorizontal: 15,
    width: '100%',
  },
});
