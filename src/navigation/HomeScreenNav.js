import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, RecordScreen, RegisterScreen, UploadScreen } from '../screens/index';

/* { props => { <HomeScreen {...props} extraData={user} /> } }
</HomeStack.Screen> */ // not sure what this did but it triggers error

export const HomeNavigator = () => {
    const HomeStack = new createStackNavigator();
    return (
        <HomeStack.Navigator> 
            <HomeStack.Screen name="Home" component={HomeScreen} />
        </HomeStack.Navigator>
    );
}; 
