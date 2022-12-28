import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  FlatList,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import EmpTextInput from '../components/TextInput';
import Imagepath from '../Assets/Images/Imagepath';
import ImagePicker, {openCamera} from 'react-native-image-crop-picker';
import {Iconlist} from '../Common/VerticalData';
import {theme} from '../core/theme';
import LinearGradient from 'react-native-linear-gradient';
import {amountValidator} from '../helpers/amountValidator';
import {descriptionValidator} from '../helpers/descriptionValidator';
import {participantsValidator} from '../helpers/participantsValidator';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addBill, clearAddBill} from '../redux/actions/addBillAction';
import Loader from '../Organization/Componets/Loader';
import * as permissions from 'react-native-permissions';
import {DARK, WHITE} from '../Organization/Colors/Color';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export default function Reimbursement({navigation}) {
  const dispatch = useDispatch();

  const [OpenGallry, setOpenGallry] = useState(false);
  const [userData, setUserData] = useState(null);
  const [date, setDate] = useState('Select a Date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [upload, setupload] = useState(false);
  const [select, setSelect] = useState('');

  const [amount, setAmount] = useState({value: '', error: ''});
  const [description, setDescription] = useState({value: '', error: ''});
  const [participants, setParticipants] = useState({value: '', error: ''});

  const addBillResponse = useSelector(state => state.addBillReducer.data);
  const loading = useSelector(state => state.addBillReducer.loading);
  const onSubmitPress = () => {
    const amountError = amountValidator(amount.value);
    const descriptionError = descriptionValidator(description.value);
    const participantsError = participantsValidator(participants.value);

    if (amountError || descriptionError || participantsError) {
      setAmount({...amount, error: amountError});
      setDescription({...description, error: descriptionError});
      setParticipants({...participants, error: participantsError});
      return;
    }
    if (date == 'Select a Date') {
      alert('Select a Date');
      return;
    }
    if (!upload) {
      alert('Attach your bill');
      return;
    }
    if (select == 'A') {
      alert('Select your bill type');
      return;
    }
    addBillApi();
  };
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    setDate(moment(date).format('DD MMM yyyy'));
    hideDatePicker();
  };

  const imageCrop = () => {
    Alert.alert('Attach your bill', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Gallery', onPress: () => OpenGallery()},
      {text: 'Camera', onPress: () => OpenCamera()},
    ]);

    const OpenGallery = () => {
      ImagePicker.openPicker({
        width: 1000,
        height: 1000,
        cropping: true,
      }).then(image => {
        setOpenGallry(false);
        setupload(image.path);
      });
    };
    const OpenCamera = () => {
      ImagePicker.openCamera({
        width: 1000,
        height: 1000,
        cropping: true,
      }).then(image => {
        setOpenGallry(false);
        setupload(image.path);
      });
    };
  };
  const addBillApi = () => {
    let request = new FormData();
    //  request.append('user_id', userData.user_id);
    request.append('date', date);
    request.append('description', description.value);
    request.append('amount', amount.value);
    request.append('participants', participants.value);
    request.append('type', select.text);
    request.append('bill_attachment', {
      uri: upload,
      type: 'image/jpeg',
      name: 'bill',
    });

    dispatch(addBill(request));
  };

  useEffect(() => {
    if (addBillResponse != null) {
      console.log('addBillResponse', addBillResponse);
      if (
        Object.keys(addBillResponse).length != 0 &&
        addBillResponse.statusCode != 200
      ) {
        alert(addBillResponse.message);
        dispatch(clearAddBill());
      }
      if (
        Object.keys(addBillResponse).length != 0 &&
        addBillResponse.statusCode == 200
      ) {
        console.log('response', addBillResponse);
        dispatch(clearAddBill());

        navigation.navigate('Bills', {screen: 'ToptabBar'});

        setDate('Select a Date');
        setAmount({value: ''});
        setDescription({value: ''});
        setParticipants({value: ''});
        setupload(false);
        setSelect('');
      }
    }
  }, [addBillResponse]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.antDesign}>
        <TouchableOpacity
          style={styles.touchabl}
          activeOpacity={0.8}
          onPress={() => {
            setSelect(item);
          }}>
          <View
            style={
              item === select
                ? styles.IconlistContainerSelected
                : styles.IconlistContainer
            }>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="dark-content"
        />
        <ScrollView style={styles.mainview} showsVerticalScrollIndicator={false}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '700',
              marginVertical: 10,
              marginBottom: Platform.OS === 'ios' ? 30 : 10,
            }}>
            Add Expense
          </Text>
          <View style={styles.datetimestyle}>
            <DateTimePickerModal
              maximumDate={new Date()}
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
              }}
              activeOpacity={0.8}>
              <Text style={styles.textdate}>{date}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
              }}
              activeOpacity={0.8}>
              <Entypo name="calendar" size={25} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <View>
            <View style={{}}>
              <EmpTextInput
                placeholder="Amount "
                maxLength={6}
                keyboardType={'numeric'}
                value={amount.value}
                onChangeText={text => {
                  setAmount({value: text, error: ''});
                }}
                error={!!amount.error}
                errorText={amount.error}
                // style={{
                //   backgroundColor: theme.colors.surface,
                //   width: '100%',
                //   height :Platform.OS ==='ios'? 40 :40
                // ,color:DARK
                // }}
              />
            </View>
            <EmpTextInput
              placeholder="Description"
              value={description.value}
              onChangeText={text => {
                setDescription({value: text, error: ''});
              }}
              error={!!description.error}
              errorText={description.error}
            />
            <EmpTextInput
              placeholder="Participants Names"
              value={participants.value}
              multiline={true}
              onChangeText={text => {
                setParticipants({value: text, error: ''});
              }}
              error={!!participants.error}
              errorText={participants.error}
            />
            <View style={styles.attachview}>
              <Text style={styles.textbill}>Attach your bill</Text>
              <TouchableOpacity
                style={styles.touchacrop}
                onPress={() => {
                  imageCrop();
                  // setOpenGallry(true);
                }}>
                <Image source={Imagepath.Medical} style={styles.imagecrop} />
              </TouchableOpacity>
            </View>
            {upload && (
              <View style={styles.imageflex}>
                <TouchableOpacity
                  style={styles.touchablicon}
                  activeOpacity={0.9}>
                  <Image
                    source={upload ? {uri: upload} : Imagepath.file}
                    style={styles.imagestyle}
                  />
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.textbill}>Select your bill type</Text>
            <View style={{flex: 1}}>
              <FlatList
                data={Iconlist}
                horizontal
                keyExtractor={item => item.id}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 60 : 30,
                marginBottom: 50,
              }}>
              <TouchableOpacity
                mode="contained"
                onPress={onSubmitPress}
                activeOpacity={0.9}>
                <LinearGradient
                  colors={['#CF9FFF', '#5D3FD3']}
                  useAngle={true}
                  angle={10}
                  style={styles.touchabltext}>
                  <Text style={styles.textstyle}>SUBMIT</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* <View style={styles.OpenGalleryModel}>
          <Modal visible={OpenGallry} animationType="fade" transparent={true}>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SafeAreaView
                style={{
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  // width: responsiveScreenWidth(85),
                  // height: responsiveScreenHeight(25),
                  backgroundColor: WHITE,
                  // marginVertical: responsiveScreenHeight(35),
                  marginHorizontal: responsiveScreenWidth(8),
                  borderRadius: 10,
                  elevation: 10,
                  // shadowColor: WHITE,
                  // shadowOffset: {width: 0, height: 1},
                  // shadowOpacity: 0.8,
                  // shadowRadius: 2,
                  // elevation: 10,
                }}>
                <View
                  style={{
                    paddingHorizontal: responsiveScreenWidth(5),
                    borderRadius: 10,
                    shadowColor: WHITE,
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 15,
                    width: 300,
                    height: 150,
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      marginTop: 10,
                      fontWeight: '500',
                    }}>
                    Attach Your Bill
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 70,
                    }}>
                    <View>
                      <TouchableOpacity onPress={() => setOpenGallry(false)}>
                        <Text
                          style={{
                            fontSize: 15,
                            marginRight: '15%',
                          }}>
                          CANCEL
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{fontSize: 15}}
                        onPress={() => OpenGalleryy()}>
                        GALLERY
                      </Text>

                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 15,
                        }}
                        onPress={() => OpenCameraa()}>
                        CAMERA
                      </Text>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </Modal>
        </View> */}
      </View>

      {loading && <Loader />}
    </>
  );
}

