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

const test_file_info = { 
    type:'video', 
    uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fwavely-e3e07459-e462-4db5-8544-e83bed15870e/ImagePicker/fca89a98-4784-4521-8a66-946cbe89ffbd.mp4',
    width: null, 
    height: null,
    duration: '0.5'
};
const data_captions = { 
    audio_name: 'testing_ui',
    speech_data: [
        {
            transcript: {
                text: 'Hello to you all!',
                time_span: { startSecs: '17', endSecs: '1.5' },
                confidence: .68
            }
        },
        {
            transcript: {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' },
                confidence: .9
            }
        },
        {
            transcript: {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' },
                confidence: .55
            }
        }
    ]
};
const TEST_DATA = [ 
    { // do not rerender on transcript set
        id: Math.random().toString(),
        file_info: test_file_info,
        name: 'test1',
        date: 'monday',
        data: {
            ...data_captions
        }
    },
    { // do not rerender on transcript set
        id: Math.random().toString(),
        file_info: test_file_info,
        name: 'test2',
        date: 'monday',
        data: {
            ...data_captions
        }
    },
    { // do not rerender on transcript set
        id: Math.random().toString(),
        file_info: test_file_info,
        name: 'test3',
        date: 'monday',
        data: {
            ...data_captions
        }
    },
    { // do not rerender on transcript set
        id: Math.random().toString(),
        file_info: test_file_info,
        name: 'test4',
        date: 'monday',
        data: {
            ...data_captions
        }
    },
];

// types 
var file = {  
    uri: null, 
    duration: null,
    width: null,
    height: null,
    type: null 
};
file = {...test_file_info};

var transcript = { 
    id: null,
    file_info: null, 
    name: null,
    date: null,
    data:  {
        audio_name: null, 
        speech_data: []
    }   
};
transcript = {...TEST_DATA}

export const HomeNavigator = () => {
    return (
        <HomeTopNav.Navigator
            initialRouteName='UploadNav'
            tabBarOptions={{
                labelStyle: { fontSize: 15 },
                tabStyle: { marginTop: 30},
                style: {},
                showIcon: true,
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
            <HomeTopNav.Screen
                name='SignOutNav'
                component={SignOutScreen}
                options={{
                    tabBarLabel: () => { return null },
                    tabBarIcon: () => { return <RunOutIcon size={30} name='exit-run' /> },
                    showIcon: true,
                }}
            />                        
        </HomeTopNav.Navigator>
    );
}

const TranscriptNav = ({route}) => { // dynamic page loads
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
            > 
            </UploadStack.Screen>
        </UploadStack.Navigator>
    );
}





