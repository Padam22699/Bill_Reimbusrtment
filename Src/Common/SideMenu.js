import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import Imagepath from "../Assets/Images/Imagepath";
import { theme } from "../core/theme";


const SideMenu = ({ navigation }) => {

  const [name, setName] = useState(null)

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_data')
      console.log("value", value)
      if (value !== null) {
        const data = JSON.parse(value)
        if (data != null) {
          setName(data.first_name + " " + data.last_name)
        } else {
          setName(null)
        }
      } else {
        setName(null)
      }
    } catch (e) {
      console.log("storage error", e)
    }
  }

  const logout = async () => {
    let data = {
      loggedin: false
    }
    try {
      const jsonValue = JSON.stringify(data)
      await AsyncStorage.mergeItem('@user_data', jsonValue)
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      })
    } catch (e) {
      console.log("error in saving data", e)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageview}>
        <Image source={Imagepath.user} style={styles.imagestyle} />
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
      <ScrollView>
        <View>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.options}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 5
  },
  options: {
    color: theme.colors.primary,
    fontSize: 16,
    marginVertical: 5
  },
  imageview: {
    alignItems: "center",
    marginVertical: 10
  },
  imagestyle: {
    height: 120,
    width: 120,
  }

})
export default SideMenu;