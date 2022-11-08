import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image ,Alert} from "react-native";
import Imagepath from "../Assets/Images/Imagepath";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";


const SideMenu = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageview}>
        <Image source={Imagepath.user}style={styles.imagestyle} />
        </TouchableOpacity>
       <Text style={styles.text}>Sher khan</Text>
     
    </View>
  )
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  text: {
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 5
  },
  imageview:{
    alignItems:"center",marginVertical:10
  },
  imagestyle:{
    height:120,width:120,
  }

})
export default SideMenu;