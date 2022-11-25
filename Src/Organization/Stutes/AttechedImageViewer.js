import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY} from '../Colors/Color';
import {useFocusEffect} from '@react-navigation/native';
const AttechedImageViewer = ({navigation}) => {

  useFocusEffect(
    useCallback(() => {
      console.log('image');

      return () => {
        console.log('imageblur');
      };
    }, []),
  );

  return (
    //   <View style={{flex: 1}}>
    //     <ReactNativeZoomableView
    //       maxZoom={1.5}
    //       minZoom={0.5}
    //       zoomStep={0.5}
    //       initialZoom={1}
    //       bindToBorders={true}
    //       onZoomAfter={this.logOutZoomState}
    //       style={{
    //         padding: 10,
    //       }}>
    //       <Image
    //         style={{flex: 1, width: '100%', height: '100%',resizeMode:'cover'}}
    //         source={require('../../Assets/pic3.jpg')}
    //         resizeMode="contain"
    //       />
    //     </ReactNativeZoomableView>
    //   </View>
    // );
    <SafeAreaView style={styles.container}>
      <View
        maxZoom={2}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        // onZoomAfter={this.logOutZoomState}
        style={[
          styles.Imagecontainer,
          {
            padding: 10,
          },
        ]}>
        <Image
          source={require('../../Assets/bills.png')}
          style={{width: '100%', height: '100%', resizeMode: 'cover'}}
        />
      </View>
      <View style={styles.iconContainer}>
        <Icon
          name="times"
          color={PRIMARY}
          size={24}
          onPress={() =>
            {console.log('imageback')
            navigation.goBack()}
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default AttechedImageViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Imagecontainer: {
    marginHorizontal: 10,
    marginVertical: 30,
    borderRadius: 20,
  },
  iconContainer: {
    position: 'absolute',
    width: 35,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.46,
    elevation: 9,

    top: 15,
    right: 5,
  },
});
