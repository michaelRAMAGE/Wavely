import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { HeaderContext } from '../../contexts/HeaderContext';

const TranscriptDetailsScreen = ({ navigation, route }) => {
    const { transcriptData } = route.params.data; // data received from transcriptlistitem
    const header = useContext(HeaderContext);
    const isFocused = useIsFocused();
    useEffect(() => { // takes a second to refresh
        if (isFocused) {
            header.setHeader(header.headerSets.set1.header);      
        }
        return () => header.setHeader(header.headerSets.initial.header);  
    },[navigation]);
    return (
        <View style={styles.rootContainer}>
            <View style={styles.content}>
                <Text>Transcript Content Page</Text>
            </View>
            <View>
                <Button title='go back' onPress={() => navigation.navigate('TranscriptList')} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'teal'
    },
    content: {
        flex: 1,
    },
});
export default TranscriptDetailsScreen; 