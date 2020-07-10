import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TranscriptDetailsScreen = ({ route }) => {
    const { transcriptData } = route.params.data; 
    console.log(route)
    return (
        <View style={styles.rootContainer}>
            <View style={styles.content}>
                <Text>Transcript Content Page</Text>
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