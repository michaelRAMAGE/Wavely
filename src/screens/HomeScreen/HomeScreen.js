import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, } from 'react-native';

export default function HomeScreen (props) {
    return ( 
        <View>
            <Text>Home Screen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'yellow',
        padding: 10
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0

    }
});
