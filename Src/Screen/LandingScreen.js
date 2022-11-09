import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Imagepath from '../Assets/Images/Imagepath';
<<<<<<< HEAD
import Background from '../components/Background';
import Button from '../components/Button';
import {theme} from '../core/theme';
=======
import { theme } from '../core/theme';
>>>>>>> fb61d1a8bc73a7d54b610f596e9dec8c446d0cad
import LinearGradient from 'react-native-linear-gradient';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.violet}
        barStyle="dark-content"
      />
      <Animatable.View style={styles.imageview} animation="zoomInDown">
        <Image source={Imagepath.Consulting} style={styles.imagestyle} />
      </Animatable.View>

      <Animatable.View style={styles.Buttonview} animation="lightSpeedIn">
        <LinearGradient
          colors={['#7426f2', '#3d0891']}
          style={styles.touchabltext}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            activeOpacity={0.9}>
            <Text style={styles.textstyle}>Employee</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={{marginTop: 45}}>
          <LinearGradient
            colors={['#7426f2', '#3d0891']}
            style={styles.touchabltext}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.textstyle}>Organization</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Animatable.View>
      <View>
        <Animatable.View animation="zoomInDown">
          <Image
            source={Imagepath.wave}
            style={{tintColor: theme.colors.violet}}
          />
          <View style={styles.imagestylelogo}>
            <Image source={Imagepath.engagement} style={styles.imagesour} />
          </View>
        </Animatable.View>
      </View>
    </View>
  );
};
export default LandingScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageview: {
    backgroundColor: theme.colors.violet,
    width: '100%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  imagestyle: {
    height: 350,
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
    borderRadius: 7,
  },
});
