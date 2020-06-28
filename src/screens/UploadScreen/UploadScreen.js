import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UploadScreen = props => {
    return ( 
        <View>
            <Text>Upload Screen</Text> 
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


export default UploadScreen;