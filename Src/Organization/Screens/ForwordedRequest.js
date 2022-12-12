import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { GREY, PRIMARY } from '../Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearGetAllBills, getAllBills } from '../../redux/actions/getAllBillsAction';
import Imagepath from '../../Assets/Images/Imagepath';
import LoaderOrg from '../Componets/LoaderOrg';
const ForwordedRequest = ({ navigation }) => {

  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState("1");
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch()

  const getAllBillsResponse = useSelector(
    state => state.getAllBillsReducer.data,
  );
  const loading = useSelector(state => state.getAllBillsReducer.loading);

  useFocusEffect(
    useCallback(() => {
      getData();
      setPage("1")
      setData([])
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
      fetchAllBills("1", searchText);
    }
  }, [userData]);

  const fetchAllBills = (page, searchText) => {
    let request = {
      user_id: userData.user_id,
      type: 'organization',
      page: page,
      reverse: 1,
      user_status: 'Forward',
      search: searchText,
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
        setData([...data, ...allRequest]);
        let pageNum = parseInt(page);
        let incPage = pageNum + 1;
        setPage(incPage.toString())
        dispatch(clearGetAllBills());
      }
    }
  }, [getAllBillsResponse]);

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

  useEffect(() => {
    if (userData != null) {
      setData([])
      setPage("1")
      fetchAllBills("1", searchText)
    }
  }, [searchText])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContianer}>
          <Text style={styles.heading}>Forwarded Requests </Text>
        </View>
        <View style={{
          marginHorizontal: 10,
          elevation: 5,
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          marginVertical: 7,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 15
        }}>
          <TextInput
            placeholder="Search"
            onChangeText={text => {
              setSearchText(text);
            }}
            style={{ height:Platform.OS ==='ios' ?50: 0}}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={RecentRequestList}
          onEndReached={() => { fetchAllBills(page, searchText) }}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
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
        />
      </SafeAreaView>
      {loading && <LoaderOrg />}
    </>
  );
};

export default ForwordedRequest;

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