const styles = StyleSheet.create({
  OpenGalleryModel: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.violet,
  },
  datetimestyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 15,
    justifyContent: 'space-between',
    borderRadius: 15,
    borderColor: '#5D3FD3',
    height: 75,
  },
  mainview: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 16,
    marginTop: Platform.OS === 'ios' ? responsiveScreenHeight(3) : 20,
    marginBottom: Platform.OS === 'ios' ? 100 : 85,
    borderRadius: 15,
  },
  attachview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  touchacrop: {
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    marginHorizontal: 10,
    padding: 2,
  },
  imagecrop: {
    height: 10,
    width: 10,
    tintColor: theme.colors.primary,
  },
  textdate: {
    fontSize: 16,
    fontWeight: 'normal',
    color: theme.colors.text,
  },
  amounttext: {
    fontSize: 18,
  },
  rnpicker: {
    borderWidth: 1,
    height: 55,
    justifyContent: 'center',
    marginTop: 15,
    borderColor: 'silver',
  },
  antDesign: {
    marginTop: 20,
  },
  touchaicon: {
    borderWidth: 1,
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderRadius: 7,
  },
  touchablicon: {
    borderWidth: 1,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderRadius: 7,
  },
  touchabl: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderRadius: 7,
    marginRight: 14,
  },
  text: {
    color: '#891fe0',
    fontWeight: 'bold',
  },
  textbill: {
    fontSize: 16,
    color: '#000',
  },
  camerastyle: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagestyle: {
    height: 50,
    width: 50,
    borderRadius: 7,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
  IconlistContainer: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  IconlistContainerSelected: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.violet,
    borderRadius: 7,
  },
  image: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    tintColor: '#891fe0',
  },
  imageflex: {
    marginVertical: 7,
  },
  touchabltext: {
    height: 45,
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
  },
  textstyle: {
    fontSize: 18,
    color: '#fff',
  },
});
