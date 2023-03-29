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
  TextInput,
  Linking,
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
import {DARK, GREY, WHITE} from '../Organization/Colors/Color';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetWorkConnectionModel from '../NetWorkConnection/NetWorkConnectionModel';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import InputAmount from '../InputModel/InputAmount';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
export default function Reimbursement({navigation}) {
  const dispatch = useDispatch();
  const NetInfo = useNetInfo();

  const [OpenGallry, setOpenGallry] = useState(false);
  const [userData, setUserData] = useState(null);
  const [date, setDate] = useState('Select a Date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [upload, setupload] = useState([]);
  const [billDocumnet, setBillDOcumnt] = useState([]);
  const [select, setSelect] = useState('');
  const [amount, setAmount] = useState({value: '', error: ''});
  const [description, setDescription] = useState({value: '', error: ''});
  const [participants, setParticipants] = useState({value: '', error: ''});
  const [checkbook, setcheckbook] = useState(false);
  const [Clicked, setClicked] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
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
    if (upload == null) {
      alert('Attach your bill');
      return;
    }
    if (select == 'A') {
      alert('Select your bill type');
      return;
    }
    addBillApi();
    setupload(null);
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
  const OpenGallery = () => {
    setOpenModal(false);
    const currPhotos = [];
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: false,
      multiple: true,
      mediaType: 'photo',
    }).then(async images => {
      for (var i = 0; i < images.length; i++) {
        const image = images[i];
        if (!image.didCancel && !image.error) {
          const cropped = await ImagePicker.openCropper({
            path: image.path,
          });
          currPhotos.push(cropped.path);
        }
      }
      setOpenGallry(false);

      setupload([...upload, ...currPhotos]);
    });
  };
  const OpenCamera = () => {
    setOpenModal(false);
    const currPhotos = [];
    ImagePicker.openCamera({
      width: 1000,
      height: 1000,
      cropping: true,
      multiple: true,
      mediaType: 'photo',
    }).then(image => {
      setOpenGallry(false);
      currPhotos.push(image.path);
      setupload([...upload, ...currPhotos]);
    });
  };

  const BillDocumnetPicker = async () => {
    setOpenModal(false);
    const currtDocument = [];
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log('BillDocumnetPicker', result);
      currtDocument.push(result);
      setBillDOcumnt([...billDocumnet, ...currtDocument]);
    } catch (error) {
      console.log('DocumetPIcker Error =>', error);
    }
  };
  const HandelBillRemoves = index => {
    const newDocuments = [...billDocumnet];
    newDocuments.splice(index, 1);
    setBillDOcumnt(newDocuments);
  };
  const HandelBillRemoveIMages = index => {
    const newDocuments = [...upload];
    newDocuments.splice(index, 1);
    setupload(newDocuments);
  };

  // const imageCrop = () => {
  //   Alert.alert('Attach your bill', '', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {text: 'Gallery', onPress: () => OpenGallery()},
  //     {text: 'Camera', onPress: () => OpenCamera()},
  //   ]);
  // };
  const AttachedBill = ({heading, IconName, line, onClicked}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            onClicked();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                marginTop: 10,
                backgroundColor: '#FAF9F6',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 5,
              }}>
              <Icon name={IconName} size={24} />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 17,
                  color: DARK,
                  fontWeight: '700',
                }}>
                {heading}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {line && (
          <View
            style={{
              backgroundColor: '#FAF9F6',
              height: 1,
              marginTop: 10,
            }}></View>
        )}
      </View>
    );
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
        setupload(null);
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
        <View>
          {!NetInfo.isConnected && NetInfo.isConnected != null ? (
            <NetWorkConnectionModel color={theme.colors.primary} />
          ) : null}
        </View>
        {/* //ssss */}
        <ScrollView
          // style={styles.mainview}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '700',
              marginTop: 10,
              // marginVertical: 5,
              marginBottom: Platform.OS === 'ios' ? 30 : 0,
            }}>
            Add Expense
          </Text>
          <TouchableOpacity
            onPress={() => {
              showDatePicker();
            }}
            activeOpacity={0.8}></TouchableOpacity>
          <View>
            {/* <View style={{}}>
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
            </View> */}
            <View style={styles.mainview}>
              <EmpTextInput
                placeholder="Description"
                value={description.value}
                multiline={true}
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
              <Text style={styles.textbill}>Category</Text>
              <View style={{flex: 1}}>
                <FlatList
                  data={Iconlist}
                  horizontal
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <View style={styles.datetimestyle}>
                <DateTimePickerModal
                  maximumDate={new Date()}
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={date => {
                    handleConfirm(date);
                  }}
                  onCancel={hideDatePicker}
                />

                <Text style={styles.textdate}>{date}</Text>

                <TouchableOpacity
                  onPress={() => {
                    showDatePicker();
                  }}
                  activeOpacity={0.8}>
                  <Entypo
                    name="calendar"
                    size={25}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 4,
              }}>
              <Text style={styles.textbill}>Physically submitted the bill</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setcheckbook(!checkbook);
                }}>
                <View
                  style={{
                    marginRight: 10,
                    width: 20,
                    height: 20,
                    borderColor: theme.colors.primary,
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: checkbook ? '#5D3FD3' : '#fff',
                  }}>
                  {checkbook ? (
                    <Image
                      source={Imagepath.check}
                      style={{width: 15, height: 15, tintColor: WHITE}}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            </View> */}
            <View style={styles.mainview}>
              <View style={styles.attachview}>
                <Text style={styles.textbill}>Attach your bill</Text>
                <TouchableOpacity
                  style={styles.touchacrop}
                  onPress={() => {
                    setOpenModal(true);
                    // imageCrop();
                    // setOpenGallry(true);
                  }}>
                  <Image source={Imagepath.Medical} style={styles.imagecrop} />
                </TouchableOpacity>
              </View>

              {/* //ssss */}
              <View style={{}}>
                {upload && (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      shadowColor: GREY,
                      shadowOffset: {width: 1, height: 1},
                      shadowOpacity: 0.4,
                      shadowRadius: 3,
                      elevation: 5,
                    }}>
                    {upload.map((image, index) => (
                      <View>
                        <View
                          key={index}
                          style={{
                            marginTop: 10,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            marginBottom: 10,
                          }}>
                          <View
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: -2,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                HandelBillRemoves(index);
                              }}>
                              <Icon
                                name="trash"
                                size={18}
                                color={theme.colors.primary}
                                style={{alignSelf: 'flex-end'}}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              paddingTop: 10,
                              paddingHorizontal: 10,

                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <TouchableOpacity
                              style={{flex: 1}}
                              onPress={() => {}}>
                              <Image
                                source={{uri: image}}
                                style={{
                                  width: 50,
                                  flex: 1,
                                  height: 50,
                                  marginRight: 10,
                                  borderRadius: 10,
                                  marginBottom: 10,
                                }}
                              />
                            </TouchableOpacity>
                            <View style={{flex: 2}}>
                              <TextInput placeholder="Enter Amount" />
                            </View>
                            <Text>02/jan/2023</Text>
                          </View>
                        </View>
                        <View style={{height: 1, backgroundColor: GREY}}></View>
                      </View>
                    ))}
                  </View>
                )}
                {billDocumnet && (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      shadowColor: GREY,
                      shadowOffset: {width: 1, height: 1},
                      shadowOpacity: 0.4,
                      shadowRadius: 3,
                    }}>
                    {billDocumnet.map((item, index) => (
                      <View
                        style={{
                          backgroundColor: WHITE,
                          marginBottom: 8,
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 1},
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,
                          borderRadius: 10,
                        }}>
                        <View
                          key={index}
                          style={{
                            marginTop: 10,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                          }}>
                          <View
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: -2,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                HandelBillRemoves(index);
                              }}>
                              <Icon
                                name="trash"
                                size={18}
                                color={theme.colors.primary}
                                style={{alignSelf: 'flex-end', paddingRight: 10,marginBottom:10}}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              paddingTop: 10,
                              paddingHorizontal: 10,
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <TouchableOpacity
                              style={{flex: 1}}
                              onPress={() => {
                                navigation.navigate('PDFviwer');
                                // Linking.openURL(item[index].uri);
                              }}>
                              <Image
                                source={require('../Assets/Images/pdf.png')}
                                style={{
                                  width: 50,
                                  flex: 1,
                                  height: 50,
                                  marginRight: 10,
                                  borderRadius: 10,
                                  marginBottom: 10,
                                }}
                              />
                            </TouchableOpacity>
                            <View style={{flex: 2}}>
                              <TextInput placeholder="Enter Amount" />
                            </View>
                            <Text>02/jan/2023</Text>
                          </View>
                        </View>
                        {/* <View style={{height: 1, backgroundColor: GREY}}></View> */}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
            <View>
              <View
                style={{
                  marginTop: Platform.OS === 'ios' ? 60 : 10,
                  marginBottom: 90,
                  marginHorizontal: 20,
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
          </View>
        </ScrollView>
      </View>
      {OpenModal && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <Modal visible={OpenModal} animationType="slide" transparent>
            <View
              style={{
                flex: 1,
                backgroundColor: WHITE,
                width: '100%',
                height: '35%',
                position: 'absolute',
                bottom: 0,
                borderRadius: 10,
                elevation: 10,
                paddingTop: 10,
                paddingHorizontal: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    color: GREY,
                    fontSize: 17,
                    fontWeight: '700',
                  }}>
                  Attached your bill
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setOpenModal(false);
                  }}>
                  <Icon
                    style={{alignSelf: 'flex-end'}}
                    name={'times'}
                    size={28}
                    color={DARK}
                  />
                </TouchableOpacity>
              </View>
              <AttachedBill
                heading={'Gallary'}
                IconName={'image'}
                line
                onClicked={OpenGallery}
              />
              <AttachedBill
                heading={'Camera'}
                IconName={'camera'}
                line
                onClicked={OpenCamera}
              />
              <AttachedBill
                heading={'File'}
                IconName={'file-pdf'}
                onClicked={BillDocumnetPicker}
              />
            </View>
          </Modal>
        </View>
      )}
      {loading && <Loader />}

      {/* {OpenModal && (
        <View style={{marginTop: 10}}>
          <Modal visible={true}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  width: '95%',
                  height: 100,
                  elevation: 10,
                  borderRadius: 10,
                }}>
                <TouchableOpacity>
                  <View></View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )} */}
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
    marginTop: 20,
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
    marginHorizontal: 16,
    marginTop: Platform.OS === 'ios' ? responsiveScreenHeight(3) : 15,
    // marginBottom: Platform.OS === 'ios' ? responsiveScreenHeight(13) : 75,
    borderRadius: 15,
  },
  attachview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
  flexview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 2,
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
});
