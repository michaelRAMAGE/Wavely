import React, { useState, useContext } from 'react';
import { View, StyleSheet, Button, Text, } from 'react-native';
import styles from './styles';
import PersistContext from '../../contexts/PersistContext';

export default function Transcripts (props) {
    const setSignOut = useContext(PersistContext);
    const [ transcripts, setTranscripts ] = useState(null);

    return ( 
        <View>
            <Text>Transcripts</Text>
        </View>
    );
};
