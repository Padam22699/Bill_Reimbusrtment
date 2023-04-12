import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Animated } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

import { theme } from '../core/theme';
import * as Animatable from 'react-native-animatable';


export default function Profile({ navigation }) {
 
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
  const [Type, setType] = useState('')
  const animatadValue = React.useRef(new Animated.Value(0))
  return (
    <ScrollView style={styles.container}>
      {/* <Animatable.View animation="zoomInDown" style={{ transform: "scale" }}>
        <View style={styles.mainview}>
          <View style={styles.datetimestyle}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity onPress={() => { showDatePicker() }}
              activeOpacity={0.8}>
              <Text style={styles.textstyle}>
                {Date}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { showDatePicker() }}
              activeOpacity={0.8}>
              <Entypo name='calendar' size={25} color="blue" />
            </TouchableOpacity>
          </View>

          <View>
            <TextInput
              label="Amount" />
            <TextInput
              label="Purpose" />
            <TextInput
              label="Bill attachment" />
            <TextInput
              label="Participants" />
            <View style={styles.rnpicker}>
              <RNPickerSelect
                style={{ inputAndroid: { height: 40 } }}
                useNativeAndroidPickerStyle
                onValueChange={(value) => console.log(value)}
                placeholder={{ label: 'Type' }}

                items={[
                  { label: 'Medical', value: 'Medical' },
                  { label: 'Food', value: 'Food' },
                  { label: 'Fuel', value: 'Fuel' },
                  { label: 'Others', value: 'Others' },
                ]} value={Type} />

            </View>
            <View style={{ marginTop: 30 }}>
              <Button mode="contained" onPress={() => navigation.navigate('DetailScreen')} >
                SUBMIT
              </Button>
            </View>
          </View>
        </View>
      </Animatable.View> */}

      <Text>Profile</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  datetimestyle: {
    flexDirection: 'row', alignItems: 'center', alignSelf: "flex-end",
  },
  mainview: {
    width: '100%', paddingVertical: 14, paddingHorizontal: 24, marginVertical: 24,
    borderRadius: 6
  },
  textstyle: {
    margin: 10, fontSize: 16, color: '#000', fontWeight: "normal"
  },
  amounttext: {
    fontSize: 18
  },
  rnpicker: {
    borderWidth: 1, height: 55, justifyContent: 'center', marginTop: 15, borderColor: "silver",
    borderRadius: 5, backgroundColor: theme.colors.surface,
  },
  antDesign: {
    flexDirection: 'row', justifyContent: "space-between",
    marginHorizontal: 35
  }

})
