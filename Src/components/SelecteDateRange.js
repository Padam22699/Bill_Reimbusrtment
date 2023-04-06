import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';

import {Calendar, CalendarList, DateObject} from 'react-native-calendars';
import {theme} from '../core/theme';

const SelecteDateRange = ({setDateRangeModal, setstartDate, setendDate}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  console.log('startDate', startDate);
  console.log('endDate', endDate);

  const handleDayPress = day => {
    // const dateString = day.dateString
    // const formattedDate = moment(dateString).format('DD/MM/YYYY');
    console.log('day');

    if (!startDate) {
      setStartDate(day.dateString);
      setMarkedDates({[day.dateString]: {selected: true}});
    } else if (!endDate && day.dateString > startDate) {
      let range = getRangeOfDates(startDate, day.dateString);
      let marked = markDatesInRange(range);
      setEndDate(day.dateString);
      setMarkedDates(marked);
    } else {
      setStartDate(day.dateString);
      setEndDate('');
      setMarkedDates({[day.dateString]: {selected: true}});
    }
  };

  const getRangeOfDates = (start, end) => {
    let range = {};
    let currentDate = new Date(start);
    while (currentDate <= new Date(end)) {
      let dateString = currentDate.toISOString().slice(0, 10);
      range[dateString] = {selected: true};
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  const markDatesInRange = range => {
    let marked = {};
    marked = {...markedDates};
    Object.keys(range).forEach(date => {
      if (marked[date]) {
        marked[date].startingDay = true;
        marked[date].endingDay = true;
      } else {
        marked[date] = {selected: true, startingDay: true, endingDay: true};
      }
    });
    return marked;
  };

  return (
    <View>
      <CalendarList
        style={{marginEnd: 9, marginStart: -6, marginTop: 12}}
        horizontal
        onDayPress={handleDayPress}
        monthFormat={'DD/MM/YY'}
        markedDates={markedDates}
        theme={{}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginTop: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setDateRangeModal(false);
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: theme.colors.primary,
              }}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setDateRangeModal(false);
            setstartDate(moment(startDate).format('DD/MM/YYYY'));

            setendDate(moment(endDate).format('DD/MM/YYYY'));
          }}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 10,
              elevation: 5,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#ffff',
              }}>
              Ok
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SelecteDateRange;
