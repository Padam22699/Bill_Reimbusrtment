import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import {DARK, GREY, PRIMARY, WHITE} from '../Colors/Color';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import Imagepath from '../../Assets/Images/Imagepath';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {theme} from '../../core/theme';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  changeStatus,
  clearChangeStatus,
} from '../../redux/actions/changeStatusAction';
import LoaderOrg from '../Componets/LoaderOrg';
import {
  clearGetBillDetail,
  getBillDetail,
} from '../../redux/actions/getBillDetailAction';

export default function FullDetailScreen({navigation, route}) {
  const [stutes, setstutes] = useState('');

  const [visible, setvisible] = useState(false);
  const [userData, setUserData] = useState('');
  const [openpicke, setopenpicker] = useState(false);
  const [userAdminLoggedIn, setuserAdminLoggedIn] = useState(false);
  const [billDetails, setbillDetails] = useState('');

  console.log('SuperAdmin1', userData.role_type);

  const dispatch = useDispatch();

  const getBillDetailResponse = useSelector(
    state => state.getBillDetailReducer.data,
  );

  const changeStatusResponse = useSelector(
    state => state.changeStatusReducer.data,
  );
  const loading = useSelector(state => state.changeStatusReducer.loading);

  useEffect(() => {
    if (userData.role_type === 'super_admin') {
      setuserAdminLoggedIn(true);
    }
  }, [userAdminLoggedIn]);

  useFocusEffect(
    useCallback(() => {
      console.log('fullDeatailsScreen', route.params);
      setstutes(route.params.item.status);

      getData();
    }, []),
  );

  useEffect(() => {
    if (userData != null) {
      fateBillDetails();
    }
  }, [userData]);

  const fateBillDetails = () => {
    let request = {
      bill_id: route.params.item.bill_id,
      type: 'organization',
    };
    dispatch(getBillDetail(request));
  };

  useEffect(() => {
    if (getBillDetailResponse != null) {
      console.log('getBillDeatailsResponse', getBillDetailResponse);
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
        setbillDetails(getBillDetailResponse.data[0]);
        dispatch(clearGetBillDetail());
      }
    }
  }, [getBillDetailResponse]);

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

  const submit = () => {
    console.log('status', stutes);
    let request = {
      // user_id: userData.user_id,
      bill_id: route.params.item.bill_id,
      user_status: stutes,
    };
    dispatch(changeStatus(request));
  };

  useEffect(() => {
    if (changeStatusResponse != null) {
      console.log('changeStatusResponse', changeStatusResponse);
      if (
        Object.keys(changeStatusResponse).length != 0 &&
        changeStatusResponse.statusCode != 200
      ) {
        alert(changeStatusResponse.message);
        dispatch(clearChangeStatus());
      }
      if (
        Object.keys(changeStatusResponse).length != 0 &&
        changeStatusResponse.statusCode == 200
      ) {
        dispatch(clearChangeStatus());
        navigation.navigate('Home');
      }
    }
  }, [changeStatusResponse]);

  const picker = () => {
    if (userData.role_type == 'super_admin') {
      if (
        route.params.item.status == 'Forward' ||
        route.params.item.status == 'Pending'
      ) {
        return (
          <DropDownPicker
            dropDownContainerStyle={{
              borderWidth: 0,
              zIndex: 100,
              backgroundColor: WHITE,
            }}
            style={{
              borderWidth: 0,
            }}
            value={stutes}
            setValue={item => {
              setstutes(item);
              // console.log('item', stutes);
            }}
            open={openpicke}
            // placeholder={route.params.item.status}
            setOpen={setopenpicker}
            listMode={'SCROLLVIEW'}
            autoScroll={true}
            items={[
              {label: 'Pending', value: 'Pending'},
              {label: 'Approved', value: 'Approved'},
              {label: 'Rejected', value: 'Rejected'},
            ]}
          />
        );
        //     return (
        //       <Picker
        //         enabled={route.params.item.status == 'Forward'}
        //         style={[styles.picker]}
        //         selectedValue={Sstutes}
        //         mode="dropdown"
        //         itemStyle={{backgroundColor: WHITE}}
        //         dropdownIconRippleColor={'black'}
        //         dropdownIconColor={'black'}
        //         onValueChange={itemvalue => setSstutes(itemvalue)}>
        //         <Picker.Item label="Pending" value="Pending" color={DARK} />
        //         <Picker.Item label="Approved" value="Approved" color={DARK} />
        //         <Picker.Item label="Rejected" value="Rejected" color={DARK} />
        //         <Picker.Item label="Forward" value="Forward" color={DARK} />
        //       </Picker>
        //     );
      }
    }

    if (route.params.item.status == 'Pending') {
      return (
        <DropDownPicker
          disabled={route.params.item.status !== 'Pending'}
          dropDownContainerStyle={{
            borderWidth: 0,
            zIndex: 100,
            backgroundColor: WHITE,
          }}
          style={{
            borderWidth: 0,
          }}
          defaultIndex={0}
          value={stutes}
          setValue={item => {
            setstutes(item);
            // console.log('item', stutes);
          }}
          open={openpicke}
          placeholder={route.params.item.status}
          setOpen={setopenpicker}
          listMode={'SCROLLVIEW'}
          autoScroll={true}
          items={[
            {label: 'Pending', value: 'Pending'},
            {label: 'Approved', value: 'Approved'},
            {label: 'Rejected', value: 'Rejected'},
            {label: 'Forward', value: 'Forward'},
          ]}
        />
      );
    }

    return <Text style={styles.textfuel}>{route.params.item.status}</Text>;
  };

  const submitbtnShow = () => {
    if (userData.role_type === 'super_admin') {
      if (route.params.item.status == 'Pending') {
        return (
          <TouchableOpacity
            mode="contained"
            onPress={submit}
            activeOpacity={0.9}>
            <LinearGradient
              colors={['#FAC898', '#E14D2A']}
              useAngle={true}
              angle={10}
              style={styles.touchabltext}>
              <Text style={styles.textstyle}>SUBMIT</Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      }
    }
    if (userData.role_type === 'super_admin') {
      if (route.params.item.status == 'Forward') {
        return (
          <TouchableOpacity
            mode="contained"
            onPress={submit}
            activeOpacity={0.9}>
            <LinearGradient
              colors={['#FAC898', '#E14D2A']}
              useAngle={true}
              angle={10}
              style={styles.touchabltext}>
              <Text style={styles.textstyle}>SUBMIT</Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      }
    }

    if (route.params.item.status == 'Pending') {
      return (
        <TouchableOpacity mode="contained" onPress={submit} activeOpacity={0.9}>
          <LinearGradient
            colors={['#FAC898', '#E14D2A']}
            useAngle={true}
            angle={10}
            style={styles.touchabltext}>
            <Text style={styles.textstyle}>SUBMIT</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Animatable.View animation="zoomInDown" style={{transform: 'scale'}}>
          <View style={styles.mainview}>
            <TouchableOpacity
              style={{marginTop: Platform.OS === 'ios' ? 50 : 0}}
              onPress={() => {
                navigation.goBack();
              }}
              activeOpacity={0.9}>
              <AntDesign
                name="close"
                size={25}
                color={'#fff'}
                style={{alignSelf: 'flex-end', marginTop: Platform.OS ? 10 : 0}}
              />
            </TouchableOpacity>
            <View style={styles.touchablview}>
              <TouchableOpacity
                style={styles.imagetouchabl}
                activeOpacity={0.9}>
                <Image source={Imagepath.Fuel} style={styles.imagestyle} />
              </TouchableOpacity>
              <View style={styles.fonticon}>
                <FontAwesome
                  name="rupee"
                  size={18}
                  color={WHITE}
                  style={{top: 5}}
                />
                <View>
                  <Text style={styles.textrupees}>
                    {route.params.item.amount}
                  </Text>
                  <>
                    <Text style={styles.textfuelthe}>
                      {route.params.item.type}
                    </Text>
                  </>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.elevationstyle}>
              <Text style={styles.textExpe}>Expense Details</Text>
              <View style={{marginTop: 20}}>
                <View style={[styles.flexview, {}]}>
                  <Text style={styles.textdate}>Date</Text>
                  <Text style={styles.textmar}>
                    {moment(route.params.item.date).format('MMM DD, yyyy')}
                  </Text>
                </View>
                <View style={[styles.flexview, {}]}>
                  <Text style={styles.textdate}>Description</Text>
                  <Text style={styles.textfuel}>
                    {route.params.item.description}
                  </Text>
                </View>
                <View style={styles.flexview}>
                  <Text style={styles.textdate}>Attachment</Text>
                  <TouchableOpacity onPress={() => setvisible(true)}>
                    <Image
                      source={{uri: route.params.item.bill_attachment}}
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.flexview, {}]}>
                  <Text style={styles.textdate}>Status</Text>
                  <View style={styles.pickerContainer}>{picker()}</View>
                </View>
              </View>

              <View style={styles.flexview}>
                <Text style={[styles.textdate, {}]}>Status by</Text>

                <Text style={[styles.textmar, {}]}>Admin</Text>
              </View>
              {/* <View
                style={styles.flexview}>
                <Text style={styles.textdate}>Sub Total</Text>
                <Text style={[styles.textmar, {}]}>
                  Total Amount
                </Text>
              </View>
              <View
                style={styles.flexview}>
                <Text style={styles.textdate}>Less Cash Advance</Text>
                <Text style={[styles.textmar, {}]}> Amount</Text>
              </View> */}
              <View style={styles.flexview}>
                <Text style={styles.textdate}>Participants</Text>
                <View style={{width: '50%', alignItems: 'flex-end'}}>
                  <Text style={[{color: DARK, fontSize: 14}]}>
                    {billDetails.participants}
                  </Text>
                </View>
              </View>
              <View style={styles.flexview}>
                <Text style={styles.textdate}>Total Reimbursement</Text>
                <Text style={[styles.textmar, {}]} numberOfLines={1}>
                  {route.params.item.amount}
                </Text>
              </View>
            </View>
            {submitbtnShow()}
          </View>
        </Animatable.View>
      </ScrollView>

      {visible && (
        <Modal visible={visible} animationType="fade">
          <SafeAreaView style={styles.container}>
            <ImageViewer
              renderIndicator={() => null}
              imageUrls={[{url: route.params.item.bill_attachment}]}
              index={0}
              style={[
                styles.Imagecontainer,
                {
                  padding: 10,
                },
              ]}>
              {/* <Image
                source={require('../../Assets/bills.png')}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              /> */}
            </ImageViewer>
            <View style={styles.iconContainer}>
              <Icon
                name="times"
                color={PRIMARY}
                size={20}
                onPress={() => {
                  setvisible(false);
                }}
              />
            </View>
          </SafeAreaView>
        </Modal>
      )}
      {loading && <LoaderOrg />}
    </>
  );
}
const styles = StyleSheet.create({
  Imagecontainer: {
    marginHorizontal: 10,
    marginVertical: 30,
    borderRadius: 20,
  },
  iconContainer: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.46,
    elevation: 9,

    top: 15,
    right: 5,
    marginTop: Platform.OS === 'ios' ? 60 : 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  submitebtnContainer: {
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 80,
    borderRadius: 40,
    elevation: 8,
  },
  submitebtn: {
    paddingVertical: 10,
    fontSize: 20,
    color: WHITE,
    fontWeight: 'bold',
  },
  mainview: {
    backgroundColor: '#E14D2A',
    height: 190,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  touchablview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagetouchabl: {
    height: 80,
    width: 80,
    borderRadius: 60,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagestyle: {
    height: 50,
    width: 50,
    tintColor: DARK,
    resizeMode: 'cover',
  },
  textrupees: {
    fontSize: 18,
    color: WHITE,
    fontWeight: 'bold',
    left: 2,
  },
  textfuelthe: {
    fontSize: 16,
    color: WHITE,
  },
  textfuel: {
    fontSize: 16,
    color: DARK,
    flex: 0.9,
    textAlign: 'right',
    // top: 9,
    // left: 12,
    marginLeft: 44,
  },
  container2: {
    marginHorizontal: 18,
    marginTop: 20,
  },
  imagetouchstyle: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCheck: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: DARK,
  },
  elevationstyle: {
    backgroundColor: '#fff',
    marginVertical: 24,
    elevation: 10,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  textExpe: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E14D2A',
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
    width: 100,
  },
  pickerContainer: {
    alignItems: 'center',
    //  marginBottom:Platform.OS && 180 ,
    width: '40%',
  },
  picker: {
    width: Dimensions.get('window').width / 2 - 40,
    height: 24,
    color: DARK,
    // marginBottom:Platform.OS && 180 ,
    marginRight: -20,
  },
  Approved: {
    color: 'green',
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
    marginVertical: 20,
    height: 45,
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
  },
  textstyle: {
    fontSize: 18,
    color: WHITE,
  },
  subtotal: {
    fontSize: 18,
    color: DARK,
  },
});
