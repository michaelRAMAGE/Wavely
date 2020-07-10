import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const KeywordInput = props => {
    const [keywords, setKeywords] = useState('');

    return ( 
        <View style={styles.keywordInputContainer}>
            <Text style={styles.textInput}> {props.instructionText} </Text>
            <View style={styles.keywordInput}>
                <TextInput 
                    placeholder={props.inputPlaceholder} 
                    onChangeText={text => setKeywords(text)} 
                    value={keywords}
                />
            </View>
            <View style={styles.buttonInputContainer}>
                <Button title='Clear' onPress={() => setKeywords('') } /> 
                <Button title='Submit'onPress={() => { props.onSubmit(keywords); setKeywords('') }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    keywordInputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 17,
        textAlign: 'center'
    },
    keywordInput: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        maxWidth: '80%'
    },
    buttonInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10
    }
});

export default KeywordInput; 