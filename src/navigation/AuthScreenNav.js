import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen } from '../screens/index';

export const AuthNavigator = () => {
    const AuthStack = new createStackNavigator();
    return (
        <AuthStack.Navigator> 
            <>
                <AuthStack.Screen name="Login" component={LoginScreen} /> 
                <AuthStack.Screen name="Register" component={RegisterScreen} />    
            </>
        </AuthStack.Navigator>
    );
}; 
