import React from 'react';
import { firebase } from '../../server/firebase/config';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen } from '../screens/index';

export const AuthNavigator = () => {
    const AuthStack = new createStackNavigator();

    // firebase // set login persistence
    // .auth()
    // .setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Can I set this here?
    return (
        <AuthStack.Navigator> 
            <>
                <AuthStack.Screen name="Login" component={LoginScreen} /> 
                <AuthStack.Screen name="Register" component={RegisterScreen} />    
            </>
        </AuthStack.Navigator>
    );
}; 
