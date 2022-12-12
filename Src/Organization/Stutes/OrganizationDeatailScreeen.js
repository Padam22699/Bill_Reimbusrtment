import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import React, { createRef, useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-deck-swiper';
import { DARK, GREY, PRIMARY, WHITE } from '../Colors/Color';
import { useFocusEffect } from '@react-navigation/native';
import LoaderOrg from '../Componets/LoaderOrg';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, clearChangeStatus } from '../../redux/actions/changeStatusAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OrganizationDeatailScreeen = ({ navigation, route }) => {

  const [list, setList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [change, setChange] = useState(null)

  const dispatch = useDispatch()

  const changeStatusResponse = useSelector(
    state => state.changeStatusReducer.data,
  );
  const loading = useSelector(state => state.changeStatusReducer.loading);

  useFocusEffect(
    useCallback(() => {
      console.log("navigation  =>>>", navigation)
      getData();
      return clearParams
    }, []),
  );

  const clearParams = () => {
    navigation.setParams(null)
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_data');
      if (value !== null) {
        const data = JSON.parse(value);
        if (data != null) {
          setUserData(data);
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    } catch (e) {
      console.log('storage error', e);
    }
  };

  useEffect(() => {
    setCurrentIndex(null)
    setList([])
    setCurrentRequest(null)
    setTimeout(() => {
      setCurrentIndex(route.params.index)
      setList(route.params.data)
      setCurrentRequest(route.params.data[route.params.index])
      console.log('DetailsScreenss indexx ==>', route.params);
    }, 10)
  }, [route])

  const renderCard = (card, index) => {
    console.log("card", card, "\n index", index)
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.card}
        onPress={() => {
          console.log('navigation', navigation);
          navigation.navigate('UserDetail', {
            item: card,
          });
        }}>
        <View style={[styles.imageConatiner]}>
          <Image
            source={{ uri: card.bill_attachment }}
            style={styles.billImage}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            paddingBottom: 20,
          }}>
          <View style={styles.cardData}>
            <Text style={styles.userInfo}>{card.employee}</Text>
            <Text style={styles.userInfo}>{card.type}</Text>
            <Text style={styles.userInfo}>{card.amount}</Text>
          </View>
          <View style={{ marginTop: 2 }}>
            <Text style={{ color: DARK }}>{moment(card.date).format('DD/MM/YYYY')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onSwiped = () => {
    if ((currentIndex + 1) % list.length > 0) {
      setCurrentIndex((currentIndex + 1) % list.length);
      setCurrentRequest(list[(currentIndex + 1) % list.length])
    } else {
      navigation.goBack()
    }
    console.log("currentIndex", (currentIndex + 1) % list.length)
  };
  // const CardDetails = ({index}) => {
  //   return (

  //   );
  // };

  const approve = () => {
    setChange("Right")
    let request = {
      user_id: userData.user_id,
      bill_id: currentRequest.bill_id,
      user_status: "Approved"
    }
    dispatch(changeStatus(request))
  }

  const reject = () => {
    setChange("Left")
    let request = {
      user_id: userData.user_id,
      bill_id: currentRequest.bill_id,
      user_status: "Rejected"
    }
    dispatch(changeStatus(request))
  }


  useEffect(() => {
    if (changeStatusResponse != null) {
      console.log('changeStatusResponse', changeStatusResponse);
      if (
        Object.keys(changeStatusResponse).length != 0 &&
        changeStatusResponse.statusCode != 200
      ) {
        alert(changeStatusResponse.message);
        dispatch(clearChangeStatus());
      }
      if (
        Object.keys(changeStatusResponse).length != 0 &&
        changeStatusResponse.statusCode == 200
      ) {
        if (change == "Left") {
          swiperRef.current.swipeLeft()
        } else {
          swiperRef.current.swipeRight()
        }
        dispatch(clearChangeStatus());
      }
    }
  }, [changeStatusResponse]);

  const swiperRef = createRef();

  return (
    <View style={styles.container}>
      <View style={styles.headingcontainer}>
        <Text style={styles.heading}>Request List</Text>
        <TouchableOpacity
          style={[styles.cencell, styles.cencellbutton]}
          onPress={() => navigation.goBack()}>
          <Icon name="home" size={20} color={PRIMARY} />
        </TouchableOpacity>
      </View>

      <View style={styles.swiperContainer}>
        {list.length > 0 && currentIndex != null && <Swiper
          horizontalSwipe={false}
          verticalSwipe={false}
          ref={swiperRef}
          cards={list}
          cardIndex={currentIndex}
          renderCard={renderCard}
          onSwiped={onSwiped}
          stackScale={4}
          stackSeparation={9}
          backgroundColor={WHITE}
          disableBottomSwipe
          disableRightSwipe
          disableLeftSwipe
          animateOverlayLabelsOpacity
          animateCardOpacity
          infinite={false}
          disableTopSwipe
          overlayLabels={{
            left: {
              title: 'Decline',
              style: {
                label: {
                  color: GREY,
                  fontsize: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: 'Aproved',
              style: {
                label: {
                  color: GREY,
                  fontsize: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginLeft: 20,
                },
              },
            },
          }}
        />}
      </View>
      <View style={styles.bottomContainer}>
        {/* <CardDetails index={index} /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 40,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={reject}>
            <Icon name="times" size={30} color={PRIMARY} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={approve}>
            <Icon name="check" size={30} color={PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
      {((list.length == 0 && currentIndex == null) || loading) && <LoaderOrg />}
    </View>
  );
};
export default OrganizationDeatailScreeen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  },
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: 'contain',
  },
  swiperContainer: {
    flex: 0.7,
  },
  card: {
    marginBottom: 20,
    marginTop: -40,
    flex: 0.85,
    borderRadius: 8,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: '#fff',
  },
  bottomContainer: {
    flex: 0.3,
    marginTop: 30,
    justifyContent: 'center',
  },
  cardDetails: {
    alignItems: 'center',
  },
  imageConatiner: {
    flex: 2,
  },
  billImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardData: {
    flex: 1,
    marginTop: 10,
  },
  button: {
    width: 70,
    height: 70,
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
    marginTop: 20,
  },
  cencellbutton: {
    width: 35,
    height: 35,
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
  },
  userInfo: {
    color: DARK,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 2,
  },
  cencell: {},
  headingcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginTop:Platform.OS === 'ios' ? 50 :0
  },
  heading: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontSize: 24,
    color: DARK,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});
