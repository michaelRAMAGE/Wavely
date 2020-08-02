import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OptionIcon from 'react-native-vector-icons/SimpleLineIcons' // options
import DrawerButton from '../buttons/DrawerButton';

const MainHeader = (props) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftSide}>
                <DrawerButton />
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
    headerContainer: {
        // backgroundColor: 'blue',
        flexDirection: 'row',
        backgroundColor: 'white'
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

export default MainHeader; 