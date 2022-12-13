import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Headers} from '../Common/Headers';
import Heading from '../components/Heading';
import {theme} from '../core/theme';
import {GREY, WHITE} from '../Organization/Colors/Color';
import {getNotification} from '../redux/actions/notificationAction';

const Notification = ({navigation}) => {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);

  const notificationResponse = useSelector(
    state => state.notificationReducer.data,
  );

  useFocusEffect(
    useCallback(() => {
      fetchNotifications(1);
    }, []),
  );

  const fetchNotifications = page => {
    let request = {
      type: 'employee',
      // user_id: '636122b24ddcaf16082448ff',
      reverse: -1,
      page: page,
    };

    dispatch(getNotification(request));
  };

  useEffect(() => {
    if (notificationResponse != null) {
      console.log('notificationResponse', notificationResponse);
      if (
        Object.keys(notificationResponse).length != 0 &&
        notificationResponse.statusCode != 200
      ) {
        alert(notificationResponse.message);
      }
      if (
        Object.keys(notificationResponse).length != 0 &&
        notificationResponse.statusCode == 200
      ) {
        setNotifications(notificationResponse.data);
        setPage(page => page + 1);
      }
    }
  }, [notificationResponse]);

  const renderNotifications = ({item}) => {
    return (
      <View>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: WHITE, flex: 1, paddingHorizontal: 12}}>
      {/* <Heading navigation={navigation} /> */}

      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={renderNotifications}
          // onEndReached={fetchNotifications(page)}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop : Platform.OS === 'ios' ? 80 :0
                }}>
                <Text style={styles.text}>Notifications</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: WHITE,
  },
  text: {
    fontSize: 22,
    color: GREY,
    marginBottom: 120,
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
});
export default Notification;
