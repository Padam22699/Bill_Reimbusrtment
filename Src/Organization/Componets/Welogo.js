import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Welogo = () => {
  
  return (
    <View style={styles.logocontainer}>
      <Text style={styles.logo}>Wedigtech</Text>
      {/* <TouchableOpacity onPress={() => logout()}>
        <Icon name="sign-out-alt" size={20} color="#5D3FD3" />
      </TouchableOpacity> */}
    </View>
  );
};

export default Welogo;

const styles = StyleSheet.create({
  logocontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  logo: {
    alignSelf: 'center',
    fontSize: 24,
    color: "#5D3FD3",
    fontWeight: 'bold',
  },
});
