import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = props => {
    return (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.title}</Text>
    </View>  
    );
}
const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: 'gray',
        opacity: .5,
        alignItems: 'center'
    },
    headerTitle: {
        color: 'black',
        fontSize: 20
    }
});

export default Header; 