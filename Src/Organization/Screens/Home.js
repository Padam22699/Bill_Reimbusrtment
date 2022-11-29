import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import { A, DARK, PRIMARY, B, C, WHITE } from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Deshboard = ({ navigation }) => {
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

  const MiddleContent = ({
    money,
    heading,
    backGround,
    onpress = () => { },
  }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onpress}>
        <View style={styles.Container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: deviceWidth / 3 - 20,
              backgroundColor: backGround,
              height: 90,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Icon name="rupee-sign" size={20} color={WHITE} />
            <Text
              style={{
                fontSize: 24,
                marginLeft: 5,
                color: WHITE,
                alignContent: 'center',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              {money}
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              alignContent: 'center',
              padding: 4
            }}>
            <Text
              adjustsFontSizeToFit={true}
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: "#E14D2A",
                fontWeight: 'bold',
                textAlignVertical: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                margin: 5,
              }}>
              {heading}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <StatusBar backgroundColor={"#E14D2A"} barStyle="default" />
      <View style={{ margin: 12, flex: 1 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>WEDIGTECH</Text>
          </View>
          <Icon
            name="bell"
            size={24}
            color={PRIMARY}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MiddleContent money={60} heading="This Month" backGround={A} />
          <MiddleContent
            money={200}
            heading="Last 6 Months"
            backGround={B}
          />
          <MiddleContent money={600} heading="This Year" backGround={C} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 20, color: DARK, fontWeight: 'bold' }}>
            Recent Request
          </Text>
        </View>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 55 }}
          data={data}
          renderItem={({ item, index }) => (
            <RecentRequestList item={item} index={index} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Deshboard;
const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#E14D2A",
  },
  Container: {
    marginTop: 20,
    backgroundColor: WHITE,
    height: 140,
    width: deviceWidth / 3 - 20,
    borderRadius: 20,
    shadowColor: DARK,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 4,
    shadowRadius: 5,
    shadowOpacity: 0.75,
    marginBottom: 20,
  },
  RecordContainer: {},
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
