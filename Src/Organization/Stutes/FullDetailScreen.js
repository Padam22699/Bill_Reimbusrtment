import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { DARK, PRIMARY, WHITE } from '../Colors/Color';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import Imagepath from '../../Assets/Images/Imagepath';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../core/theme';
import LinearGradient from 'react-native-linear-gradient';

export default function FullDetailScreen({ navigation, route }) {

  const [stutes, setstutes] = useState('Pendding');

  useFocusEffect(
    useCallback(() => {
      console.log('fullDeatailsScreen');
    }, []),
  );

  const [visible, setvisible] = useState(false);

  const images = [
    { url: '', props: { source: require('../../Assets/bills.png') } },
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        <Animatable.View animation="zoomInDown" style={{ transform: 'scale' }}>
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
                style={{ alignSelf: 'flex-end' }}
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
                  style={{ top: 5 }}
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
              <View style={{ marginTop: 20 }}>
                <View style={[styles.flexview, {}]}>
                  <Text style={styles.textdate}>Date</Text>
                  <Text style={styles.textmar}>Mar 27,2022</Text>
                </View>
                <View style={[styles.flexview, {}]}>
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
                        height: 50,
                        width: 50,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.flexview, {}]}>
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
                style={styles.flexview}>
                <Text style={[styles.textdate, {}]}>
                  Status by
                </Text>
                <Text style={[styles.textmar, {}]}>Name</Text>
              </View>
              <View
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
              </View>
              <View
                style={styles.flexview}>
                <Text style={styles.textdate}>Total Reimbursement</Text>
                <Text style={[styles.textmar, {}]}> Amount</Text>
              </View>
            </View>
            <TouchableOpacity
              mode="contained"
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.9}>
              <LinearGradient
                colors={['#FAC898', '#E14D2A']}
                useAngle={true}
                angle={10}
                style={styles.touchabltext}>
                <Text style={styles.textstyle}>SUBMIT</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>

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
                size={20}
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
    backgroundColor: "#E14D2A",
    height: 135,
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
    textAlign: 'center',
    top: 9,
    left: 12,
  },
  container2: {
    marginHorizontal: 18,
    marginTop: 20
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
    marginTop: 24,
    elevation: 10,
    borderRadius: 15,
    padding: 20,
  },
  textExpe: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E14D2A',
    textAlign: 'center'
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
    fontWeight: '500'
  },
  textmar: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'right',
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
    marginVertical: 20,
    height: 45,
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
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
