import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { theme } from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function EmpTextInput({
  errorText,
  description,
  password = false,
  ...props
}) {
  const [hidePassword, sethidePassword] = useState(password);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={hidePassword}
          style={styles.input}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => sethidePassword(!hidePassword)}
            name={hidePassword ? 'eye-slash' : 'eye'}
            size={20}
            style={{ marginRight: 8 }}
          />
        )}
      </View>

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
    borderWidth: 1,
    borderColor: "#5D3FD3",
    borderRadius: 15,
    padding: 4,
    backgroundColor: theme.colors.surface,
  },
  input: {
    backgroundColor: theme.colors.surface,
    flex: 1,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
