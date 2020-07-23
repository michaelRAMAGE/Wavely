import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
import { useTitle } from '../misc/useTitle'; 
import BackIcon from 'react-native-vector-icons/AntDesign' // arrow-back-circle
import OptionIcon from 'react-native-vector-icons/SimpleLineIcons' // options
import { useNavigation } from '@react-navigation/native';

const TranscriptPageHeader = (props) => {
    const navigation = useNavigation(); // use TranscriptStackNav navigation prop
    console.log(props.title)
    return (
        <View style={styles.headerContainer}>
        {/* <> */}
            <View style={styles.leftSide} >
                <TouchableHighlight 
                    style={styles.leftSideButton} 
                    underlayColor='transparent'
                    onPress={() => navigation.navigate('TranscriptList')}
                >
                    <View>
                        <BackIcon 
                            name='fastbackward' 
                            size={30} 
                        />
                        <Text>Back</Text>
                    </View>
                </TouchableHighlight>
            </View>

            <View style={styles.middleSide}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.rightSide}>
                <TouchableHighlight 
                    style={styles.rightSideButton} 
                    underlayColor='transparent'
                    onPress={() => {alert('Open up options modal')}}
                >
                    <View>
                        <OptionIcon name='options' size={30} />
                        <Text>More</Text>
                    </View>
                    
                </TouchableHighlight>
            </View>
            {/* </> */}
        </View>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        padding: 0,
        backgroundColor: 'white'
    },
    leftSide: {
        alignItems: 'flex-start',
        flex: .2,
        // backgroundColor: 'green',
    },
    middleSide: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: .6,
        // backgroundColor: 'orange'
    },
    rightSide: {
        alignItems: 'flex-end',
        flex: .2,
        // backgroundColor: 'pink',
    },
    leftSideButton: {
        marginLeft: 10
    },
    rightSideButton: {
        marginRight: 10
    },
    title: {
        fontSize: 20
    }
});

export default TranscriptPageHeader; 