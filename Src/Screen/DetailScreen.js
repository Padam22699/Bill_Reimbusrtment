import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Image, } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Imagepath from '../Assets/Images/Imagepath';
import { theme } from '../core/theme';
import LinearGradient from 'react-native-linear-gradient';


export default function DetailScreen({ navigation }) {
    const [checkbook, setcheckbook] = useState(false)

    return (

        <View style={styles.container}>
            <Animatable.View animation="zoomInDown" style={{ transform: "scale" }}>
                <StatusBar
                    backgroundColor={theme.colors.primary}
                    barStyle='default' />
                <View style={styles.mainview}>
                    <TouchableOpacity onPress={() => { navigation.goBack('Current') }} activeOpacity={0.9} >
                        <AntDesign name='close' size={25} color={'#fff'} style={{ alignSelf: "flex-end" }} />
                    </TouchableOpacity>
                    <View style={styles.touchablview}>
                        <TouchableOpacity style={styles.imagetouchabl} activeOpacity={0.9} >
                            <Image source={Imagepath.Fuel} style={styles.imagestyle} />
                        </TouchableOpacity>
                        <View style={styles.fonticon}>
                            <FontAwesome name='rupee' size={18} color={theme.colors.white} style={{ top: 5 }} />
                            <View>
                                <Text style={styles.textrupees}>1550.00</Text>
                                <>
                                    <Text style={styles.textfuelthe}>The Fuel</Text>
                                </>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.container2}>

                    <View style={styles.elevationstyle}>
                        <Text style={styles.textExpe}>Expense Details</Text>

                        <View>
                            <View style={styles.flexview}>
                                <Text style={styles.textdate}>Date</Text>
                                <Text style={styles.textmar}>Mar 27,2022</Text>
                            </View>
                            <View style={styles.flexview}>
                                <Text style={styles.textdate}>Description</Text>
                                <Text style={styles.textfuel}>This is a reimbursement applied for the fuel.</Text>
                            </View>
                            <View style={styles.flexview}>
                                <Text style={styles.textdate}>Attachment</Text>
                                <Image source={Imagepath.Fuel} style={{ height: 25, width: 25, resizeMode: "contain", tintColor: theme.colors.primary }} />
                            </View>
                            <View style={styles.flexview}>
                                <Text style={styles.textdate}>Status</Text>
                                <View style={styles.flexapproved}>
                                    <Text style={styles.Approved}>Approved </Text>
                                    <Text style={styles.Declined}>Declined</Text>
                                </View>
                            </View>
                            <View style={styles.flexview}>
                                <Text style={styles.textdate}>Physically submitted the bill</Text>
                                <TouchableOpacity style={styles.imagetouchstyle} onPress={() => { setcheckbook(!checkbook) }} activeOpacity={0.9} >
                                    <Image source={checkbook ? Imagepath .check: Imagepath} style={styles.imageCheck} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {checkbook &&
                            <TouchableOpacity onPress={() => navigation.navigate('Current')} activeOpacity={0.9}>
                                <Text style={styles.textstyle}>
                                    Add Reminder
                                </Text>
                            </TouchableOpacity>
                        }
                        {/* <View style={{ marginTop: 30, marginHorizontal: 30 }}>
                            <TouchableOpacity mode="contained" onPress={() => navigation.navigate('Current')} activeOpacity={0.9}>
                                <LinearGradient colors={["#7426f2", '#3d0891']} style={styles.touchabltext}>
                                    <Text style={styles.textstyle}>
                                    Submitted
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View> */}

                        {/* <View style={styles.button}>
                            <Button mode="contained" onPress={() => navigation.navigate('Current')} >
                                Sending Reminder
                            </Button>
                        </View> */}

                    </View>
                </View>

            </Animatable.View >
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff",
    },
    mainview: {
        backgroundColor: theme.colors.primary, height: 135, paddingHorizontal: 18, paddingVertical: 8, borderBottomLeftRadius: 16, borderBottomRightRadius: 16
    },
    touchablview: {
        flexDirection: "row", alignItems: "center"
    },
    imagetouchabl: {
        height: 80, width: 80, borderRadius: 60, backgroundColor: theme.colors.white, alignItems: 'center', justifyContent: 'center'
    },
    imagestyle: {
        height: 50, width: 50, tintColor: theme.colors.primary, resizeMode: "contain"
    },
    textrupees: {
        fontSize: 18, color: theme.colors.white, fontWeight: 'bold', left: 2
    },
    textfuelthe: {
        fontSize: 16, color: theme.colors.white,
    },
    textfuel: {
        fontSize: 16, color: theme.colors.text, flex: 0.9, textAlign: "center", top: 9, left: 12
    },
    container2: {
        marginHorizontal: 18, marginVertical: 40
    },
    imagetouchstyle: {
        height: 24, width: 24, backgroundColor: '#fff', borderWidth: 1, alignItems: "center", justifyContent: "center"
    },
    imageCheck: {
        height: 20, width: 20, resizeMode: "contain", tintColor: theme.colors.text
    },
    elevationstyle: {
        height: 450, backgroundColor: '#fff', marginTop: 24, elevation: 10, borderRadius: 16, paddingHorizontal: 14, padding: 14
    },
    textExpe: {
        fontSize: 18, fontWeight: 'bold', color: theme.colors.text
    },
    flexview: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 14, paddingVertical: 2
    },
    textdate: {
        fontSize: 18, color: theme.colors.text,
    },
    textmar: {
        fontSize: 16, color: theme.colors.text
    },
    flexapproved: {
        flexDirection: 'row', alignItems: "center"
    },
    Approved: {
        color: theme.colors.green, fontSize: 16, fontWeight: '500'
    },
    Declined: {
        color: 'red', fontSize: 16, fontWeight: '500'
    },
    fonticon: {
        flexDirection: "row", left: 15
    },
    button: {
        marginVertical: 25, marginHorizontal: 30
    },
    touchabltext: {
        height: 45, justifyContent: 'center', borderRadius: 7, alignItems: 'center', justifyContent: 'center'
    },
    textstyle: {
        fontSize: 18, color: theme.colors.primary
    },

})
