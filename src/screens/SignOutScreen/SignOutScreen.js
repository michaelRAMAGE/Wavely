import { signout_user } from '../../../server/firebase/functions/index';
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Button, Text, Modal } from 'react-native';
import { AuthContext } from '../../components/contexts/AuthContext';

// Things to do: 
// Add this to drawer content inside homewscreen nav

export default function SignOutScreen ({navigation}) {
    const setUser = useContext(AuthContext); 

    const handleSignOut = (confirm) => {
        if (confirm) {
            signout_user();
            setUser(null); 
        }
    }
    
    return ( 
        <View style={styles.rootContainer}>
            {/* <Modal 
                animationType='slide'
                transparent={false}
                visible={signOut}
                onRequestClose={() => { navigation.navigate('Upload') }} 
            > */}
                <View style={styles.decisionContainer}> 
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
                        Are you sure you want to sign out?
                    </Text>
                    <View style={styles.buttonContainer}> 
                        <Button color='#788eec' title='Yes' onPress={() => handleSignOut(1)} />
                        <Button color='#788eec' title='No' onPress={() => handleSignOut(0)} />
                    </View>
                </View>
            {/* </Modal> */}
        </View>
    );
};
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 10,
    },
    decisionContainer: {
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 10,
    }
});
