import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {DARK, WHITE, A, B, C} from '../Organization/Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {theme} from '../core/theme';
import Welogo from '../Organization/Componets/Welogo';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../Organization/Componets/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
} from 'victory-native';
import {
  clearGetDashboardData,
  getDashboardData,
} from '../redux/actions/getDashboardDataAction';

const Ehome = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const dispatch = useDispatch();

  const getDashboardDataResponse = useSelector(
    state => state.getDashboardDataReducer.data,
  );
  const loadingDashboard = useSelector(
    state => state.getDashboardDataReducer.loading,
  );

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
              padding: 4,
            }}>
            <Text
              adjustsFontSizeToFit={true}
              style={[
                {
                  fontSize: Platform.OS === 'ios' ? fontSize : 20,
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="default" />
      <View style={{margin: 12}}>
        <Welogo navigation={navigation} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MiddleContent
            money={dashboardData != null && dashboardData.one_month_data}
            heading="This Month"
            backGround={A}
            fontSize={16}
          />
          <MiddleContent
            money={dashboardData != null && dashboardData.six_month_data}
            heading="Last 6 Months"
            backGround={B}
            fontSize={14}
          />
          <MiddleContent
            money={dashboardData != null && dashboardData.one_year_data}
            heading="This Year"
            backGround={C}
            fontSize={16}
          />
        </View>

        {/* <View style={styles.pieDesboard}>
          <VictoryPie
            height={280}
            events={[
              {
                target: 'data',

                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: 'data',
                        mutation: ({style}) => {
                          return style.fill === '#c43a31'
                            ? null
                            : {style: {fill: '#c43a31'}};
                        },
                      },
                      {
                        target: 'labels',
                        mutation: ({text}) => {
                          return text === 'clicked' ? null : {text: 'clicked'};
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            data={[
              {x: 1, y: 2, label: 'this Month'},
              {x: 2, y: 3, label: 'Last 6 Month'},
              {x: 3, y: 5, label: 'This Year'},
            ]}
          />
        </View> */}
      </View>
      {loadingDashboard && <Loader />}
    </SafeAreaView>
  );
};

export default Ehome;
const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  pieDesboard: {
    marginTop: 40,
   
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
  Container: {
    marginTop: 20,
    backgroundColor: WHITE,
    height: 140,
    width: deviceWidth / 3 - 20,
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
