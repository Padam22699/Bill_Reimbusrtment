import React, { useState, useEffect } from 'react'
import { View, StyleSheet, StatusBar, TouchableOpacity, ScrollView, KeyboardAvoidingView, } from 'react-native'
import { Text } from 'react-native-paper'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { OrganizationValidator } from '../helpers/OrganizationValidator'
import { LastnameValidator } from '../helpers/LastnameValidator'
import LinearGradient from 'react-native-linear-gradient';


export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [Lastname, setLastname] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [Organization, setOrganization] = useState({ value: '', error: '' })


  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const lastnameError = LastnameValidator(Lastname.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const OrganizationError = OrganizationValidator(Organization.value)

    if (emailError || passwordError || nameError || lastnameError || OrganizationError) {
      setName({ ...name, error: nameError })
      setLastname({ ...Lastname, error: lastnameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setOrganization({ ...Organization, error: OrganizationError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }


  return (

    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.surface}
        barStyle="dark-content" />
      <BackButton goBack={navigation.goBack} />
      <View style={{ alignItems: 'center' }}>
        <Logo />
        <Text style={styles.textcreate}>
          Create Account
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding"
        style={styles.keyboarstyle}>
        <ScrollView nestedScrollEnabled={true}
          //scrollEnabled={this.state.openCountryDropwdown ? false : true}
          keyboardShouldPersistTaps={'handled'}
          style={styles.innerContainer}>
          <TextInput
            label="First Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />
          <TextInput
            label="Last Name"
            returnKeyType="next"
            value={Lastname.value}
            onChangeText={(text) => setLastname({ value: text, error: '' })}
            error={!!Lastname.error}
            errorText={Lastname.error}
          />
          <TextInput
            label="Email"
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
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <TextInput
            label="Organization id"
            returnKeyType="done"
            value={Organization.value}
            onChangeText={(text) => setOrganization({ value: text, error: '' })}
            error={!!Organization.error}
            errorText={Organization.error}
          />
          <View style={styles.signview}>
            <TouchableOpacity mode="contained" onPress={onSignUpPressed} activeOpacity={0.9}>
              <LinearGradient colors={["#7426f2", '#3d0891']} style={styles.touchabltext}>
                <Text style={styles.textstyle}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: theme.colors.surface, paddingVertical: 10
  },
  textcreate: {
    fontSize: 18, color: theme.colors.primary, fontWeight: '700'
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10, justifyContent: "center"
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  keyboarstyle: {
    flex: 1, width: '100%',
  },
  touchabltext: {
    height: 45, justifyContent: 'center', borderRadius: 7, alignItems: 'center', justifyContent: 'center',
    marginTop: 20
  },
  textstyle: {
    fontSize: 18, color: "#fff"
  },
  signview: {
    paddingHorizontal: 20, width: '100%', maxWidth: "100%"
  },
  innerContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 15,
    width: '100%',
  },
})
