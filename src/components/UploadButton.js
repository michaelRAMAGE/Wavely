import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UploadButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onTouch}>
            <View style={styles.button}> 
                <Text style={styles.buttonText}>
                    {props.text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#788eec',
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 20
    },
});
export default UploadButton; 