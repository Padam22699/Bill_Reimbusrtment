import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../Assets/Images/Imagepath';
import {theme} from '../core/theme';
import {
  clearGetBillDetail,
  getBillDetail,
} from '../redux/actions/getBillDetailAction';
import {clearReminder, reminder} from '../redux/actions/reminderAction';
import {
  clearIsPhysicallySubmitted,
  isPhysicallySubmitted,
} from '../redux/actions/isPhysicallySubmittedAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loader from '../Organization/Componets/Loader';
import {DARK} from '../Organization/Colors/Color';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

export default function DetailScreen({navigation}) {
  const dispatch = useDispatch();
  const routes = useRoute();

  const [userData, setUserData] = useState(null);
  const [billDetail, setBillDetail] = useState('');
  const [checkbook, setcheckbook] = useState(false);
  const [Clicked, setClicked] = useState(false);

  const statuscolor = () => {
    if (billDetail.status == 'Pending') return '#FFA500';
    if (billDetail.status == 'Rejected') return 'red';
    if (billDetail.status == 'Approved') return 'green';
    if (billDetail.status == 'Forwarded') return '#282A3A';
  };

  const getBillDetailResponse = useSelector(
    state => state.getBillDetailReducer.data,
  );
  const physicalSubmitResponse = useSelector(
    state => state.isPhysicallySubmittedReducer.data,
  );
  const reminderResponse = useSelector(state => state.reminderReducer.data);
  const loading = useSelector(state => state.getBillDetailReducer.loading);

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
      fetchBillDetail();
    }
  }, [userData]);

  const fetchBillDetail = () => {
    let request = {
      // user_id: userData.user_id,
      bill_id: routes.params.bill_id,
      type: 'employee',
    };
    dispatch(getBillDetail(request));
  };

  useEffect(() => {
    if (getBillDetailResponse != null) {
      console.log('getBillDetailResponse', getBillDetailResponse);
      if (
        Object.keys(getBillDetailResponse).length != 0 &&
        getBillDetailResponse.statusCode != 200
      ) {
        alert(getBillDetailResponse.message);
        dispatch(clearGetBillDetail());
      }
      if (
        Object.keys(getBillDetailResponse).length != 0 &&
        getBillDetailResponse.statusCode == 200
      ) {
        console.log('response', getBillDetailResponse);
        setBillDetail(getBillDetailResponse.data[0]);
        setcheckbook(getBillDetailResponse.data[0].is_physically_submitted);
        dispatch(clearGetBillDetail());
      }
    }
  }, [getBillDetailResponse]);

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

  const handlePhysicallySubmit = submitted => {
    let request = {
      // user_id: userData.user_id,
      bill_id: routes.params.bill_id,
      is_phy_submitted: submitted,
    };
    dispatch(isPhysicallySubmitted(request));
  };

  useEffect(() => {
    if (physicalSubmitResponse != null) {
      console.log('physicalSubmitResponse', physicalSubmitResponse);
      if (
        Object.keys(physicalSubmitResponse).length != 0 &&
        physicalSubmitResponse.statusCode != 200
      ) {
        alert(physicalSubmitResponse.message);
        dispatch(clearIsPhysicallySubmitted());
      }
      if (
        Object.keys(physicalSubmitResponse).length != 0 &&
        physicalSubmitResponse.statusCode == 200
      ) {
        console.log('response', physicalSubmitResponse);
        alert(physicalSubmitResponse.message);
        dispatch(clearIsPhysicallySubmitted());
      }
    }
  }, [physicalSubmitResponse]);

  useEffect(() => {
    if (userData != null) {
      if (Clicked == true) {
        handlePhysicallySubmit(checkbook);
      }
    }
  }, [checkbook]);

  const sendReminder = () => {
    let request = {
      // user_id: userData.user_id,
      bill_id: routes.params.bill_id,
      message: 'Your bill still to be approve.',
    };
    dispatch(reminder(request));
  };

  useEffect(() => {
    if (reminderResponse != null) {
      console.log('reminderResponse', reminderResponse);
      if (
        Object.keys(reminderResponse).length != 0 &&
        reminderResponse.statusCode != 200
      ) {
        alert(reminderResponse.message);
        dispatch(clearReminder());
      }
      if (
        Object.keys(reminderResponse).length != 0 &&
        reminderResponse.statusCode == 200
      ) {
        console.log('response', reminderResponse);
        alert(reminderResponse.message);
        dispatch(clearReminder());
      }
    }
  }, [reminderResponse]);

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />

      <View
        style={{
          flex: 1,
          backgroundColor: '£fff',
          marginBottom: Platform.OS === 'ios' ? responsiveScreenHeight(2) : 0,
        }}>
        <ScrollView
          style={{flex: 1, backgroundColor: '#fff'}}
          showsVerticalScrollIndicator={false}>
          <Animatable.View animation="zoomInDown" style={{transform: 'scale'}}>
            <View style={styles.mainview}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                activeOpacity={0.9}>
                <AntDesign
                  name="close"
                  size={25}
                  color={'#fff'}
                  style={{alignSelf: 'flex-end'}}
                />
              </TouchableOpacity>
              <View style={styles.touchablview}>
                <TouchableOpacity
                  style={styles.imagetouchabl}
                  activeOpacity={0.9}>
                  <Image
                    source={icon(billDetail.type)}
                    style={styles.imagestyle}
                  />
                </TouchableOpacity>
                <View style={styles.fonticon}>
                  <FontAwesome
                    name="rupee"
                    size={18}
                    color={theme.colors.white}
                    style={{top: 5}}
                  />
                  <View>
                    <Text style={styles.textrupees}>
                      {billDetail != null ? billDetail.amount : null}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.container2}>
              <View style={styles.elevationstyle}>
                <Text
                  style={[
                    styles.textExpe,
                    {paddingTop: Platform.OS == 'ios' ? 10 : 0},
                  ]}>
                  Expense Details
                </Text>

                <View style={{marginTop: 20}}>
                  <View style={styles.flexview}>
                    <Text style={styles.textdate}>Date</Text>
                    <Text style={styles.textmar}>
                      {billDetail != null
                        ? moment(billDetail.date).format('MMM DD, yyyy')
                        : null}
                    </Text>
                  </View>
                  <View style={styles.flexview}>
                    <Text style={styles.textdate}>Description</Text>
                    <Text style={styles.textfuel}>
                      {billDetail != null ? billDetail.description : null}
                    </Text>
                  </View>
                  <View style={styles.flexview}>
                    <Text style={styles.textdate}>Attachment</Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ImageViwers', {
                          imageurl: billDetail.bill_attachment,
                          route: routes,
                        })
                      }>
                      <Image
                        source={
                          billDetail != null
                            ? {uri: billDetail.bill_attachment}
                            : Imagepath.Fuel
                        }
                        style={{height: 50, width: 50, resizeMode: 'contain'}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.flexview}>
                    <Text style={styles.textdate}>Status</Text>
                    <View style={styles.flexapproved}>
                      <Text style={[styles.Approved, {color: statuscolor()}]}>
                        {billDetail != null && billDetail.status}{' '}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.flexview}>
                    <Text style={styles.textdate}>Participants</Text>
                    <View style={{width: '50%', alignItems: 'flex-end'}}>
                      <Text style={[{color: DARK, fontSize: 14}]}>
                        {billDetail != null && billDetail.participants}{' '}
                      </Text>
                    </View>
                  </View>
                  {billDetail.status == 'Pending' && (
                    <View style={styles.flexview}>
                      <Text style={styles.textdate}>
                        Physically submitted the bill
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.imagetouchstyle,
                          {backgroundColor: checkbook ? '#5D3FD3' : '#fff'},
                        ]}
                        onPress={() => {
                          setcheckbook(!checkbook);
                          setClicked(true);
                        }}
                        activeOpacity={0.9}>
                        <Image
                          source={checkbook ? Imagepath.check : Imagepath}
                          style={[
                            styles.imageCheck,
                            {tintColor: checkbook ? 'white' : '#E6E6FA'},
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                {checkbook && billDetail.status == 'Pending' && (
                  <TouchableOpacity onPress={sendReminder} activeOpacity={0.9}>
                    <Text
                      style={[
                        styles.textstyle,
                        {paddingBottom: Platform.OS == 'ios' ? 10 : 0},
                      ]}>
                      Send Reminder
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animatable.View>
          {loading && <Loader />}
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //backgroundColor:'red'
  },
  mainview: {
    backgroundColor: theme.colors.primary,
    //height: 135,

    paddingHorizontal: 18,
    paddingVertical: 15,

    borderBottomLeftRadius: 30,
    // backgroundColor: 'red',
    borderBottomRightRadius: 30,
    //marginTop: Platform.OS == 'ios' ? 0 : 0,
  },
  touchablview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagetouchabl: {
    height: 80,
    width: 80,
    borderRadius: 60,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagestyle: {
    height: 50,
    width: 50,
    tintColor: theme.colors.primary,
    resizeMode: 'contain',
  },
  textrupees: {
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: 'bold',
    left: 2,
  },
  textfuelthe: {
    fontSize: 16,
    color: theme.colors.white,
  },
  textfuel: {
    fontSize: 16,
    color: theme.colors.text,
    flex: 0.9,
    textAlign: 'right',
  },
  container2: {
    marginHorizontal: 18,
    marginTop: 10,
    marginBottom: 50,
  },
  imagetouchstyle: {
    height: 20,
    width: 20,
    backgroundColor: '#E6E6FA',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#5D3FD3',
    padding: 2,
  },
  imageCheck: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    tintColor: theme.colors.text,
  },
  elevationstyle: {
    // height: 450,
    backgroundColor: '#fff',
    marginTop: 24,

    borderRadius: 15,
    padding: 20,
    marginBottom: '15%',
    borderRadius: 10,
    padding: 10,

    shadowColor: DARK,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  textExpe: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D3FD3',
    textAlign: 'center',
  },
  flexview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 2,
  },
  textdate: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  textmar: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'right',
  },
  flexapproved: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Approved: {
    fontSize: 16,
    fontWeight: '500',
  },
  Declined: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
  },
  fonticon: {
    flexDirection: 'row',
    left: 15,
  },
  button: {
    marginVertical: 25,
    marginHorizontal: 30,
  },
  touchabltext: {
    height: 45,
    justifyContent: 'center',
    borderRadius: 7,
    alignItems: 'center',
  },
  textstyle: {
    fontSize: 16,
    color: theme.colors.primary,
  },
});
