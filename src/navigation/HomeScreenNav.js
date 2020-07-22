import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    RecordScreen, 
    UploadScreen, 
    SignOutScreen,
    TranscriptDetailScreen,
    TranscriptListScreen } 
from '../screens/index';
import { 
    TranscriptDetailHeader, 
    MainHeader, } 
from '../components/index';
import LogoutIcon from 'react-native-vector-icons/Ionicons'
import RunOutIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const HomeTopNav = new createMaterialTopTabNavigator();
const TranscriptStack = new createStackNavigator(); 
const RecordStack = new createStackNavigator(); 
const UploadStack = new createStackNavigator(); 

export const HomeNavigator = () => {
    return (
        <HomeTopNav.Navigator
            initialRoutName='UploadNav'
            tabBarOptions={{
                labelStyle: { fontSize: 15 },
                tabStyle: { marginTop: 30},
                style: {},
                showIcon: true,
                // showLabel: false

            }}
        >
      
            <HomeTopNav.Screen
                name='TranscriptNav'
                component={TranscriptNav}
                options={{
                    tabBarLabel: 'Files'
                }}
            />
            <HomeTopNav.Screen
                name='RecordNav'
                component={RecordNav}
                options={{
                    tabBarLabel: 'Record'
                }}
            /> 
            <HomeTopNav.Screen
                name='UploadNav'
                component={UploadNav}
                options={{
                    tabBarLabel: 'Upload'
                }}
            />       

            {/* <HomeTopNav.Screen
                name='SignOutNav'
                component={SignOutScreen}
                options={{
                    tabBarLabel: () => { return null },
                    tabBarIcon: () => { return <RunOutIcon size={30} name='exit-run' /> },
                    showIcon: true,
                    
  
                }}
            />                         */}
        </HomeTopNav.Navigator>
    );
}

const TranscriptNav = ({navigation, route}) => { // dynamic page loads
    // console.log('navigation: ', navigation)
    // console.log('route: ', route)
    return (
        <TranscriptStack.Navigator
            initialRoutName='TranscriptList'
            headerMode='screen'
        >
            <TranscriptStack.Screen
                name='TranscriptList'
                component={TranscriptListScreen}
                options={{
                    header: () => {
                        return null;
                    },
                }}
            />
            <TranscriptStack.Screen
                name='TranscriptDetail'
                component={TranscriptDetailScreen}
                options={{
                    header: () => {
                        return (<TranscriptDetailHeader 
                                    title={route.state.routes[1].params.data.name}
                                /> 
                        );
                    },
                }}
            /> 
        </TranscriptStack.Navigator>
    );
}

const RecordNav = ({navigation, route}) => { // dynamic page loads
    // console.log('navigation: ', navigation)
    // console.log('route: ', route)
    return (
        <RecordStack.Navigator
            initialRoutName='Record'
            headerMode='screen'
        >
            <RecordStack.Screen
                name='Record'
                component={RecordScreen}
                options={{
                    header: () => {
                        return null;
                    },
                }}
            /> 
        </RecordStack.Navigator>
    );
}


const UploadNav = ({navigation, route}) => { // dynamic page loads
    // console.log('navigation: ', navigation)
    // console.log('route: ', route)
    return (
        <UploadStack.Navigator
            initialRoutName='Upload'
            headerMode='screen'
        >
            <UploadStack.Screen
                name='Upload'
                component={UploadScreen}
                options={{
                    header: () => {
                        return null;
                    },
                }}
            /> 
        </UploadStack.Navigator>
    );
}





