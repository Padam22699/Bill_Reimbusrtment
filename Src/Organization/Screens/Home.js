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
  Platform,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {A, DARK, PRIMARY, B, C, WHITE} from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearGetAllBills,
  getAllBills,
} from '../../redux/actions/getAllBillsAction';
import Imagepath from '../../Assets/Images/Imagepath';
import LoaderOrg from '../Componets/LoaderOrg';
import {
  clearGetDashboardData,
  getDashboardData,
} from '../../redux/actions/getDashboardDataAction';
import BufferLoader from '../../Loader/BufferLoader';
import {useNetInfo} from '@react-native-community/netinfo';
import NetWorkConnectionModel from '../../NetWorkConnection/NetWorkConnectionModel';
import NodataScreen from '../Componets/NodataScreen';
import Welogo from '../Componets/Welogo';
const Deshboard = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [data, setData] = useState([]);
  const NetInfo = useNetInfo();
  console.log('RRR NetInfo', NetInfo.isConnected);

  function convertNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'k';
      //
    } else {
      return num.toString();
    }
  }

  // const [superAdmin,setSuperAdmin]=useState(false)

  // console.log('Super' , userData.role_type)
  const dispatch = useDispatch();

  // useEffect(()=>{
  //    if(userData.role_type === 'super_admin' )
  //    {setSuperAdmin(true)}
  // },[superAdmin])

  const getDashboardDataResponse = useSelector(
    state => state.getDashboardDataReducer.data,
  );
  const loadingDashboard = useSelector(
    state => state.getDashboardDataReducer.loading,
  );
  const getAllBillsResponse = useSelector(
    state => state.getAllBillsReducer.data,
  );
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
      fetchDashboardData();
      fetchAllBills();
    }
  }, [userData]);

  const fetchDashboardData = () => {
    let request = {
      // user_id: userData.user_id,
      type: 'organization',
    };

    dispatch(getDashboardData(request));
  };

  const fetchAllBills = () => {
    let request = {
      // user_id: userData.user_id,
      type: 'organization',
      page: '1',
      reverse: -1,
      user_status: 'Pending',
      search: '',
      bill_type: '',
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
        console.log('GGGGG', getAllBillsResponse.data.length);
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

  const MiddleContent = ({money, heading, backGround, onpress = () => {}}) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onpress}>
        <View style={styles.Container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              width: deviceWidth / 3 - 20,
              backgroundColor: backGround,
              height: 90,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Icon name="rupee-sign" size={16} color={WHITE} />

            <Text
              numberOfLines={1}
              style={{
                maxWidth: 70,
                fontSize: 16,
                marginLeft: 2,
                color: WHITE,
                alignContent: 'center',
                alignSelf: 'center',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {convertNumber(money)}
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              alignContent: 'center',
              padding: 4,
            }}>
            <Text
              // adjustsFontSizeToFit={true}
              style={{
                fontSize: 12,
                alignSelf: 'center',
                color: '#E14D2A',
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

  const RequiestList = ({
    heading,
    backGround,
    imagepath,
    onpress = () => {},
  }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onpress}>
        <View
          style={{
            marginTop: 20,
            backgroundColor: WHITE,
            width: deviceWidth / 2.5 - 10,
            height: 180,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            shadowColor: DARK,
            shadowOffset: {
              width: 5,
              height: 5,
            },
            elevation: Platform.OS === 'ios' ? 0 : 4,
            shadowRadius: 5,
            shadowOpacity: Platform.OS === 'ios' ? 0.25 : 0.75,
            marginBottom: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              width: deviceWidth / 2.5 - 10,
              height: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
            <Image
              source={imagepath}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <Text
              style={{
                marginTop: 25,
                fontSize: 20,
                color: DARK,
                fontWeight: '800',
                textShadowColor: 'rgba(0, 0, 0, 0.2)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 2,
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

  const RecentRequestList = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (item.status == 'Pending') {
            navigation.navigate('DetailScreen', {
              data: data,
              index: index,
            });
          } else {
            navigation.navigate('UserDetail', {
              item: item,
            });
          }
        }}>
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
              borderColor: '#E14D2A',
            }}>
            <Image
              source={icon(item.type)}
              style={{height: 24, width: 24, tintColor: PRIMARY}}
            />
          </View>
          <View style={{flex: 1, marginLeft: 12}}>
            <Text
              style={{
                fontSize: 16,
                color: '#E14D2A',
                fontWeight: 'bold',
                marginBottom: 8,
              }}>
              {item.employee}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#E14D2A',
                fontWeight: 'bold',
                textAlignVertical: 'center',
              }}>
              {item.type}
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
                color={'#E14D2A'}
                style={{marginRight: 2}}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#E14D2A',
                  fontWeight: 'bold',
                }}>
                {item.amount}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                color: '#E14D2A',
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
    <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
      <StatusBar backgroundColor={'#E14D2A'} barStyle="default" />
      <View>
        {!NetInfo.isConnected && NetInfo.isConnected != null ? (
          <NetWorkConnectionModel />
        ) : null}
      </View>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View>
            <Welogo navigation={navigation} COLOR={PRIMARY} />
          </View>
          <Icon
            name="bell"
            size={24}
            color={PRIMARY}
            onPress={() => {
              navigation.navigate('OrgNotification');
            }}
            style={{marginRight: 10}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{}}>
            <MiddleContent
              money={dashboardData != null && dashboardData.one_month_data}
              heading="This Month"
              backGround={A}
            />
            <MiddleContent
              money={dashboardData != null && dashboardData.one_year_data}
              heading="january"
              backGround={B}
            />
            <MiddleContent
              money={dashboardData != null && dashboardData.one_year_data}
              heading="Feb"
              backGround={C}
            />
            <MiddleContent
              money={dashboardData != null && dashboardData.one_year_data}
              heading="March"
              backGround={A}
            />
            <MiddleContent
              money={dashboardData != null && dashboardData.one_year_data}
              heading="Last 6 Months"
              backGround={B}
            />
            <MiddleContent
              money={dashboardData != null && dashboardData.one_year_data}
              heading="This Year"
              backGround={C}
            />
          </ScrollView>
        </View>

        {/* <View>
          <View>
            <Text style={{fontSize: 20, color: DARK, fontWeight: 'bold'}}>
              Request
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <RequiestList
              heading="Pending"
              imagepath={require('../../Assets/Images/pending.png')}
            />
            <RequiestList
              heading="Completed"
              imagepath={require('../../Assets/Images/checked.png')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <RequiestList
              heading="Forworded"
              imagepath={require('../../Assets/Images/forward.png')}
            />
            <RequiestList
              heading="Rejected"
              imagepath={require('../../Assets/Images/close.png')}
            />
          </View>
        </View> */}

        <View style={{marginBottom: 10, marginHorizontal: 12}}>
          <Text style={{fontSize: 20, color: DARK, fontWeight: 'bold'}}>
            Recent Request
          </Text>
        </View>
        <View>
          <FlatList
            contentContainerStyle={{flexGrow: 1, marginHorizontal: 12}}
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 50}}
            data={data}
            renderItem={({item, index}) => (
              <RecentRequestList item={item} index={index} />
            )}
            ListEmptyComponent={() => {
              return (
                <View>
                  <NodataScreen />
                </View>
              );
            }}
          />
        </View>
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
    color: '#E14D2A',
  },
  Container: {
    backgroundColor: 'red',
    marginTop: 20,
    backgroundColor: WHITE,
    height: 140,
    marginHorizontal: 6,
    width: deviceWidth / 3 - 20,
    borderRadius: 20,
    shadowColor: DARK,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: Platform.OS === 'ios' ? 0 : 4,
    shadowRadius: 5,
    shadowOpacity: Platform.OS === 'ios' ? 0.25 : 0.75,
    marginBottom: 20,
  },
  RecordContainer: {},
  recentList: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAC898',
    marginVertical: 10,
    elevation: 5,
    marginHorizontal: 22,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E14D2A',
  },
});
