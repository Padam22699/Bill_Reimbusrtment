import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {createRef, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-deck-swiper';
import {DARK, GREY, PRIMARY, WHITE} from '../Colors/Color';
const OrganizationDeatailScreeen = ({navigation, route}) => {
  const data = route.params.item;
  const list = route.params.data;
  const indexx = route.params.index;

  const [index, setindex] = useState(indexx);

  const Card = ({card, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.card}
        onPress={() => navigation.navigate('UserDetail')}>
        <View style={[styles.imageConatiner]}>
          <Image
            source={require('../../Assets/pic3.jpg')}
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
            <Text style={styles.userInfo}>
              {list[index].id}
              {/* {data != null && index != null ? list[index].id : null} */}
            </Text>
            <Text style={styles.userInfo}>Bill Type </Text>
            <Text style={styles.userInfo}>Amount </Text>
          </View>
          <View style={{}}>
            <Text style={{color: GREY}}>01/02/2022</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onSwiped = () => {
    setindex((index + 1) % list.length);
  };
  // const CardDetails = ({index}) => {
  //   return (

  //   );
  // };

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
        <Swiper
          horizontalSwipe={false}
          verticalSwipe={false}
          ref={swiperRef}
          cards={data}
          cardIndex={index}
          renderCard={card => <Card card={card} index={index} />}
          onSwiped={onSwiped}
          stackScale={4}
          stackSeparation={9}
          backgroundColor={WHITE}
          disableBottomSwipe
          disableRightSwipe
          disableLeftSwipe
          animateOverlayLabelsOpacity
          animateCardOpacity
          infinite
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
        />
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
            onPress={() => swiperRef.current.swipeLeft()}>
            <Icon name="times" size={30} color={PRIMARY} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => swiperRef.current.swipeRight()}>
            <Icon name="check" size={30} color={PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
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
    shadowOffset: {width: 0, height: 0},
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
  },
  heading: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 24,
    color: DARK,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});
