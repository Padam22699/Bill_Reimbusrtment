import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {DARK, PRIMARY, WHITE} from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Menu = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.headingContiner}>
          <Text style={styles.heading}>Hi Admin</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={styles.heading}>Edit Profile</Text>

            <Icon
              name="arrow-right"
              size={24}
              color={PRIMARY}
              style={{marginRight: 20}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AuthStack')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={styles.heading}>LogOut</Text>

            <Icon
              name="sign-out-alt"
              size={24}
              color={PRIMARY}
              style={{marginRight: 20}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  subcontainer: {marginHorizontal: 10, marginTop: 10},
  headingContiner: {},
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: DARK,
  },
});