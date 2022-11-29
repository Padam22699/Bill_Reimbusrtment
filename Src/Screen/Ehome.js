import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  DARK,
  WHITE,
  A,
  B,
  C,
} from '../Organization/Colors/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../core/theme';
import Welogo from '../Organization/Componets/Welogo';

const Ehome = ({ navigation }) => {

  useEffect(() => {
  }, []);

  const MiddleContent = ({
    money,
    heading,
    backGround,
    onpress = () => { },
  }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onpress}>
        <View style={styles.Container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: deviceWidth / 3 - 20,
              backgroundColor: backGround,
              height: 90,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Icon name="rupee-sign" size={20} color={WHITE} />
            <Text
              style={{
                fontSize: 24,
                marginLeft: 5,
                color: WHITE,
                alignContent: 'center',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              {money}
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              alignContent: 'center',
              padding: 4
            }}>
            <Text
              adjustsFontSizeToFit={true}
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: "#5D3FD3",
                fontWeight: 'bold',
                textAlignVertical: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                margin: 5,
              }}>
              {heading}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="default" />
      <View style={{ margin: 12 }}>
        <Welogo navigation={navigation} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MiddleContent money={60} heading="This Month" backGround={A} />
          <MiddleContent
            money={200}
            heading="Last 6 Months"
            backGround={B}
          />
          <MiddleContent money={600} heading="This Year" backGround={C} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Ehome;
const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  Container: {
    marginTop: 20,
    backgroundColor: WHITE,
    height: 140,
    width: deviceWidth / 3 - 20,
    borderRadius: 20,
    shadowColor: DARK,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 4,
    shadowRadius: 5,
    shadowOpacity: 0.75,
    marginBottom: 20,
  },
  RecordContainer: {},
  recentList: {
    backgroundColor: WHITE,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 4,
    shadowRadius: 5,
    shadowOpacity: 0.75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
});
