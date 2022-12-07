import React, { useState } from 'react'
import { TouchableOpacity, StatusBar, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Text } from 'react-native-paper'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

export default function OrganizationLoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
    }
  }

  return (
    <View style={{flex:1,backgroundColor:theme.colors.surface}}>
      <StatusBar
        backgroundColor={theme.colors.surface}
        barStyle="dark-content" />
      <KeyboardAvoidingView style={styles.keyboar}>
        <BackButton goBack={navigation.goBack} />
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
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('OrganizationSignUpScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  keyboar: {
    flex: 1, padding: 20, width: '100%', maxWidth: "100%",
    alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
  },
  forgotPassword: {
    width: '100%', alignItems: 'flex-end', marginBottom: 24,
  },
  row: {
    flexDirection: 'row', marginTop: 4,
  },
  forgot: {
    fontSize: 13, color: theme.colors.PRIMARY, fontWeight: 'bold'
  },
  link: {
    fontWeight: 'bold', color: theme.colors.PRIMARY,
  },
})
