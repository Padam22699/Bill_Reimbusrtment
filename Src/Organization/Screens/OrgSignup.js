import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {Text} from 'react-native-paper';
import Logo from '../../components/Logo';
import OrgtextInput from '../Componets/OrgtextInput';
import {GREY, PRIMARY, WHITE} from '../Colors/Color';
import ImagePicker from 'react-native-image-crop-picker';
import {
  OrganizationNameV,
  OrganizationAddressV,
  emailValidatorV,
  passwordValidatorV,
} from '../Validation/OrgnizationValidation';
import {LastnameValidator} from '../../helpers/LastnameValidator';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {clearRegister, register} from '../../redux/actions/registerAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backbtn from '../Componets/Backbtn';

export default function OrgSignup({navigation}) {
  const dispatch = useDispatch();

  const [logo, setLogo] = useState('');
  const imageCrop = () => {
    Alert.alert('Upload Logo', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'destructive',
      },
      {text: 'Gallery', onPress: () => OpenGallery(), style: {color: PRIMARY}},
      {text: 'Camera', onPress: () => OpenCamera()},
    ]);
    const OpenGallery = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setLogo(image.path);
      });
    };
    const OpenCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setLogo(image.path);
      });
    };
  };

  const [OrganizationName, setOrganizationName] = useState({
    value: '',
    error: '',
  });
  const [OrganizationAddress, setOrganizationAddress] = useState({
    value: '',
    error: '',
  });
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const registerResponse = useSelector(state => state.registerReducer.data);
  const loading = useSelector(state => state.registerReducer.loading);

  const onSignUpPressed = () => {
    const OrganizationNameError = OrganizationNameV(OrganizationName.value);
    const OrganizationAddError = OrganizationAddressV(
      OrganizationAddress.value,
    );
    const emailError = emailValidatorV(email.value);
    const passwordError = passwordValidatorV(password.value);
    // const OrganizationError = OrganizationValidator(Organization.value)

    if (
      emailError ||
      passwordError ||
      OrganizationNameError ||
      OrganizationAddError
    ) {
      setOrganizationName({...OrganizationName, error: OrganizationNameError});
      setOrganizationAddress({
        ...OrganizationAddress,
        error: OrganizationAddError,
      });
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      // setOrganization({ ...Organization, error: OrganizationError })
      return;
    }
    signup();
  };

  const signup = () => {
    let request = {
     OrganizationName: OrganizationName.value,
     OrganizationAddress: OrganizationAddress.value,
      email: email.value,
      password: password.value,
      logo:logo
    };
  };


  return (
    <View style={styles.container}>
      <Backbtn goBack={navigation.goBack} />
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
          <OrgtextInput
            label="Organization Name"
            returnKeyType="next"
            value={OrganizationName.value}
            onChangeText={text => setOrganizationName({value: text, error: ''})}
            error={!!OrganizationName.error}
            errorText={OrganizationName.error}
          />
          <OrgtextInput
            label="Address of organization"
            returnKeyType="next"
            value={OrganizationAddress.value}
            onChangeText={text => OrganizationAddress({value: text, error: ''})}
            error={!!OrganizationAddress.error}
            errorText={OrganizationAddress.error}
          />
          <OrgtextInput
            label="Email"
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
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.logoConatiner}
            onPress={() => imageCrop()}>
            <Text style={styles.logo}>Chose Logo</Text>
          </TouchableOpacity>

          <View style={styles.signview}>
            <TouchableOpacity
              mode="contained"
              // onPress={onSignUpPressed}
              onPress={() => navigation.navigate('OrgSignin')}
              activeOpacity={0.9}>
              <LinearGradient
                colors={[PRIMARY, PRIMARY]}
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
    height: 45,
    justifyContent: 'center',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textstyle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
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