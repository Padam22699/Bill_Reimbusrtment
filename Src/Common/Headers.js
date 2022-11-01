import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import { theme } from "../core/theme";
import Feather from "react-native-vector-icons/Feather"

export const Headers = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
                <Ionicons name={props.backicon} size={35} color="#000" />
            </TouchableOpacity>
            <View>
                <Text style={styles.textstyle}>{props.Text} </Text>
            </View>
            <TouchableOpacity onPress={props.onPress1} activeOpacity={0.5}>
                <Ionicons name={props.notifications} size={35} color="#000" />
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal:14,
    },
    textstyle: {
        color: theme.colors.primary,
        fontWeight: "500"
    }
})