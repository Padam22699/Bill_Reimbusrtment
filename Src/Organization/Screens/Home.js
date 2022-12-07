import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { A, DARK, PRIMARY, B, C, WHITE } from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearGetAllBills, getAllBills } from '../../redux/actions/getAllBillsAction';
import Imagepath from '../../Assets/Images/Imagepath';
import LoaderOrg from '../Componets/LoaderOrg';
import { clearGetDashboardData, getDashboardData } from '../../redux/actions/getDashboardDataAction';

const Deshboard = ({ navigation }) => {

  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [data, setData] = useState([]);

  const dispatch = useDispatch()

  const getDashboardDataResponse = useSelector(state => state.getDashboardDataReducer.data);
  const loadingDashboard = useSelector(state => state.getDashboardDataReducer.loading);
  const getAllBillsResponse = useSelector(state => state.getAllBillsReducer.data);
  const loading = useSelector(state => state.getAllBillsReducer.loading);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_data');
      if (value !== null) {
        const data = JSON.parse(value);
        if (data != null) {
          setUserData(data);
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    } catch (e) {
      console.log('storage error', e);
    }
  };

  useEffect(() => {
    if (userData != null) {
      fetchDashboardData()
      fetchAllBills();
    }
  }, [userData]);

  const fetchDashboardData = () => {
    let request = {
      user_id: userData.user_id,
      type: 'organization',
    };

    dispatch(getDashboardData(request));
  };

  const fetchAllBills = () => {
    let request = {
      user_id: userData.user_id,
      type: 'organization',
      page: "1",
      reverse: 1,
      user_status: '',
      search: "",
      bill_type: "",
      from_date: '',
      to_date: '',
    };

    dispatch(getAllBills(request));
  };

  useEffect(() => {
    if (getAllBillsResponse != null) {
      console.log('getAllBillsResponse', getAllBillsResponse);
      if (
        Object.keys(getAllBillsResponse).length != 0 &&
        getAllBillsResponse.statusCode != 200
      ) {
        alert(getAllBillsResponse.message);
        dispatch(clearGetAllBills());
      }
      if (
        Object.keys(getAllBillsResponse).length != 0 &&
        getAllBillsResponse.statusCode == 200
      ) {
        let allRequest = getAllBillsResponse.data;
        setData(allRequest);
        dispatch(clearGetAllBills());
      }
    }
  }, [getAllBillsResponse]);

  useEffect(() => {
    if (getDashboardDataResponse != null) {
      console.log('getDashboardDataResponse', getDashboardDataResponse);
      if (
        Object.keys(getDashboardDataResponse).length != 0 &&
        getDashboardDataResponse.statusCode != 200
      ) {
        alert(getDashboardDataResponse.message);
        dispatch(clearGetDashboardData());
      }
      if (
        Object.keys(getDashboardDataResponse).length != 0 &&
        getDashboardDataResponse.statusCode == 200
      ) {
        let allData = getDashboardDataResponse.data;
        setDashboardData(allData);
        dispatch(clearGetDashboardData());
      }
    }
  }, [getDashboardDataResponse]);

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

  const icon = type => {
    switch (type) {
      case 'Medical': {
        return Imagepath.medicine;
      }
      case 'Fuel': {
        return Imagepath.Fuel;
      }
      case 'Food': {
        return Imagepath.foodfork;
      }
      case 'Others': {
        return Imagepath.Others;
      }
      default: {
        return Imagepath.Others;
      }
    }
  };

  const RecentRequestList = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (item.status == "Pending") {
            navigation.navigate('DetailScreen', {
              data: data,
              index: index,
            })
          } else {
            navigation.navigate('UserDetail', {
              item: item,
            });
          }
        }
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
            <Image source={icon(item.type)} style={{ height: 24, width: 24, tintColor: PRIMARY }} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#E14D2A",
                fontWeight: 'bold',
                marginBottom: 8,
              }}>
              {item.employee}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#E14D2A",
                fontWeight: 'bold',
                textAlignVertical: 'center',
              }}>
              {item.type}
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
                {item.amount}
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
              {item.status}
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
          <MiddleContent money={dashboardData != null && dashboardData.one_month_data} heading="This Month" backGround={A} />
          <MiddleContent
            money={dashboardData != null && dashboardData.six_month_data}
            heading="Last 6 Months"
            backGround={B}
          />
          <MiddleContent money={dashboardData != null && dashboardData.one_year_data} heading="This Year" backGround={C} />
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
      {
        (loading || loadingDashboard) && <LoaderOrg />
      }
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
