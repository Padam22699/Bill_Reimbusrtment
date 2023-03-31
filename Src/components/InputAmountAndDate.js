import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import {WHITE, GREY} from '../Organization/Colors/Color';
import EmpTextInput from '../components/TextInput';
import {theme} from '../core/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Entypo from 'react-native-vector-icons/Entypo';
const InputAmountAndDate = () => {
  const [openDatePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState('Select a Date');
  const [openModal, setOpenMOdal] = useState(true);

  const showDatePicker = () => {
    setDatePicker(true);
  };
  const hideDatePicker = () => {
    setDatePicker(false);
  };
  const handleConfirm = date => {
    console.log('date', date);
    console.log(moment(date).format('DD MMM yyyy'));
    setDate(moment(date).format('DD MMM yyyy'));
    hideDatePicker();
  };
  return (
    <>
     
    </>
  );
};

export default InputAmountAndDate;

const styles = StyleSheet.create({});
