import React from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';
import button_style from './styles.js';
import Icon from 'react-native-vector-icons/AntDesign';

const SelectButton = (props) => {
    return (
        <TouchableHighlight style={{...button_style.button,...props.buttonStyle}} onPress={props.onTouch}>
            <Icon name={props.icon} size={props.iconSize}>
                <Text style={props.textStyle}>{props.text}</Text>
            </Icon>
        </TouchableHighlight>
    );
}
export default SelectButton; 