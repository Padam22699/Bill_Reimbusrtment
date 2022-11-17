import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {A, DARK, PRIMARY, B, C, WHITE, GREY} from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
const CompleteRequest = ({navigation}) => {
  const data = [
    {
      id: '1',
      iconName: 'gas-pump',
    },
    {
      id: '2',
      iconName: 'hamburger',
    },
    {
      id: '3',
      iconName: 'plane',
    },
    {
      id: '4',
      iconName: 'hamburger',
    },
    {
      id: '5',
      iconName: 'plane',
    },
    {
      id: '6',
      iconName: 'gas-pump',
    },
    {
      id: '7',
      iconName: 'gas-pump',
    },
    {
      id: '8',
      iconName: 'gas-pump',
    },
    {
      id: '9',
      iconName: 'gas-pump',
    },
  ];

  const RecentRequestList = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={0.9}
      onPress={()=>navigation.navigate('UserDetail' ,item)}
      >
        <View style={styles.recentList}>
          <View
            style={{alignItems: 'center', marginLeft: 10, paddingVertical: 15}}>
            <Icon name={item.iconName} size={24} color={PRIMARY} />
          </View>
          <View style={{marginRight: 70}}>
            <Text
              style={{
                fontSize: 16,
                color: DARK,
                fontWeight: 'bold',
                marginBottom: 8,
              }}>
              Name of Employee
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: DARK,
                fontWeight: 'bold',
                textAlignVertical: 'center',
              }}>
              Categry Name
            </Text>
          </View>
          <View style={{marginRight: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="rupee-sign"
                size={13}
                color={DARK}
                style={{marginRight: 2}}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: DARK,
                  fontWeight: 'bold',
                }}>
                200
              </Text>
            </View>

            <Text
              style={{
                fontSize: 8,
                color: GREY,
                fontWeight: 'bold',
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 12,
              }}>
              10\02\2022
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContianer}>
        <Text style={styles.heading}>Completed Request</Text>
      </View>
      <View style={{marginHorizontal: 10}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 80,
          }}
          data={data}
          renderItem={({item}) => <RecentRequestList item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default CompleteRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  recentList: {
    backgroundColor: WHITE,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 4,
    shadowRadius: 5,
    shadowOpacity: 0.75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  headingContianer: {
    justifyContent: 'center',
    elevation: 1,
  },
  heading: {
    marginTop: 15,
    marginLeft: 10,
    color: DARK,
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
});
