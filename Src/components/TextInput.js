import React, {useState} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {theme} from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DARK, GREY} from '../Organization/Colors/Color';
import {TextInput, DefaultTheme} from '@react-native-material/core';
export default function EmpTextInput({
  errorText,
  placeholder,
  description,
  errors,
  password = false,
  ...props
}) {
  const [hidePassword, sethidePassword] = useState(password);
  const [erros, seterrors] = useState(errors);
  // const customTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     error: 'red', // set the color of the error message to red
  //   },
  // };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onFocus={() => {
            seterrors(false);
          }}
          placeholderTextColor={GREY}
          placeholder={placeholder}
          label={placeholder}
          variant="outlined"
          outlineColor="red"
          labelStyle={{fontSize: 40, colors: GREY}}
          color={theme.colors.primary}
          labelColor={GREY}
          inputContainerStyle={{
            labelColor: GREY,
            color: GREY,
          }}
          secureTextEntry={hidePassword}
          floatingPlaceholder={true}
          style={[styles.input, {borderColor: DARK}]}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => sethidePassword(!hidePassword)}
            name={hidePassword ? 'eye-slash' : 'eye'}
            size={20}
            color={DARK}
            style={{marginRight: 8, position: 'absolute', right: 4}}
          />
        )}
      </View>

      {erros && (
        <View>
          <Text style={{color: 'red', marginHorizontal: 5, marginTop: -8}}>
            Plz Enter Amount
          </Text>
        </View>
      )}

      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderColor: '#5D3FD3',
    borderRadius: 15,
    padding: 4,
    backgroundColor: theme.colors.surface,
  },
  input: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    flex: 1,

    marginTop: Platform.OS === 'ios' ? 3 : 0,
  },
  description: {
    color: theme.colors.secondary,
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 0,
    marginHorizontal: 3,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 0,
    marginHorizontal: 3,
  },
});
