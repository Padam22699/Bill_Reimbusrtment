import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import {DARK, GREY, PRIMARY, WHITE} from '../Colors/Color';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import Imagepath from '../../Assets/Images/Imagepath';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function FullDetailScreen({navigation, route}) {
  const data = route.params.item;
  const list = route.params.data;
  const indexx = route.params.index;

  const [checkbook, setcheckbook] = useState(true);
  const [stutes, setstutes] = useState('Pendding');

  useFocusEffect(
    useCallback(() => {
      console.log('fullDeatailsScreen');
    }, []),
  );
  const [visible, setvisible] = useState(false);
  const images = [
    {url: '', props: {source: require('../../Assets/bills.png')}},
  ];
  return (
    <>
      <View style={styles.container}>
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
                  <Text style={styles.textrupees}>1550.00</Text>
                  <>
                    <Text style={styles.textfuelthe}>The Fuel</Text>
                  </>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.elevationstyle}>
              <Text style={styles.textExpe}>Expense Details</Text>

              <View>
                <View style={[styles.flexview, {paddingVertical: -3}]}>
                  <Text style={styles.textdate}>Date</Text>
                  <Text style={styles.textmar}>Mar 27,2022</Text>
                </View>
                <View style={[styles.flexview, {paddingVertical: -6}]}>
                  <Text style={styles.textdate}>Description</Text>
                  <Text style={styles.textfuel}>
                    This is a reimbursement applied for the fuel.
                  </Text>
                </View>
                <View style={styles.flexview}>
                  <Text style={styles.textdate}>Attachment</Text>
                  <TouchableOpacity onPress={() => setvisible(true)}>
                    <Image
                      source={require('../../Assets/bills.png')}
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        resizeMode: 'cover',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.flexview, {paddingVertical: 3}]}>
                  <Text style={styles.textdate}>Status</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      style={styles.picker}
                      selectedValue={stutes}
                      onValueChange={itemvalue => setstutes(itemvalue)}>
                      <Picker.Item
                        label="Pending"
                        value="Pending"
                        color={DARK}
                      />
                      <Picker.Item
                        label="Approved"
                        value="Approved"
                        color={DARK}
                      />
                      <Picker.Item
                        label="Decline"
                        value="Decline"
                        color={DARK}
                      />
                      <Picker.Item
                        label="Forwarded"
                        value="Forwarded"
                        color={DARK}
                      />
                    </Picker>
                  </View>
                </View>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.subtotal, {marginBottom: 10}]}>
                  Status by
                </Text>
                <Text style={[styles.subtotal, {fontSize: 16}]}>Name</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.subtotal}>Sub Total</Text>
                <Text style={[styles.subtotal, {fontSize: 16}]}>
                  Total Amount
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={styles.subtotal}>Less Cash Advance</Text>
                <Text style={[styles.subtotal, {fontSize: 16}]}> Amount</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={styles.subtotal}>Total Reimbursement</Text>
                <Text style={[styles.subtotal, {fontSize: 16}]}> Amount</Text>
              </View>
              {/* <View style={styles.flexview}>
              <Text style={styles.textdate}>Physically submitted the bill</Text>
              <TouchableOpacity
                style={styles.imagetouchstyle}
                onPress={() => {
                  setcheckbook(!checkbook);
                }}
                activeOpacity={0.9}>
                <Image
                  source={checkbook ? Imagepath.check : Imagepath}
                  style={styles.imageCheck}
                />
              </TouchableOpacity>
            </View> */}
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Home')}>
              <View style={styles.submitebtnContainer}>
                <Text style={styles.submitebtn}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>

      {visible && (
        <Modal visible={visible} animationType="fade">
          <SafeAreaView style={styles.container}>
            <ImageViewer
              renderIndicator={() => null}
              imageUrls={images}
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
                size={24}
                onPress={() => {
                  setvisible(false);
                }}
              />
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Imagecontainer: {
    marginHorizontal: 10,
    marginVertical: 30,
    borderRadius: 20,
  },
  iconContainer: {
    position: 'absolute',
    width: 35,
    height: 35,
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
    backgroundColor: PRIMARY,
    height: 135,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
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
    textAlign: 'center',
    top: 9,
    left: 12,
  },
  container2: {
    marginHorizontal: 18,
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
    height: 470,
    backgroundColor: '#fff',
    marginTop: 24,
    elevation: 10,
    borderRadius: 16,
    paddingHorizontal: 14,
    padding: 14,
  },
  textExpe: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK,
  },
  flexview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  textdate: {
    fontSize: 18,
    color: DARK,
  },
  textmar: {
    fontSize: 16,
    color: DARK,
  },
  pickerContainer: {
    alignItems: 'center',
  },
  picker: {
    width: 134,

    height: 20,
    color: DARK,
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
    height: 45,
    justifyContent: 'center',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {
    fontSize: 18,
    color: PRIMARY,
  },
  subtotal: {
    fontSize: 18,
    color: DARK,
  },
});
