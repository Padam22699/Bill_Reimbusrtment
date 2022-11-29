import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { theme } from '../core/theme';
import LinearGradient from 'react-native-linear-gradient';

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.violet}
        barStyle="dark-content"
      />
      <Animatable.View style={styles.imageview} animation="zoomInDown">
        <Image source={require('../Assets/L3.png')} style={styles.imagestyle} />
      </Animatable.View>

      <Animatable.View style={styles.Buttonview} animation="lightSpeedIn">
        <LinearGradient
          colors={['#CF9FFF', '#5D3FD3']}
          useAngle={true}
          angle={10}
          style={styles.touchabltext}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            activeOpacity={0.9}>
            <Text style={styles.textstyle}>Employee</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={{ marginTop: 45 }}>
          <LinearGradient
            colors={['#FAC898', '#E14D2A']}
            useAngle={true}
            angle={10}
            style={styles.touchabltext}>
            <TouchableOpacity
              onPress={() => navigation.navigate('OrgSignin')}
              activeOpacity={0.9}>
              <Text style={styles.textstyle}>Organization</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Animatable.View>
    </View>
  );
};
export default LandingScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.violet,
  },
  imageview: {
    // backgroundColor: theme.colors.violet,
    // width: '100%',
  },
  imagestyle: {
    height: 330,
    width: '100%',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  Buttonview: {
    marginTop: 45,
    marginHorizontal: 30,
  },
  imagestylelogo: {
    marginHorizontal: 30,
    position: 'absolute',
    bottom: 43,
  },
  imagesour: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  linearGradient: {
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
  },
  textstyle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  touchabltext: {
    height: 45,
    justifyContent: 'center',
    borderRadius: 15,
  },
});
