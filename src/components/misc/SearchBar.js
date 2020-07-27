import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import SearchIcon from 'react-native-vector-icons/Feather'; 
import ResetIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = (props) => {
    const [value, onChangeText] = useState('');

    return (
        <View style={styles.rootContainer}>
            <TouchableHighlight 
                style={styles.submitSpace} 
                underlayColor='transparent'
                onPress={() => { props.onSubmit([]); onChangeText(''); }}
            >
                <View>
                    <ResetIcon name='restore' size={30} />
                </View>
            </TouchableHighlight>
            <View style={styles.searchSpace}>
                <TextInput
                    style={styles.textStyle}
                    placeholder='Enter keywords separated by commas...'
                    placeholderTextColor='black'
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
            </View>
            <TouchableHighlight 
                style={styles.submitSpace} 
                underlayColor='transparent'
                onPress={() => { props.onSubmit(value); onChangeText(''); }}
            >
                <View>
                    <SearchIcon name='search' size={30} />
                </View>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    searchSpace: {
        flex: .9,
    },
    submitSpace: {
        flex: .1,
    },
    textStyle: {
        flex: 1, 
    },
});


export default SearchBar;