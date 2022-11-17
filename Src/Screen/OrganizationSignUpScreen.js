import React, { useState } from 'react'
import { View, StyleSheet, StatusBar, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { OrganizationValidator } from '../helpers/OrganizationValidator'
import { AddressValidator } from '../helpers/AddressValidator'
import {EmployeeValidator} from '../helpers/EmployeeValidator'

export default function OrganizationSignUpScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [Organization, setOrganization] = useState({ value: '', error: '' })
    const [Employee, setEmployee] = useState({ value: '', error: '' })
    const [Address, setAddress] = useState({ value: '', error: '' })

      
    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value)
        const AddressError = AddressValidator(Address.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        const OrganizationError = OrganizationValidator(Organization.value)
        const EmployeeError = EmployeeValidator(Employee.value)


        if (emailError || passwordError || nameError || AddressError || OrganizationError || EmployeeError) {
            setName({ ...name, error: nameError })
            setAddress({ ...Address, error: AddressError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setOrganization({ ...Organization, error: OrganizationError })
            setEmployee({ ...Employee, error: EmployeeError })

            return
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
        })
    }

    return (
        <ScrollView style={{ backgroundColor: theme.colors.surface }}>
            <StatusBar
                backgroundColor={theme.colors.surface}
                barStyle="dark-content" />
            <KeyboardAvoidingView style={styles.keyboarstyle}>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Create Account</Header>
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: '' })}
                    error={!!name.error}
                    errorText={name.error}
                />
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
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <TextInput
                    label="Name of Employee"
                    returnKeyType="done"
                    value={Employee.value}
                    onChangeText={(text) => setEmployee({ value: text, error: '' })}
                    error={!!Employee.error}
                    errorText={Employee.error}
                    secureTextEntry
                />
                <TextInput
                    label="Organization id"
                    returnKeyType="done"
                    value={Organization.value}
                    onChangeText={(text) => setOrganization({ value: text, error: '' })}
                    error={!!Organization.error}
                    errorText={Organization.error}
                    secureTextEntry
                />
                <TextInput
                    label="Address"
                    returnKeyType="next"
                    value={Address.value}
                    onChangeText={(text) => setAddress({ value: text, error: '' })}
                    error={!!Address.error}
                    errorText={Address.error}
                />
                <Button
                    mode="contained"
                    onPress={onSignUpPressed}
                    style={{ marginTop: 24 }}
                >
                    Sign Up
                </Button>
                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('OrganizationLoginScreen')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.PRIMARY,
    },
    keyboarstyle: {
        flex: 1, padding: 20, width: '100%', maxWidth: "100%", alignSelf: 'center', alignItems: 'center',
        justifyContent: 'center',
    }
})
