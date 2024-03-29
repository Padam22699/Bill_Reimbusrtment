import React, {useEffect, useState} from 'react';
import {View, StatusBar, Text, StyleSheet} from 'react-native';
import {theme} from '../core/theme';
import * as Animatable from 'react-native-animatable';
import {PRIMARY} from '../../Src/Organization/Colors/Color'
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({navigation}) => {
  const [isSecondAnimation, setSecondAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSecondAnimation(true);
    }, 2000);
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'LandingScreen'}],
      });
    }, 5000);
  }, []);
  return (
    <LinearGradient
      colors={['#CF9FFF', '#E14D2A']}
      useAngle={true}
      angle={10}
      style={styles.container}>
      {!isSecondAnimation ? (
        <AnimationSplashScreen animationType="slideInDown" />
      ) : (
        <AnimationSplashScreen animationType="zoomIn" />
      )}
    </LinearGradient>
  );

  function AnimationSplashScreen({animationType}) {
    return (
      <Animatable.View animation={animationType}>
        <StatusBar
          animated={true}
          backgroundColor={PRIMARY}
          barStyle="default"
        />
        <View style={styles.textview}>
          <Text style={styles.text}>Wedigtech</Text>
        </View>
      </Animatable.View>
    );
  }
};
export default SplashScreen;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.PRIMARY,
  },
  textview: {
    elevation: 5,
  },
  text: {
    fontSize: 32,
    fontStyle: 'italic',
    fontWeight: '700',
    color: theme.colors.white,
    textShadowRadius: 7,
    textShadowOffset: {width: 2, height: 15},
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
  },
});
