import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  clearNotification,
  getNotification,
} from '../../redux/actions/notificationAction';
import {useCallback} from 'react';

import {theme} from '../../core/theme';
import {DARK, PRIMARY, GREY, WHITE} from '../Colors/Color';

import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import ImageViewer from 'react-native-image-zoom-viewer';
import LoaderOrg from '../Componets/LoaderOrg';
const OrgNotification = ({navigation}) => {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setvisible] = useState(false);
  const [imageUrl, setImageUral] = useState('');

  console.log('RRRRRRRRRR => ', notifications);

  const notificationResponse = useSelector(
    state => state.notificationReducer.data,
  );
  const loading = useSelector(state => state.notificationReducer.loading);

  useFocusEffect(
    useCallback(() => {
      setNotifications([]);
      fatchNotification('1');
      setPage('1');
    }, []),
  );

  const fatchNotification = page => {
    let request = {
      type: 'organization',
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
          // flex: 1,
          // borderBottomColor: theme.colors.PRIMARY,
          // borderBottomWidth: 1,
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
              justifyContent: 'space-between',
              alignItems: 'center',

              marginBottom: 5,
              borderRadius: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                setvisible(true);
                setImageUral(item.bill_attachment);
              }}>
              <View style={{borderRadius: 100, marginRight: 20, marginLeft: 5}}>
                <Image
                  style={{width: 60, height: 60, borderRadius: 100}}
                  source={{uri: item.bill_attachment}}
                />
              </View>
            </TouchableOpacity>

            <View style={{flex: 1}}>
              <Text style={{fontSize: 15, color: DARK, fontWeight: '700'}}>
                {item.name}
              </Text>
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
      <View style={{flex: 1, backgroundColor: WHITE}}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 2,
            flexDirection: 'row',
          }}>
          <Icon
            name="arrow-left"
            size={28}
            color={PRIMARY}
            style={{marginLeft: 20}}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text
            style={{
              fontSize: 24,
              color: DARK,
              marginLeft: '20%',
              fontWeight: '600',
              paddingVertical: 10,
            }}>
            Notifications
          </Text>
        </View>
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: responsiveScreenHeight(15),
              marginTop: responsiveScreenHeight(1),
              paddingHorizontal: responsiveScreenHeight(1),
            }}
            data={notifications}
            renderItem={renderNotifications}
            onEndReached={() => {
              fatchNotification(page);
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
              <View style={{flex: 1}}>
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
              </View>
            </SafeAreaView>
          </Modal>
        )}
      </View>
      {loading && <LoaderOrg />}
    </>
  );
};

export default OrgNotification;

const styles = StyleSheet.create({
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

    top: 0,
    right: 5,
    marginTop: Platform.OS === 'ios' ? responsiveScreenHeight(1) : 20,
  },
  Imagecontainer: {
    marginHorizontal: 10,
    marginVertical: 30,
    borderRadius: 20,
  },
});
