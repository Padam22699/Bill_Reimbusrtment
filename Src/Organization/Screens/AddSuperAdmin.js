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
import Logo from '../../components/Logo';
import OrgtextInput from '../Componets/OrgtextInput';
import {GREY, PRIMARY, WHITE} from '../Colors/Color';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {clearRegister, register} from '../../redux/actions/registerAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backbtn from '../Componets/Backbtn';
import Loader from '../Componets/Loader';
import {
  clearSuperAdmin,
  addSuperAdmin,
} from '../../redux/actions/addSuperAdmin';
import DeviceInfo from 'react-native-device-info';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {setToken} from '../../redux/actions/tokenAction';
import LoaderOrg from '../Componets/LoaderOrg';
import {emailValidator} from '../../helpers/emailValidator';
import {passwordValidator} from '../../helpers/passwordValidator';
import {nameValidator} from '../../helpers/nameValidator';
import {LastnameValidator} from '../../helpers/LastnameValidator';
const AddSuperAdminS = ({navigation}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState({value: '', error: ''});
  const [Lastname, setLastmame] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setpassword] = useState({value: '', error: ''});
  const [Confiirmpassword, setConfiirmpassword] = useState({
    value: '',
    error: '',
  });

  const addSuperAdminResponce = useSelector(
    state => state.addSuperAdminReducer.data,
  );
  const loading = useSelector(state => state.addSuperAdminReducer.loading);

  const AddadminPressed = () => {
    const nameError = nameValidator(name.value);
    const LastnameError = LastnameValidator(Lastname.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError || LastnameError) {
      setName({...name, error: nameError});
      setLastmame({...Lastname, error: LastnameError});
      setEmail({...email, error: emailError});
      setpassword({...password, error: passwordError});
      return;
    }
    if (password.value != Confiirmpassword.value) {
      setConfiirmpassword({
        ...Confiirmpassword,
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
        addSuperAdminApi(token);
      });
  };

  const addSuperAdminApi = firebase_token => {
    let request = {
      first_name: name.value,
      last_name: Lastname.value,
      email: email.value,
      password: password.value,
      confirm_password: password.value,
      role: 'organization',
      device_type: Platform.OS,
      device_token: firebase_token,
      device_id: DeviceInfo.getDeviceId(),
    };
    dispatch(addSuperAdmin(request));
  };

  useEffect(() => {
    if (addSuperAdminResponce != null) {
      console.log('addSuperAdminResponce', addSuperAdminResponce);
      if (
        Object.keys(addSuperAdminResponce).length != 0 &&
        addSuperAdminResponce.statusCode != 200
      ) {
        alert(addSuperAdminResponce.massage);
        dispatch(clearSuperAdmin());
      }
      if (
        Object.keys(addSuperAdminResponce).length != 0 &&
        addSuperAdminResponce.statusCode == 200
      ) {
        console.log('addSuperAdminResponce', addSuperAdminResponce.data);
        saveData(addSuperAdminResponce.data);
        setName({value: ''});
        setEmail({value: ''});
        setLastmame({value: ''});
        setpassword({value: ''});
        setConfiirmpassword({value: ''});
        dispatch(setToken(addSuperAdminResponce.data.token));
      }
    }
  }, [addSuperAdminResponce]);

  const saveData = async data => {
    let userData = data;
    userData = {...userData, ...{addAdmin: true, addAdminType: 'Super'}};

    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('@super_Admin_data', jsonValue);
      dispatch(clearSuperAdmin());
      // navigation.navigate('Tabs');
      // navigation.reset({
      //   index: 0,
      //   rautes: [{name: 'Tabs'}],
      // });
      navigation.goBack();
    } catch (e) {
      console.log('error in saving data', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: Platform.OS === 'ios' ? 40 : 0}}>
        <Backbtn goBack={navigation.goBack} />
      </View>

      <View style={{alignItems: 'center'}}>
        <Logo />
        <Text style={styles.textcreate}>Add Super Admin</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboarstyle}
        keyboardShouldPersistTaps="always">
        <ScrollView
          nestedScrollEnabled={true}
          //scrollEnabled={this.state.openCountryDropwdown ? false : true}
          keyboardShouldPersistTaps={'handled'}
          style={styles.innerContainer}>
          <OrgtextInput
            placeholder="First Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={text => setName({value: text, error: ''})}
            error={!!name.error}
            errorText={name.error}
          />
          <OrgtextInput
            placeholder="Last Name"
            returnKeyType="next"
            value={Lastname.value}
            onChangeText={text => setLastmame({value: text, error: ''})}
            error={!!Lastname.error}
            errorText={Lastname.error}
          />
          <OrgtextInput
            placeholder="Email"
            returnKeyType="next"
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={email.value}
            onChangeText={text => setEmail({value: text, error: ''})}
            error={!!email.error}
            errorText={email.error}
          />
          <OrgtextInput
            placeholder="Password"
            returnKeyType="next"
            password={true}
            value={password.value}
            onChangeText={text => setpassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
          />
          <OrgtextInput
            placeholder="Confirm Password"
            returnKeyType="done"
            password={true}
            value={Confiirmpassword.value}
            onChangeText={text => setConfiirmpassword({value: text, error: ''})}
            error={!!Confiirmpassword.error}
            errorText={Confiirmpassword.error}
          />
          <View style={styles.signview}>
            <TouchableOpacity
              mode="contained"
              onPress={AddadminPressed}
              activeOpacity={0.9}>
              <LinearGradient
                colors={['#FAC898', '#E14D2A']}
                useAngle={true}
                angle={10}
                style={styles.touchabltext}>
                <Text style={styles.textstyle}>Add</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* {loading && <LoaderOrg />} */}
    </View>
  );
};

export default AddSuperAdminS;

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
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: WHITE,
    paddingHorizontal: 15,
    width: '100%',
  },
});
