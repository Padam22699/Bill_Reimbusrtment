import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const NotificationLoader = () => {
  const renderItem = () => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <View style={{alignItems: 'center'}}>
          <ShimmerPlaceholder
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              marginTop: 20,
              marginLeft: 10,
            }}></ShimmerPlaceholder>
        </View>
        <View style={{justifyContent: 'center'}}>
          <ShimmerPlaceholder
            style={{
              width: 180,
              height: 25,
              marginTop: 30,
              marginLeft: 10,
              borderRadius: 20,
            }}></ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{
              width: 120,
              height: 20,
              borderRadius: 20,
              marginTop: 20,
              marginLeft: 10,
            }}></ShimmerPlaceholder>
        </View>
        <View style={{position: 'absolute', bottom: 0, right: 20}}>
          <ShimmerPlaceholder
            style={{
              width: 150,
              height: 15,
              borderRadius: 20,
              marginTop: 20,
              marginLeft: 10,
            }}></ShimmerPlaceholder>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        contentContainerStyle={{marginTop: 2}}
        renderItem={() => {
          return renderItem();
        }}
      />
    </View>
  );
};

export default NotificationLoader;

const styles = StyleSheet.create({
  rr: {
    marginTop: 20,
    marginLeft: 10,
  },
});
