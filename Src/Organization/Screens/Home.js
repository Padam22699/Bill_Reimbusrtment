import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {A, DARK, PRIMARY, B, C, WHITE} from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Deshboard = ({navigation}) => {
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
  const MiddleContent = ({money, heading, backGround, onpress = () => {}}) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onpress}>
        <View style={styles.Container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: deviceWidth - 255,
              backgroundColor: backGround,
              height: 90,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              flex: 2.4,
            }}>
            <Icon name="rupee-sign" size={20} color={WHITE} />
            <Text
              style={{
                fontSize: 24,
                marginLeft: 5,
                color: WHITE,
                alignContent: 'center',
                fontWeight: 'bold',
              }}>
              {money}
            </Text>
          </View>

          <View
            style={{
              paddingBottom: 7,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              alignContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 17,
                alignSelf: 'center',
                color: DARK,
                fontWeight: 'bold',
                textAlignVertical: 'center',
                textAlign: 'center',
              }}>
              {heading}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const RecentRequestList = ({item, index}) => {
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
                fontSize: 12,
                color: DARK,
                fontWeight: 'bold',
                paddingVertical: 4,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 3,
              }}>
              Stutes
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: WHITE}}>
      <SafeAreaView style={{flex: 1, marginHorizontal: 12}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>WEDIGTECH</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="sign-out-alt"
              size={22}
              color={PRIMARY}
              style={{paddingRight: 30}}
              onPress={() => navigation.navigate('AuthStack')}
            />
            <Icon
              name="bell"
              size={22}
              color={PRIMARY}
              style={{paddingRight: 20}}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <MiddleContent money={60} heading="This Month" backGround={A} />
          <MiddleContent
            money={200}
            heading="  Last                6 Months"
            backGround={B}
          />
          <MiddleContent money={600} heading="This Year" backGround={C} />
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 20, color: DARK, fontWeight: 'bold'}}>
            Recent Request
          </Text>
        </View>
        <View
          style={{
            height: 400,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 80,
            }}
            data={data}
            renderItem={({item, index}) => (
              <RecentRequestList item={item} index={index} />
            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
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
    color: PRIMARY,
  },
  Container: {
    marginTop: 20,
    backgroundColor: WHITE,
    height: 140,
    width: deviceWidth - 255,
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
});
