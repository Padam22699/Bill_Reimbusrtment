import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import {theme} from '../core/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Imagepath from '../Assets/Images/Imagepath';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearGetAllBills,
  getAllBills,
} from '../redux/actions/getAllBillsAction';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loader from '../Organization/Componets/Loader';
import {DARK, GREY} from '../Organization/Colors/Color';

export default function Current({navigation}) {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const [current, setCurrent] = useState([]);

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
      console.log('value', value);
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
      fetchAllBills(searchText, selectedType);
    }
  }, [userData]);

  const fetchAllBills = (search, type) => {
    let request = {
      // user_id: userData.user_id,
      type: 'employee',
      page: '1',
      reverse: 1,
      user_status: '',
      search: search,
      bill_type: type,
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
        // console.log("response", getAllBillsResponse)
        let allRequest = getAllBillsResponse.data;
        let filteredRequest = allRequest.filter(item => {
          return new Date(item.date).getMonth() == new Date().getMonth();
        });
        console.log('filtered request', filteredRequest);
        setCurrent(filteredRequest);
        dispatch(clearGetAllBills());
        setModalOpen(false);
      }
    }
  }, [getAllBillsResponse]);

  const typeColor = type => {
    if (type == 'fuel') {
      return theme.colors.primary;
    } else if (type == 'medical') {
      return 'red';
    } else {
      return 'blue';
    }
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

  useEffect(() => {
    if (userData != null) {
      fetchAllBills(searchText, selectedType);
    }
  }, [searchText, selectedType]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.mainView}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          activeOpacity={0.9}
          onPress={() => {
            navigation.push('DetailScreen', {bill_id: item.bill_id});
          }}>
          <View style={styles.imageView}>
            <View
              style={{
                ...styles.imagetype,
                backgroundColor: typeColor(item.type),
              }}>
              <Image source={icon(item.type)} style={styles.imagestyle} />
            </View>
          </View>
          <View style={{flex: 1, marginLeft: -30}}>
            <View style={styles.textview}>
              <Text style={styles.textblood}>
                {moment(item.date).format('MMM DD, yyyy')}
              </Text>
              <Text
                style={{
                  ...styles.textapprove,
                  color:
                    item.status == 'Approved'
                      ? theme.colors.green
                      : item.status == 'Pending'
                      ? 'orange'
                      : 'red',
                }}>
                {item.status}
              </Text>
            </View>
            <View style={styles.texticon}>
              <Text numberOfLines={1} style={styles.textmar}>
                {item.description}
              </Text>
              <View style={styles.rupeestyle}>
                <FontAwesome
                  name="rupee"
                  size={15}
                  color={'#5D3FD3'}
                  style={styles.fontstyle}
                />
                <Text style={styles.textrupees}>{item.amount}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Modal animationType="slide" transparent={true} visible={modalOpen}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedType('');
                  setModalOpen(false);
                }}>
                <Text style={styles.textstyle}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalOpen(false);
                }}>
                <Icon name="times" size={20} color={DARK} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                setSelectedType('Medical');
                setModalOpen(false);
              }}>
              <Text style={styles.textstyle}>Medical</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedType('Food');
                setModalOpen(false);
              }}>
              <Text style={styles.textstyle}>Food</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedType('Fuel');
                setModalOpen(false);
              }}>
              <Text style={styles.textstyle}>Fuel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedType('Others');
                setModalOpen(false);
              }}>
              <Text style={styles.textstyle}>Others</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.searchinput}>
          <TouchableOpacity style={styles.iconstyle}>
            <AntDesign
              name="filter"
              size={25}
              color={theme.colors.text}
              onPress={() => {
                setModalOpen(true);
              }}
            />
          </TouchableOpacity>
          <View style={{flex: 0.8}}>
            <TextInput
              placeholder="Search"
              onChangeText={text => {
                console.log(text);
                setSearchText(text);
              }}
            />
          </View>
        </View>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    marginBottom: 120,
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    fontSize: 24,
                    color: GREY,
                  }}>
                  Result not found
                </Text>
              </View>
            );
          }}
          style={{marginBottom: 55}}
          data={current}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
      {loading && <Loader />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 14,
  },
  mainView: {
    backgroundColor: '#E6E6FA',
    marginVertical: 10,
    elevation: 5,
    marginHorizontal: 22,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#5D3FD3',
  },
  imagetype: {
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    height: 48,
    width: 48,
    backgroundColor: '#fff',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginLeft: -30,
    borderWidth: 1,
    borderColor: '#5D3FD3',
  },
  imagestyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: theme.colors.white,
  },
  textview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textblood: {
    left: 32,
    fontSize: 16,
    color: '#5D3FD3',
    fontWeight: 'bold',
  },
  textapprove: {
    marginVertical: 4,
    fontSize: 16,
    color: theme.colors.green,
    fontWeight: 'bold',
  },
  textblue: {
    left: 32,
    fontSize: 14,
    color: theme.colors.text,
    paddingRight: 30,
  },
  textmar: {
    left: 32,
    marginTop: 12,
    fontSize: 14,
    color: '#5D3FD3',
    width: '50%',
  },
  textrupees: {
    marginTop: 12,
    fontSize: 18,
    color: '#5D3FD3',
    fontWeight: '700',
  },
  searchinput: {
    marginHorizontal: 22,

    backgroundColor: '#fff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.25,
    paddingHorizontal: 10,
    marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: Platform.OS === 'ios' ? -40 : 10,
    height: Platform.OS === 'ios' ? 43 : 43,
  },
  iconstyle: {
    right: 0,
    position: 'absolute',
    paddingHorizontal: 10,
  },
  texticon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rupeestyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontstyle: {
    marginTop: 14,
    right: 4,
    fontWeight: '700',
  },
  modalView: {
    backgroundColor: theme.colors.white,
    marginTop: 125,
    marginHorizontal: 35,
    padding: 10,
    borderColor: '#454545',
    borderWidth: 1,
  },
  okstyle: {
    width: 60,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  oktext: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  textstyle: {
    color: theme.colors.text,
    fontSize: 14,
    marginTop: 5,
  },
});
