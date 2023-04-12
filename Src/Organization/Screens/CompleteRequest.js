import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {DARK, GREY, PRIMARY} from '../Colors/Color';
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
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import BufferLoader from '../../Loader/BufferLoader';
import {useNetInfo} from '@react-native-community/netinfo';
import NetWorkConnectionModel from '../../NetWorkConnection/NetWorkConnectionModel';
import NodataScreen from '../Componets/NodataScreen';
import DateFilter from '../Componets/DateFilter';
import SearchName from '../../components/SearchName';
import ShowDate from '../../components/ShowDate';
import moment from 'moment';
const CompleteRequest = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);
  const [page, setPage] = useState('1');
  const [searchText, setSearchText] = useState('');
  const [isListEmpty, setIsListEmpty] = useState(true);
  const dispatch = useDispatch();
  const NetInfo = useNetInfo();

  const getAllBillsResponse = useSelector(
    state => state.getAllBillsReducer.data,
  );
  const loading = useSelector(state => state.getAllBillsReducer.loading);

  useFocusEffect(
    useCallback(() => {
      getData();
      setPage('1');
      setData([]);
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
      fetchAllBills('1', searchText, date);
    }
  }, [userData]);

  const fetchAllBills = (page, searchText, date) => {
    let request = {
      // user_id: userData.user_id,
      type: 'organization',
      page: page,
      reverse: -1,
      user_status: '',
      search: searchText,
      bill_type: '',
      from_date: date,
      to_date: date,
    };
    console.log('request', request);
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

        let formatedRequest = allRequest.filter(item => {
          return item.status == 'Approved' || item.status == 'Rejected';
        });

        setData([...data, ...formatedRequest]);

        let formateDate = data.filter(item => {
          return item.amount.amount;
        });
        console.log('formateDate', formateDate);
        // let formateDate = formatedRequest.filter(item => {
        //   let convertDate = moment(item.date).format('DD MMM yyyy');
        //   console.log('convertDate', convertDate);
        //   return convertDate == date;
        // });
        // console.log("formateDate" ,formateDate)

        // if (date == null) {
        //   setData([]);

        // } else {
        //   setData([]);
        //   setData(formateDate);
        // }
        // setData([...data, ...formateDate]);
        // console.log('ss', formateDate);

        // setData([...data, ...formatedRequest]);
        let pageNum = parseInt(page);
        let incPage = pageNum + 1;
        console.log('pageNum', pageNum, 'incPage', incPage);
        setPage(incPage.toString());
        dispatch(clearGetAllBills());
      }
    }
  }, [getAllBillsResponse, date]);

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
        onPress={() =>
          navigation.navigate('UserDetail', {
            item: item,
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

  useEffect(() => {
    if (userData != null) {
      setData([]);
      setPage('1');
      fetchAllBills('1', searchText);
    }
  }, [searchText]);

  return (
    <>
      <View>
        {!NetInfo.isConnected && NetInfo.isConnected != null ? (
          <NetWorkConnectionModel />
        ) : null}
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContianer}>
          <Text style={styles.heading}>Completed Requests</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <View
            //sss
            style={{
              marginHorizontal: 10,
              elevation: 5,
              backgroundColor: '#fff',
              paddingHorizontal: 10,
              marginVertical: 7,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 15,
            }}>
            <TextInput
              placeholder="Search"
              onChangeText={text => {
                console.log(text);
                setSearchText(text);
              }}
              placeholderTextColor={GREY}
              style={{
                height: Platform.OS === 'ios' ? 50 : 50,
                width: '90%',
                color: DARK,
              }}
            />
          </View> */}
          <SearchName upadteState={setSearchText} />
          <DateFilter updateDate={setDate} />
        </View>
        {date ? <ShowDate date={date} updateDate={setDate} /> : null}

        <View>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: responsiveScreenHeight(2),
            }}
            showsVerticalScrollIndicator={false}
            style={{marginBottom: Platform.OS === 'ios' ? 70 : '20%'}}
            data={data}
            renderItem={RecentRequestList}
            onEndReached={() => {
              fetchAllBills(page, searchText);
            }}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={() => {
              return (
                <View>
                  <NodataScreen />
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
      {loading && <LoaderOrg />}
    </>
  );
};

export default CompleteRequest;

const styles = StyleSheet.create({
  headingContianer: {
    marginHorizontal: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E14D2A',
  },
  container: {
    flex: 1,
    margin: 12,
  },
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
  searchBar: {
    height: Platform.OS === 'ios' ? 50 : 50,
    width: '100%',
  },
});
