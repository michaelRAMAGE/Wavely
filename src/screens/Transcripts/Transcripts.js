import React, { useState, useContext } from 'react';
import { View, StyleSheet, Button, Text, } from 'react-native';
import styles from './styles';
import { AuthContext } from '../../contexts/AuthContext';

export default function Transcripts () {
    const setUser = useContext(AuthContext);

    const [ transcripts, setTranscripts ] = useState(null);
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         console.log(user)
    //     }
    // })
    return ( 
        <View>
            <Text>Transcripts</Text>
        </View>
    );
};
