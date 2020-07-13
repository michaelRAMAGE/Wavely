import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';

const TranscriptDetailsScreen = ({ navigation, route }) => {
    const { transcriptData } = route.params.data; 
    return (
        <View style={styles.rootContainer}>
            <View style={styles.content}>
                <Text>Transcript Content Page</Text>
            </View>
            <View><Button title='go back' onPress={() => navigation.navigate('TranscriptList')} /></View>
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