import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { PRIMARY } from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
const CompleteRequest = ({ navigation }) => {
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

  const RecentRequestList = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('DetailScreen', {
            item: item,
            data: data,
            index: index,
          })
        }>
        <View style={styles.recentList}>
          <View
            style={{
              height: 48,
              width: 48,
              backgroundColor: '#fff',
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 2,
              marginLeft: -30,
              borderWidth: 1,
              borderColor: '#E14D2A'
            }}>
            <Icon name={item.iconName} size={24} color={PRIMARY} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#E14D2A",
                fontWeight: 'bold',
                marginBottom: 8,
              }}>
              Name of Employee
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#E14D2A",
                fontWeight: 'bold',
                textAlignVertical: 'center',
              }}>
              Category Name
            </Text>
          </View>
          <View style={{ marginRight: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="rupee-sign"
                size={13}
                color={"#E14D2A"}
                style={{ marginRight: 2 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#E14D2A",
                  fontWeight: 'bold',
                }}>
                200
              </Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                color: "#E14D2A",
                fontWeight: 'bold',
                paddingVertical: 4,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 3,
              }}>
              Status
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContianer}>
        <Text style={styles.heading}>Completed Requests</Text>
      </View>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 55 }}
        data={data}
        renderItem={({ item }) => <RecentRequestList item={item} />}
      />
    </SafeAreaView>
  );
};

export default CompleteRequest;

const styles = StyleSheet.create({
  headingContianer: {
    margin: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#E14D2A",
  },
  container: {
    flex: 1,
    margin: 12
  },
  recentList: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#FAC898",
    marginVertical: 10,
    elevation: 5,
    marginHorizontal: 22,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E14D2A'
  },
});
