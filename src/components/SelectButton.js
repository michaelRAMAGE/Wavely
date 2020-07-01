import React from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const SelectButton = (props) => {
    return (
        <TouchableHighlight style={styles.button} onPress={props.onTouch}>
            <Icon name={props.icon} size={30}>
                <Text>{props.text}</Text>
            </Icon>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
});

export default SelectButton; 