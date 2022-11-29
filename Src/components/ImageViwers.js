import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY} from '../Organization/Colors/Color';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useFocusEffect} from '@react-navigation/native';
const ImageViwers = ({navigation, route}) => {
  const images = route.params.imageurl;

  console.log('Images  == ' + images);
  useFocusEffect(
    useCallback(() => {
      console.log(images);
    }, []),
  );
  const image = [{url: images}];
  return (
    <SafeAreaView style={styles.container}>
      <ImageViewer
        imageUrls={image}
        index={0}
        renderIndicator={() => null}
        style={[styles.Imagecontainer, {}]}>
      </ImageViewer>
      <View style={styles.iconContainer}>
        <Icon
          name="times"
          color={PRIMARY}
          size={20}
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default ImageViwers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Imagecontainer: {
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    width: 30,
    height: 30,
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
