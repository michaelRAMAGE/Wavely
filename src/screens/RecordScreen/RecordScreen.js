import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import KeywordInput from '../../components/KeywordInput';
import { set } from 'react-native-reanimated';

const RecordScreen = props => {
    const [keyQuery, setKeyQuery] = useState('');    
    return ( 
        <KeywordInput 
            instructionText='Search your audio for these keywords'
            inputPlaceholder="Enter keywords each separated by ','"
            onSubmit={setKeyQuery}
        />
    );
};

const styles = StyleSheet.create({

});


export default RecordScreen;