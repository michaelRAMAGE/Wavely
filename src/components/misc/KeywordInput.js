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
                <Button color='black' title='Clear' onPress={() => setKeywords('') } /> 
                <Button color='black' title='Submit' 
                    onPress={() => { 
                        if (keywords) { 
                            props.onSubmit(keywords); 
                            setKeywords('');
                        }
                        else { 
                            props.onSubmit(`Untitled_${Date.now()}`);
                        }
                    }}
                />
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
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    keywordInputContainer: {

    },
    buttonInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    keywordInput: {
        borderWidth: 1
    }
});

export default KeywordInput; 