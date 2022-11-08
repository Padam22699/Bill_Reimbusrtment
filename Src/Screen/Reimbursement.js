import React, { useState } from 'react'
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, ScrollView, Image, Alert, FlatList } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import TextInput from '../components/TextInput';
import { Button } from 'react-native-paper';
import Imagepath from '../Assets/Images/Imagepath';
import ImagePicker from 'react-native-image-crop-picker';
import { Iconlist } from '../Common/VerticalData';
import { theme } from '../core/theme';
import LinearGradient from 'react-native-linear-gradient';


export default function Reimbursement({ navigation }) {
  const [Date, setDate] = useState('Select a Date')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDate(moment(date).format('DD MMM yyyy'))
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  const [upload, setupload] = useState(false)
  const imageCrop = () => {
    Alert.alert(
      "Attach your Select bill",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Gallery", onPress: () => OpenGallery() },
        { text: "Camera", onPress: () => OpenCamera() }
      ]
    );
    const OpenGallery = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        setupload(image.path);
      });
    }
    const OpenCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setupload(image.path);
      });
    }
  };

  const [select, setSelect] = useState("A")

  const renderItem = ({ item }) => {
    return (
      <View style={styles.antDesign}>
        <TouchableOpacity style={styles.touchabl} activeOpacity={0.8}
          onPress={() => { setSelect(item) }} >
          <View style={item === select ? styles.IconlistContainerSelected : styles.IconlistContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.white}
        barStyle="dark-content" />
      <View style={styles.mainview}>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "700",bottom:10 }}>
          Bill Type
        </Text>
        <View style={styles.datetimestyle}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker} />
          <TouchableOpacity onPress={() => { showDatePicker() }}
            activeOpacity={0.8}>
            <Text style={styles.textdate}>{Date}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { showDatePicker() }} activeOpacity={0.8}>
            <Entypo name='calendar' size={25} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{}}>
            <TextInput label="Amount" style={{ paddingHorizontal: 12, backgroundColor: theme.colors.surface }} />
            <FontAwesome name='rupee' size={18} color={theme.colors.text} style={{ position: "absolute", top: 37, marginHorizontal: 15 }} />
          </View>
          <TextInput label="Description" />
          <TextInput label="sher@gmail.com" />
          <View style={styles.attachview}>
            <Text style={styles.textbill}>Attach your bill</Text>
            <TouchableOpacity style={styles.touchacrop}
              onPress={() => { imageCrop() }}>
              <Image source={Imagepath.Medical} style={styles.imagecrop} />
            </TouchableOpacity>
          </View>
          { upload &&
            <View style={styles.imageflex}>
              <TouchableOpacity style={styles.touchablicon} activeOpacity={0.9}
                onPress={() => { ('') }} >
                <Image source={upload ? { uri: upload } : Imagepath.file}
                  style={styles.imagestyle} />
              </TouchableOpacity>
            </View>
          }
          <Text style={styles.textbill}>Select your bill type</Text>
          <View style={{ flex: 1 }}>
            <FlatList
              data={Iconlist}
              horizontal
              keyExtractor={item => item.id}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false} />
          </View>
          <View style={{ marginTop: 30, marginHorizontal: 30 }}>
            <TouchableOpacity mode="contained" onPress={() => navigation.navigate('Current')} activeOpacity={0.9}>
              <LinearGradient colors={["#7426f2", '#3d0891']} style={styles.touchabltext}>
                <Text style={styles.textstyle}>
                  SUBMIT
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {/* <View style={{ marginVertical: 30, marginHorizontal: 30 }}>
            <Button mode="contained" onPress={() => navigation.navigate('Current')} >
              SUBMIT
            </Button>
          </View> */}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: theme.colors.violet
  },
  datetimestyle: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 15, justifyContent: 'space-between', borderRadius: 7,
    borderColor: theme.colors.secondary
  },
  mainview: {
    paddingVertical: 30, paddingHorizontal: 24, backgroundColor: '#fff', elevation: 2, marginHorizontal: 16, marginVertical: 20,
    borderRadius: 7
  },
  attachview: {
    flexDirection: 'row', alignItems: 'center', marginVertical: 5
  },
  touchacrop: {
    borderWidth: 2, height: 35, width: 35, borderRadius: 30, alignItems: "center", justifyContent: 'center', borderColor: theme.colors.primary,
    marginHorizontal: 10
  },
  imagecrop: {
    height: 25, width: 25, tintColor: theme.colors.primary,
  },
  textdate: {
    fontSize: 16, fontWeight: "normal", color: theme.colors.text
  },
  amounttext: {
    fontSize: 18
  },
  rnpicker: {
    borderWidth: 1, height: 55, justifyContent: 'center', marginTop: 15, borderColor: "silver"
  },
  antDesign: {
    marginTop: 20
  },
  touchaicon: {
    borderWidth: 1, height: 90, width: 90, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderRadius: 7

  },
  touchablicon: {
    borderWidth: 1, height: 70, width: 70, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderRadius: 7
  },
  touchabl: {
    borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderRadius: 7, marginRight: 14
  },
  text: {
    color: '#891fe0', fontWeight: "bold"
  },
  textbill: {
    fontSize: 16, color: "#000"
  },
  camerastyle: {
    marginVertical: 20, flexDirection: "row", alignItems: "center", justifyContent: 'center',
  },

  imagestyle: {
    height: 50, width: 50, borderRadius: 7, resizeMode: 'contain', marginHorizontal: 20,
  },
  IconlistContainer: {
    height: 70, width: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 7
  },
  IconlistContainerSelected: {
    height: 70, width: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.violet, borderRadius: 7,
  },
  image: {
    height: 25, width: 25, resizeMode: "contain", tintColor: '#891fe0'
  },
  imageflex: {
    marginVertical: 7
  },
  touchabltext: {
    height: 45, justifyContent: 'center', borderRadius: 7, alignItems: 'center', justifyContent: 'center'
  },
  textstyle: {
    fontSize: 18, color: "#fff"
  },

})
