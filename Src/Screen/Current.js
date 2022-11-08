import React, { useState, useEffect, } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image, FlatList, TextInput, KeyboardAvoidingView, Modal } from 'react-native'
import { theme } from '../core/theme'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Data } from '../Common/VerticalData';
import Imagepath from '../Assets/Images/Imagepath';


export default function Current({ navigation }) {

  // useEffect(()=>{
  //   axios.get("")
  //   .then(res=>{
  //     console.log(res.data[5].body)
  //   })
  //   .catch(error=>{
  //     console.log(error)
  //   })
  // },[])
 
  const [modalOpen, setModalOpen] = useState(false)

  const [current, setCurrent] = useState(Data)
  const typeColor = (type) => {
    if (type == "fuel") {
      return theme.colors.primary
    }
    else if (type == "medical") {
      return 'red'
    }
    else {
      return 'blue'
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.mainView}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate('DetailScreen') }}>
          <View style={styles.imageView}>
            <View style={{ ...styles.imagetype, backgroundColor: typeColor(item.type) }}>
              <Image source={item.image} style={styles.imagestyle} />
            </View>
          </View>
          <View style={styles.textview}>
            <Text style={styles.textblood}>{item.title}</Text>
            <Text style={styles.textapprove}>{item.Approved}</Text>
          </View>
          <Text style={styles.textblue}>{item.text}</Text>
          <View style={styles.texticon}>
            <Text style={styles.textmar}>{item.date}</Text>
            <View style={styles.rupeestyle}>
              <FontAwesome name='rupee' size={18} color={theme.colors.text} style={styles.fontstyle} />
              <Text style={styles.textrupees}>{item.rupee}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen} >
        <View style={styles.modalView}>
          <TouchableOpacity activeOpacity={0.9}>
            <Text style={styles.textstyle}>Medical</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <Text style={styles.textstyle}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <Text style={styles.textstyle}>Fuel</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <Text style={styles.textstyle}>Others</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setModalOpen(false) }} style={styles.okstyle}>
            <Text style={styles.oktext}>OK</Text>
          </TouchableOpacity>
        </View>

      </Modal>
      <View style={styles.searchinput} >
        <TouchableOpacity style={styles.iconstyle}>
          <AntDesign name='filter' size={25} color={theme.colors.text}
            onPress={() => { setModalOpen(true) }} />
        </TouchableOpacity>

        <View style={{ flex: 0.8 }}>
          <TextInput placeholder='Search'
            onChangeText={text => {
              console.log(text)
              if (text != "") {
                setCurrent(current.filter((item) => item.title.includes(text)))
                console.log(current.filter((item) => item.title.includes(text)));
              }
              else {
                setCurrent(Data)
              }
            }} />
        </View>
      </View>
      <FlatList
        data={current}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false} />

    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: theme.colors.white,
    paddingHorizontal: 14, paddingVertical: 14
  },
  mainView: {
    backgroundColor: "#fff", marginVertical: 10, padding: 5, elevation: 2, marginHorizontal: 22,
    paddingHorizontal: 7,
  },
  imagetype: {
    height: 40, width: 40, borderRadius: 40, alignItems: 'center', justifyContent: 'center'
  },
  imageView: {
    height: 48, width: 48, backgroundColor: '#fff', borderRadius: 40, alignItems: "center", justifyContent: "center",
    elevation: 2, position: 'absolute', left: -27, top: 22
  },
  imagestyle: {
    height: 30, width: 30, resizeMode: "contain", tintColor: theme.colors.white
  },
  textview: {
    flexDirection: "row", justifyContent: "space-between", alignItems: 'center'
  },
  textblood: {
    left: 32, fontSize: 18, color: theme.colors.text, fontWeight: 'bold'
  },
  textapprove: {
    marginVertical: 4, fontSize: 16, color: theme.colors.green, fontWeight: 'bold'
  },
  textblue: {
    left: 32, fontSize: 14, color: theme.colors.text
  },
  textmar: {
    left: 32, marginTop: 12, fontSize: 14, color: theme.colors.text
  },
  textrupees: {
    marginTop: 12, fontSize: 18, color: theme.colors.text
  },
  searchinput: {
    marginHorizontal: 22, elevation: 5, backgroundColor: "#fff", paddingHorizontal: 10, marginVertical: 7,
    flexDirection: "row", alignItems: "center",
  },
  iconstyle: {
    // position: "absolute", right: 0, top: 10, paddingHorizontal: 14,
    right: 0, position: "absolute", paddingHorizontal: 10,
  },
  texticon: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center"
  },
  rupeestyle: {
    flexDirection: "row", alignItems: "center"
  },
  fontstyle: {
    marginTop: 14, right: 4
  },
  modalView: {
    backgroundColor: theme.colors.white,
    marginTop: 170,
    marginHorizontal: 35,
    padding: 10
  },
  okstyle: {
    width: 60, alignSelf: "flex-end", alignItems: "center", justifyContent: "center"
  },
  oktext: {
    color: "#000", fontSize: 16, fontWeight: '600'
  },
  textstyle: {
    color: theme.colors.text, fontSize: 16, fontWeight: '800',marginTop:5
  }

})
