import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Headers } from '../Common/Headers';
import { theme } from '../core/theme';
import { getNotification } from '../redux/actions/notificationAction';

const Notification = () => {

  const dispatch = useDispatch()

  const [notifications, setNotifications] = useState([])
  const [page, setPage] = useState(1)

  const notificationResponse = useSelector(state => state.notificationReducer.data)

  useFocusEffect(
    useCallback(() => {
      fetchNotifications(1)
    }, [])
  )

  const fetchNotifications = (page) => {
    let request = {
      "user_id": "636122b24ddcaf16082448ff",
      "reverse": -1,
      "page": page
    }

    dispatch(getNotification(request))
  }

  useEffect(() => {
    if (notificationResponse != null) {
      console.log("notificationResponse", notificationResponse)
      if (Object.keys(notificationResponse).length != 0 && notificationResponse.statusCode != 200) {
        alert(notificationResponse.message)
      }
      if (Object.keys(notificationResponse).length != 0 && notificationResponse.statusCode == 200) {
        setNotifications(notificationResponse.data)
        setPage(page => page + 1)
      }
    }
  }, [notificationResponse])

  const renderNotifications = ({ item }) => {
    return (
      <View>
        <Text>{item.text}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotifications}
        // onEndReached={fetchNotifications(page)}
        ListEmptyComponent={() => {
          return (
            <Text style={styles.text}>Notification Screen</Text>
          )
        }
        }
      />

    </View>

  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1, paddingHorizontal: 10, backgroundColor: theme.colors.white,
    alignItems: "center", justifyContent: "center",
  },
  text: {
    fontSize: 22, color: "#000"
  }
})
export default Notification;
