import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const BufferLoader = () => {
  const renderLoder = () => {
    return (
      <View
        style={{
          width: '85%',
          height: 85,
          alignSelf: 'center',
          marginTop: 10,
          alignItems: 'center',
          borderRadius: 20,
          flexDirection: 'row',
          borderWidth: 1,

          borderColor: '#D3D3D3',
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            alignSelf: 'center',
            borderRadius: 25,
            position: 'absolute',
            left: -25,
            flexDirection: 'row',
          }}>
          <ShimmerPlaceholder
            style={{width: 50, height: 50, borderRadius: 25}}
            //   shimmerColors={['#E14D2A', '#E14D2A', 'red']}
          />
        </View>
        <View>
          <View>
            <View
              style={{
                width: 150,
                height: 30,

                alignSelf: 'center',
                flexDirection: 'row',
                marginLeft: 40,
                marginBottom: 10,
              }}>
              <ShimmerPlaceholder
                style={{width: 150, height: 30, borderRadius: 10}}
                //   shimmerColors={['#E14D2A', '#E14D2A', 'red']}
              />
            </View>
            <View
              style={{
                width: 150,
                height: 30,
                alignSelf: 'center',
                flexDirection: 'row',
                marginLeft: 40,
              }}>
              <ShimmerPlaceholder
                style={{width: 100, height: 20, borderRadius: 10}}
              />
            </View>
          </View>
        </View>
        <View>
          <View>
            <View
              style={{
                width: 80,
                height: 30,

                alignSelf: 'center',
                flexDirection: 'row',
                marginLeft: 40,
                marginBottom: 10,
              }}>
              <ShimmerPlaceholder
                style={{width: 80, height: 30, borderRadius: 10}}
                //   shimmerColors={['#E14D2A', '#E14D2A', 'red']}
              />
            </View>
            <View
              style={{
                width: 80,
                height: 30,

                alignSelf: 'center',
                flexDirection: 'row',
                marginLeft: 40,
              }}>
              <ShimmerPlaceholder
                style={{width: 70, height: 20, borderRadius: 10}}
                //   shimmerColors={['#E14D2A', '#E14D2A', 'red']}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    /* <ShimmerPlaceholder
        style={{width: 50, height: 50, borderRadius: 25}}
        shimmerColors={['#E14D2A', '#E14D2A', 'red']}
      /> */
    <View>
      <FlatList
         contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20,
              }}
        showsVerticalScrollIndicator={false}
        data={[1, 1, 1, 1, , 111, 1, , 1,1,1]}
        renderItem={() => renderLoder()}
      />
    </View>
  );
};

export default BufferLoader;

const styles = StyleSheet.create({
  circil: {
    borderRadius: 50,
  },
});
