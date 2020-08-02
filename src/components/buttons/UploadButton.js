import React from 'react';
import button_style from './styles.js';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UploadButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onTouch}>
            <View style={{...button_style.button,...props.buttonStyle}}> 
                <Text style={{...styles.buttonText,...props.textStyle}}>
                    {props.text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonText: {
        color: 'black',
        fontSize: 20,
    },
});
export default UploadButton; 