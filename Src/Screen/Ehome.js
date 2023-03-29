import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';

import React, {useCallback, useEffect, useState} from 'react';
import {DARK, WHITE, A, B, C, GREY} from '../Organization/Colors/Color';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {theme} from '../core/theme';
import Welogo from '../Organization/Componets/Welogo';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../Organization/Componets/Loader';
import {pi1, pi2, pi3, pi4} from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {VictoryPie} from 'victory-native';
import {
  clearGetDashboardData,
  getDashboardData,
} from '../redux/actions/getDashboardDataAction';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNetInfo} from '@react-native-community/netinfo';
import NetWorkConnectionModel from '../NetWorkConnection/NetWorkConnectionModel';
import PieChart from '../Charts/PieChart';
import InputAmount from '../InputModel/InputAmount';

const Ehome = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const dispatch = useDispatch();
  const NetInfo = useNetInfo();
  const getDashboardDataResponse = useSelector(
    state => state.getDashboardDataReducer.data,
  );
  const loadingDashboard = useSelector(
    state => state.getDashboardDataReducer.loading,
  );

  function convertNumber(num) {
    if (num > 999999999) {
      return (num / 1000000000).toFixed(2) + 'B';
    } else if (num > 999999) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num > 999) {
      return (num / 1000).toFixed(2) + 'k';
      // return Math.trunc(num / 1000) + 'k';
      //
    } else {
      return num.toString();
    }
  }

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
    }
  }, [userData]);

  const fetchDashboardData = () => {
    let request = {
      // user_id: userData.user_id,
      type: 'employee',
    };

    dispatch(getDashboardData(request));
  };

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
    fontSize,
    onpress = () => {},
  }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onpress}>
        <View
          style={{
            marginTop: 0,
            backgroundColor: WHITE,
            height: deviceWidth / 2.5,
            width: deviceWidth / 3,
            borderRadius: 20,
            shadowColor: DARK,
            shadowOffset: {
              width: 3,
              height: 3,
            },
            elevation: 2,
            shadowRadius: 5,
            shadowOpacity: 0.25,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              width: deviceWidth / 3,
              backgroundColor: backGround,
              height: 90,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Icon
              name="rupee-sign"
              size={14}
              color={WHITE}
              style={{alignSelf: 'center'}}
            />
            <Text
              numberOfLines={1}
              style={{
                maxWidth: 80,
                fontSize: 16,
                marginLeft: 3,
                textAlign: 'center',
                color: WHITE,
                alignContent: 'center',
                alignSelf: 'center',
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
              adjustsFontSizeToFit={true}
              style={[
                {
                  fontSize: Platform.OS === 'ios' ? fontSize : 13,
                  alignSelf: 'center',
                  color: '#5D3FD3',
                  fontWeight: 'bold',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                  margin: 5,
                },
              ]}>
              {heading}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const Expence1 = [
    {
      id: 1,
      name: 'Medical',
      color: pi1,
    },
    {
      id: 2,
      name: 'Fuel',
      color: pi2,
    },
  ];
  const Expence2 = [
    {
      id: 3,
      name: 'Food',
      color: pi3,
    },
    {
      id: 4,
      name: 'Other',
      color: pi4,
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
      <View>
        {!NetInfo.isConnected && NetInfo.isConnected != null ? (
          <NetWorkConnectionModel color={theme.colors.primary} />
        ) : null}
      </View>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <View style={{margin: 12}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Welogo navigation={navigation} />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              flex: 1,

              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity>
              <Icon
                name="bell"
                size={24}
                color={theme.colors.primary}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Icons
                name="dots-three-vertical"
                size={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 10}}>
          <View
            style={{
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 20,
              }}>
              <MiddleContent
                money={dashboardData != null && dashboardData.one_month_data}
                heading="This Month"
                backGround={A}
                fontSize={16}
              />
              <MiddleContent
                money={dashboardData != null && dashboardData.six_month_data}
                heading="Last 3 Months"
                backGround={B}
                fontSize={16}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <MiddleContent
                money={dashboardData != null && dashboardData.six_month_data}
                heading="Last 6 Months"
                backGround={B}
                fontSize={16}
              />
              <MiddleContent
                money={dashboardData != null && dashboardData.one_year_data}
                heading="This Year"
                backGround={C}
                fontSize={16}
              />
            </View>
          </View>

          <View style={styles.pieDesboard}>
            {/* <VictoryPie
              height={responsiveScreenHeight(46)}
              width={400}
              radius={100}
              animate={{easing: 'circle'}}
              innerRadius={50}
              padAngle={0}
              cornerRadius={0}
              colorScale={[pi1, pi2, pi3, pi4]}
              style={{marginTop: 20}}
              data={[
                {x: 1, y: 2, label: '10%'},
                {x: 2, y: 3, label: '20%'},
                {x: 3, y: 6, label: '30%'},
                {x: 4, y: 5, label: '60%'},
              ]}
            /> */}
            <PieChart />
          </View>
          <View
            style={{
              width: '100%',
            marginBottom: responsiveScreenHeight(10)

            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 50,
                marginTop: responsiveScreenHeight(6),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 30,
                    height: 17,
                    borderRadius: 10,
                    marginRight: 7,
                    backgroundColor: pi1,
                  }}></View>
                <Text style={{color: GREY}}>Medical</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 30,
                    height: 17,
                    borderRadius: 10,
                    marginRight: 7,

                    backgroundColor: pi2,
                  }}></View>
                <Text style={{color: GREY, paddingRight: 16}}>Fuel</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 50,
                marginTop: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 30,
                    height: 17,
                    borderRadius: 10,
                    marginRight: 7,
                    backgroundColor: pi3,
                  }}></View>
                <Text style={{color: GREY}}>Food</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 30,
                    height: 17,
                    borderRadius: 10,
                    marginRight: Platform.OS === 'ios' ? 3 : 7,
                    marginLeft: 1,
                    backgroundColor: pi4,
                  }}></View>
                <Text style={{color: GREY, paddingRight: 10}}>Other</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {loadingDashboard && <Loader />}
    </SafeAreaView>
  );
};

export default Ehome;
const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  pieDesboard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: responsiveScreenHeight(36),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  Container: {},
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
