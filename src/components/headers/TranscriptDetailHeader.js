import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackIcon from 'react-native-vector-icons/AntDesign' // arrow-back-circle
import OptionIcon from 'react-native-vector-icons/SimpleLineIcons' // options

const TranscriptPageHeader = (props) => {
    // header
    // back button
    // title
    // export option
        // email
        // google docs
        // ...more
        console.log('name: ', props)
    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftSide}>
                <BackIcon.Button 
                    size={20}
                    backgroundColor='black'
                    name='fastbackward' 
                    backgroundColor="#3b5998"
                    onPress={props.backPress}
                />
            </View>
            <View style={styles.middleSide}>
                <Text>{props.name}</Text>
            </View>
            <View style={styles.rightSide}>
                <OptionIcon.Button 
                        size={20}
                        backgroundColor='black'
                        name='options'
                        backgroundColor="#3b5998"
                        onPress={props.optionPress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    headerContainer: {
        // backgroundColor: 'blue',
        flexDirection: 'row',
        marginTop: 25
    },
    leftSide: {
        flex: .2,
        // backgroundColor: 'white' 
    },
    middleSide: {
        flex: .6,
        // backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightSide: {
        flex: .2,
        // backgroundColor: 'orange'
    },
});

export default TranscriptPageHeader; 