import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DARK} from '../Colors/Color';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
const DateFilter = ({updateDate}) => {
  const [visible, setVisible] = useState(false);
  const showDatePicker = () => {
    setVisible(true);
  };
  const hideDatePicker = () => {
    setVisible(false);
  };
  const handleConfirm = date => {
    updateDate(moment(date).format('DD MMM yyyy'));
    setVisible(false);
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => showDatePicker()} activeOpacity={0.8}>
        <View
          style={{
            alignItems: 'center',

            justifyContent: 'center',
            marginRight: 10,
          }}>
          <Icon name="filter" size={30} color={DARK} />
        </View>

        <DateTimePickerModal
          maximumDate={new Date()}
          isVisible={visible}
          mode="date"
          onConfirm={date => {
            handleConfirm(date);
          }}
          onCancel={hideDatePicker}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DateFilter;

const styles = StyleSheet.create({});
