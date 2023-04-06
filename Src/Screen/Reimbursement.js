import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
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
import SelecteDateRange from '../components/SelecteDateRange';
import {TextInput as MeterialInput} from '@react-native-material/core';
import InputAmountAndDate from '../components/InputAmountAndDate';

const Reimbursement = () => {
  const [userData, setUserData] = useState(null);
  const [description, setDescription] = useState({value: '', error: ''});
  const [participants, setParticipants] = useState({value: '', error: ''});
  const [select, setSelect] = useState('');
  const [OpenDateRangePicker, setOpenDateRangPicker] = useState(false);
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');

  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [amount, setAmount] = useState({value: '', error: ''});
  const [date, setDate] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [Url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [OpenAttachmentModals, setOpenAttachmentModals] = useState(false);
  const [openAmountAndDateMOdal, setopenAmountAndDateMOdal] = useState(false);
  const [datePicker, setDatePicker] = useState(false);

  const handleAddData = () => {
    const amountError = amountValidator(amount.value);
    if (amountError) {
      setAmount({...amount, error: amountError});
      return;
    }
    if (date == '') {
      alert('Please Selecte a Date');
      return;
    }
    let newData = {
      Url: Url,
      amount: amount.value,
      date: date,
      type: type,
    };
    let newArr = [];
    if (Array.isArray(data)) {
      newArr = [...newArr, ...data];
    }
    newArr.push(newData);
    setData(newArr);
    setopenAmountAndDateMOdal(false);
    setImageUrl('');
    setDocumentUrl('');
    setAmount('');
    setDate('');
  };

  const addBillResponse = useSelector(state => state.addBillReducer.data);
  const loading = useSelector(state => state.addBillReducer.loading);
  const dispatch = useDispatch();
  const NetInfo = useNetInfo();

  const onSubmitPress = () => {
    console.log('RRRR');
    const amountError = amountValidator(amount.value);
    const descriptionError = descriptionValidator(description.value);
    const participantsError = participantsValidator(participants.value);

    if (descriptionError || participantsError) {
      setDescription({...description, error: descriptionError});
      setParticipants({...participants, error: participantsError});
      return;
    }
    if (startDate && endDate == '') {
      alert('Select a Date');
      return;
    }
    if (Url == '') {
      alert('Attach your bill');
      return;
    }
    if (select == 'A') {
      alert('Select your bill type');
      return;
    }
    addBillApi();
    // setupload(null);
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
      // uri: upload,
      type: 'image/jpeg',
      name: 'bill',
    });

    dispatch(addBill(request));
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  useEffect(() => {});

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
        // setDate('Select a Date');
        // setAmount({value: ''});
        setDescription({value: ''});
        setParticipants({value: ''});
        // setupload(null);
        setSelect('');
      }
    }
  }, [addBillResponse]);

  const openImageAmountandDatemodal = () => {
    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Modal
          visible={openAmountAndDateMOdal}
          animationType="fade"
          transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: WHITE,
              position: 'absolute',
              top: '15%',
              right: '5%',
              left: '5%',
              borderRadius: 10,
              elevation: 10,
              paddingTop: 10,
              paddingHorizontal: 10,
            }}>
            <View style={{alignItems: 'center', marginVertical: 10}}>
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 10,
                  color: GREY,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Fill Details
              </Text>

              <View style={{width: '100%'}}>
                <EmpTextInput
                  multiline={true}
                  error={!!amount.error}
                  errorText={amount.error}
                  placeholderTextColor={GREY}
                  placeholder={'Enter Amount'}
                  label={'Enter Amount'}
                  value={amount.value}
                  keyboardType="phone-pad"
                  onChangeText={text => {
                    setAmount({value: text, error: ''});
                  }}
                  labelColor={GREY}
                  inputContainerStyle={{
                    labelColor: GREY,
                    color: GREY,
                  }}
                  // secureTextEntry={hidePassword}
                  floatingPlaceholder={true}
                />
                {/* {amount.erros && (
                  <View>
                    <Text
                      style={{
                        color: 'red',
                        marginHorizontal: 5,
                        marginBottom: 10,
                        marginTop: -10,
                      }}>
                      Plz Enter Amount
                    </Text>
                  </View>
                )} */}
                <TouchableOpacity
                  onPress={() => setDatePicker(true)}
                  activeOpacity={0.9}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 13,
                      paddingHorizontal: 10,
                      marginHorizontal: 5,
                      borderWidth: 1,
                      borderColor: GREY,
                      marginBottom: 20,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    {date ? <Text>{date}</Text> : <Text>Select a date</Text>}

                    <Entypo
                      name="calendar"
                      size={25}
                      color={theme.colors.primary}
                      style={{alignSelf: 'flex-end'}}
                    />
                  </View>

                  <View style={{marginBottom: 20}}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        handleAddData();
                      }}>
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          backgroundColor: theme.colors.primary,
                          borderRadius: 12,
                          elevation: 10,
                        }}>
                        <Text
                          style={{
                            color: WHITE,
                            fontWeight: '600',
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                          }}>
                          Ok
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <DateTimePickerModal
                  maximumDate={new Date()}
                  isVisible={datePicker}
                  mode="date"
                  onConfirm={date => {
                    setDate(moment(date).format('DD MMM yyyy'));
                  }}
                  // onCancel={setDatePicker(false)}
                />
              </View>

              <TouchableOpacity></TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const OpenGallery = () => {
    setOpenAttachmentModals(false);
    const currPhotos = '';
    // ImagePicker.openPicker({
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: false,
      multiple: true,
      mediaType: 'photo',
    }).then(images => {
      setopenAmountAndDateMOdal(true);
      setUrl(images[0].path);
      setType('png');
      // for (var i = 0; i < images.length; i++) {
      //   const image = images[i];
      //   if (!image.didCancel && !image.error) {
      //     const cropped = await ImagePicker.openCropper({
      //       path: image.path,
      //     });
      //     currPhotos = cropped.path;
      //   }
      // }

      // handleAddData();
    });
  };
  const OpenCamera = () => {
    setOpenAttachmentModals(false);
    const currPhotos = '';
    ImagePicker.openCamera({
      width: 1000,
      height: 1000,
      cropping: true,
      multiple: true,
      mediaType: 'photo',
    }).then(image => {
      console.log(image);

      setopenAmountAndDateMOdal(true);
      setUrl(image.path);
      setType('png');
      // handleAddData();
    });
  };

  const BillDocumnetPicker = async () => {
    setOpenAttachmentModals(false);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log('BillDocumnetPicker', result);

      setopenAmountAndDateMOdal(true);
      setUrl(result.uri);
      setType('pdf');
    } catch (error) {
      console.log('DocumetPIcker Error =>', error);
    }
  };

  const OpenDateRnagePicker = () => {
    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}>
        <Modal visible={OpenDateRangePicker} animationType="fade" transparent>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              backgroundColor: WHITE,
              width: '90%',
              height: '65%',
              position: 'absolute',
              top: '13%',
              borderRadius: 10,
              elevation: 5,
              paddingTop: 10,
              paddingHorizontal: 10,
            }}>
            <View style={{height: '100%', width: '100%'}}>
              <SelecteDateRange
                setDateRangeModal={setOpenDateRangPicker}
                setstartDate={setstartDate}
                setendDate={setendDate}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const OpenAttachmentModal = () => {
    return (
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
        <Modal visible={OpenAttachmentModals} animationType="slide" transparent>
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
                  // setUploadAttachment(prevState => ({
                  //   ...prevState,
                  //   openModal: false,
                  // }));
                  setOpenAttachmentModals(false);
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
    );
  };
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
  const renderAttachedBillData = ({item}) => {
    //ssss
    // const extension = path.extname(url);
    console.log();
    return (
      <View>
        <View
          style={{
            // marginTop: 10,
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
                // HandelBillRemoveIMages(index);
              }}>
              <Icon
                name="trash"
                size={18}
                color={theme.colors.primary}
                style={{
                  alignSelf: 'flex-end',
                  paddingRight: 10,
                  marginBottom: 10,
                }}
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
              style={{flex: 1, alignItems: 'center'}}
              onPress={() => {}}>
              {item.type == 'pdf' ? (
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
              ) : (
                <Image
                  source={{uri: item.Url}}
                  style={{
                    width: 50,
                    flex: 1,
                    height: 50,
                    marginRight: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
              )}
            </TouchableOpacity>
            <View style={{flex: 2}}>
              <Text
                style={{alignSelf: 'center', marginRight: 10, fontSize: 16}}>
                ₹ {item.amount}
              </Text>
              {/* <TextInput placeholder="Enter Amount" /> */}
            </View>
            <Text>{item.date}</Text>
            {/* <Text>{item.type}</Text> */}
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '700',
            marginTop: 10,
            // marginVertical: 5,
            marginBottom: Platform.OS === 'ios' ? 30 : 0,
          }}>
          Add Bills
        </Text>
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
            placeholder="Participants"
            value={participants.value}
            multiline={true}
            onChangeText={text => {
              setParticipants({value: text, error: ''});
            }}
            error={!!participants.error}
            errorText={participants.error}
          />
          <Text style={{fontWeight: '900', color: DARK, fontSize: 16}}>
            Category
          </Text>
          <View style={{flex: 1}}>
            <FlatList
              data={Iconlist}
              horizontal
              keyExtractor={item => item.id}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View>
            <View style={styles.datetimestyle}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
                onPress={() => {
                  setOpenDateRangPicker(true);
                }}
                activeOpacity={0.8}>
                {startDate == '' || endDate == '' ? (
                  <Text>Select a Date</Text>
                ) : (
                  <Text style={{color: DARK, fontWeight: '700'}}>
                    {startDate} - {endDate}
                  </Text>
                )}
                <Entypo
                  name="calendar"
                  size={25}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text
          style={[
            styles.textbill,
            {
              fontSize: 20,
              marginBottom: 0,
              marginTop: 10,
              color: DARK,
              fontWeight: '700',
              marginHorizontal: 30,
            },
          ]}>
          Attach your bill
        </Text>
        <View style={styles.mainview}>
          {data.length <= 0 && (
            <View style={styles.attachview}>
              <TouchableOpacity
                style={{
                  backgroundColor: ['#CF9FFF', '#5D3FD3'],
                  paddingHorizontal: 30,
                  paddingVertical: 5,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                activeOpacity={0.9}
                onPress={() => {
                  setOpenAttachmentModals(true);
                }}>
                <LinearGradient
                  colors={['#CF9FFF', '#5D3FD3']}
                  useAngle={true}
                  angle={10}
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 3,
                    borderRadius: 15,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  {/* <Image
                      source={Imagepath.Medical}
                      style={styles.imagecrop}
                    /> */}
                  <Text
                    style={{
                      color: WHITE,
                      fontSize: 20,
                      fontWeight: '400',
                      marginLeft: 8,
                      elevation: 10,
                    }}>
                    Add
                  </Text>
                  <Text
                    style={{
                      color: WHITE,
                      fontSize: 25,
                      fontWeight: '400',
                      marginLeft: 8,
                    }}>
                    +
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={data}
            // keyExtractor={item => item.id}
            renderItem={renderAttachedBillData}
          />

          {data.length > 0 ? (
            <View
              style={{
                marginTop: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: ['#CF9FFF', '#5D3FD3'],
                  paddingHorizontal: 30,
                  paddingVertical: 5,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                activeOpacity={0.9}
                onPress={() => {
                  setOpenAttachmentModals(true);
                }}>
                <LinearGradient
                  colors={['#CF9FFF', '#5D3FD3']}
                  useAngle={true}
                  angle={10}
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 3,
                    borderRadius: 15,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: WHITE,
                      fontSize: 18,
                      fontWeight: '400',
                      marginLeft: 8,
                      elevation: 10,
                      paddingVertical: 2,
                    }}>
                    Add More
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={{marginTop: 10}}>
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
      </ScrollView>
      {OpenAttachmentModals && OpenAttachmentModal()}
      {OpenDateRangePicker && OpenDateRnagePicker()}
      {openAmountAndDateMOdal && openImageAmountandDatemodal()}
    </SafeAreaView>
  );
};

export default Reimbursement;

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
    alignItems: 'center',
    marginVertical: 10,
  },
  touchacrop: {},
  imagecrop: {
    height: 18,
    width: 18,
    tintColor: WHITE,
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
