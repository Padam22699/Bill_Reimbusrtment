import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Image, } from 'react-native'
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Imagepath from '../Assets/Images/Imagepath';
import { theme } from '../core/theme';
import { clearGetBillDetail, getBillDetail } from '../redux/actions/getBillDetailAction'
import {clearReminder, reminder} from '../redux/actions/reminderAction'
import { clearIsPhysicallySubmitted, isPhysicallySubmitted } from '../redux/actions/isPhysicallySubmittedAction'

export default function DetailScreen({ navigation }) {

    const dispatch = useDispatch()
    const routes = useRoute()

    const [userData, setUserData] = useState(null)
    const [billDetail, setBillDetail] = useState(null)
    const [checkbook, setcheckbook] = useState(false)

    const getBillDetailResponse = useSelector(state => state.getBillDetailReducer.data)
    const physicalSubmitResponse = useSelector(state => state.isPhysicallySubmittedReducer.data)
    const reminderResponse = useSelector(state => state.reminderReducer.data)
    const loading = useSelector(state => state.getBillDetailReducer.loading)

    useFocusEffect(
        useCallback(() => {
            getData()
        }, [])
    )

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_data')
            console.log("value", value)
            if (value !== null) {
                const data = JSON.parse(value)
                if (data != null) {
                    setUserData(data)
                } else {
                    setUserData(null)
                }
            } else {
                setUserData(null)
            }
        } catch (e) {
            console.log("storage error", e)
        }
    }

    useEffect(() => {
        if (userData != null) {
            fetchBillDetail()
        }
    }, [userData])

    const fetchBillDetail = () => {
        let request = {
            "user_id": userData.user_id,
            "bill_id": routes.params.bill_id,
            "type": "employee"
        }
        dispatch(getBillDetail(request))
    }

    useEffect(() => {
        if (getBillDetailResponse != null) {
            console.log("getBillDetailResponse", getBillDetailResponse)
            if (Object.keys(getBillDetailResponse).length != 0 && getBillDetailResponse.statusCode != 200) {
                alert(getBillDetailResponse.message)
                dispatch(clearGetBillDetail())
            }
            if (Object.keys(getBillDetailResponse).length != 0 && getBillDetailResponse.statusCode == 200) {
                console.log("response", getBillDetailResponse)
                setBillDetail(getBillDetailResponse.data[0])
                dispatch(clearGetBillDetail())
            }
        }
    }, [getBillDetailResponse])

    const icon = (type) => {
        switch (type) {
            case "Medical": {
                return Imagepath.medicine
            }
            case "Fuel": {
                return Imagepath.Fuel
            }
            case "Food": {
                return Imagepath.foodfork
            }
            case "Others": {
                return Imagepath.Others
            }
            default: {
                return Imagepath.Others
            }
        }
    }

    const handlePhysicallySubmit = (submitted) => {
        let request = {
            "user_id": userData.user_id,
            "bill_id": routes.params.bill_id,
            "is_phy_submitted": submitted
        }
        dispatch(isPhysicallySubmitted(request))
    }

    useEffect(() => {
        if (physicalSubmitResponse != null) {
            console.log("physicalSubmitResponse", physicalSubmitResponse)
            if (Object.keys(physicalSubmitResponse).length != 0 && physicalSubmitResponse.statusCode != 200) {
                alert(physicalSubmitResponse.message)
                dispatch(clearIsPhysicallySubmitted())
            }
            if (Object.keys(physicalSubmitResponse).length != 0 && physicalSubmitResponse.statusCode == 200) {
                console.log("response", physicalSubmitResponse)
                alert(physicalSubmitResponse.message)
                dispatch(clearIsPhysicallySubmitted())
            }
        }
    }, [physicalSubmitResponse])

    useEffect(() => {
        if (userData != null) {
            handlePhysicallySubmit(checkbook)
        }
    }, [checkbook])

    const sendReminder = () => {
        let request = {
            "user_id": userData.user_id,
            "bill_id": routes.params.bill_id,
            "message": "Your bill still to be approve."
        }
        dispatch(reminder(request))
    }

    useEffect(() => {
        if (reminderResponse != null) {
            console.log("reminderResponse", reminderResponse)
            if (Object.keys(reminderResponse).length != 0 && reminderResponse.statusCode != 200) {
                alert(reminderResponse.message)
                dispatch(clearReminder())
            }
            if (Object.keys(reminderResponse).length != 0 && reminderResponse.statusCode == 200) {
                console.log("response", reminderResponse)
                alert(reminderResponse.message)
                dispatch(clearReminder())
            }
        }
    }, [reminderResponse])

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
                            <Image source={billDetail != null ? icon(billDetail.type) : Imagepath.Fuel} style={styles.imagestyle} />
                        </TouchableOpacity>
                        <View style={styles.fonticon}>
                            <FontAwesome name='rupee' size={18} color={theme.colors.white} style={{ top: 5 }} />
                            <View>
                                <Text style={styles.textrupees}>{billDetail != null ? billDetail.amount : null}</Text>
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
                                <Text style={styles.textmar}>{billDetail != null ? moment(billDetail.date).format("MMM DD, yyyy") : null}</Text>
                            </View>
                            <View style={styles.flexview}>
                                <Text style={styles.textdate}>Description</Text>
                                <Text style={styles.textfuel}>{billDetail != null ? billDetail.description : null}</Text>
                            </View>
                            <View style={styles.flexview}>
                                <Text style={styles.textdate}>Attachment</Text>
                                <Image source={billDetail != null ? { uri: billDetail.bill_attachment } : Imagepath.Fuel} style={{ height: 25, width: 25, resizeMode: "contain" }} />
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
                                    <Image source={checkbook ? Imagepath.check : Imagepath} style={styles.imageCheck} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {checkbook &&
                            <TouchableOpacity onPress={sendReminder} activeOpacity={0.9}>
                                <Text style={styles.textstyle}>
                                    Add Reminder
                                </Text>
                            </TouchableOpacity>
                        }

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
        fontSize: 16, color: theme.colors.text, flex: 0.9, textAlign: "right"
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
        fontSize: 16, color: theme.colors.text, textAlign: 'right'
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
