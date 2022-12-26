import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Headers} from '../Common/Headers';
import Heading from '../components/Heading';
import {theme} from '../core/theme';
import {DARK, GREY, WHITE, PRIMARY} from '../Organization/Colors/Color';
import {
  clearNotification,
  getNotification,
} from '../redux/actions/notificationAction';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import LoaderOrg from '../Organization/Componets/LoaderOrg';

const Notification = ({navigation}) => {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState('1');
  const [visible, setvisible] = useState(false);
  const [imageUrl, setImageUral] = useState('');

  const notificationResponse = useSelector(
    state => state.notificationReducer.data,
  );
  const loading = useSelector(state => state.notificationReducer.loading);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications('1');
      setPage('1');
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
        dispatch(clearNotification());
      }
      if (
        Object.keys(notificationResponse).length != 0 &&
        notificationResponse.statusCode == 200
      ) {
        setNotifications([...notifications, ...notificationResponse.data]);
        let pageNum = parseInt(page);
        let incPage = pageNum + 1;
        setPage(incPage.toString());
        dispatch(clearNotification());
      }
    }
  }, [notificationResponse]);

  const renderNotifications = ({item}) => {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginBottom: 5,
          elevation: 1,
        }}>
        <View
          style={{
            backgroundColor: WHITE,
            marginBottom: 3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
              borderRadius: 20,
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setvisible(true);
                setImageUral(item.bill_attachment);
              }}>
              <View style={{borderRadius: 100, marginRight: 10}}>
                <Image
                  style={{width: 60, height: 60, borderRadius: 100}}
                  source={{uri: item.bill_attachment}}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                alignItems: 'flex-start',
                paddingRight: 25,
                width: responsiveScreenWidth(80),
              }}>
              <Text style={{fontSize: 15, color: DARK}}>{item.message}</Text>
            </View>
          </View>

          <View
            style={{alignItems: 'flex-end', marginTop: -10, marginRight: 15}}>
            <Text style={{color: GREY}}>{item.created}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <>
      <View style={{backgroundColor: WHITE, flex: 1, paddingHorizontal: 8}}>
        {/* <Heading navigation={navigation} /> */}
        <Text
          style={{
            color: DARK,
            fontSize: 22,
            fontWeight: '700',
            paddingHorizontal: 10,
            paddingVertical: 10,
            // marginTop: Platform.OS == 'ios' ? 10 : 0,
          }}>
          Notifications
        </Text>
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: responsiveScreenHeight(20),
              marginTop: responsiveScreenHeight(1),
            }}
            data={notifications}
            showsVerticalScrollIndicator={false}
            renderItem={renderNotifications}
            onEndReached={() => {
              fetchNotifications(page);
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: Platform.OS === 'ios' ? 80 : 0,
                  }}>
                  <Text style={styles.text}>Notifications</Text>
                </View>
              );
            }}
          />
        </View>
        {visible && (
          <Modal visible={visible} animationType="fade">
            <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
              <ImageViewer
                renderIndicator={() => null}
                imageUrls={[{url: imageUrl}]}
                index={0}
                style={[
                  styles.Imagecontainer,
                  {
                    width: '100%',
                    height: '100%',
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
      </View>
      {loading && <LoaderOrg />}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    color: GREY,
    marginBottom: 120,
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
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
    marginTop: Platform.OS === 'ios' ? 60 : 20,
  },
});
export default Notification;
