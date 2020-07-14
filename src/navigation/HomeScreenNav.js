import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    RecordScreen, 
    UploadScreen, 
    SignOutScreen,
    TranscriptDetailScreen,
    TranscriptListScreen } 
from '../screens/index';
import TranscriptDetailHeader from '../components/headers/TranscriptDetailHeader';
import MainHeader from '../components/headers/MainHeader';
import { HeaderContext } from '../contexts/HeaderContext';

const HomeDrawer = createDrawerNavigator();
const HomeStack = new createStackNavigator();
const TranscriptStack = new createStackNavigator(); // handle page loads

const { height, width } = Dimensions.get('screen'); 
/* 
TranscriptNav is a component in HomeDrawerNav; it uses stack navigation 
to handle the TranscriptList page, where transcriptsare listed. 
When a user clicks on an item in the list, they are directed to a 
TranscriptDetails page, which is dynamically determined.
*/
const TranscriptNav = ({navigation}) => { // dynamic page loads
    return (
        <TranscriptStack.Navigator
            initialRoutName='TranscriptList'
            headerMode='screen'
        >
            <TranscriptStack.Screen
                name='TranscriptList'
                component={TranscriptListScreen}
            />
            <TranscriptStack.Screen
                name='TranscriptDetail'
                component={TranscriptDetailScreen}
                
                options={{
                    // header: ({ scene, previous, navigation }) => {
                    //     return ( 
                    //         <View style={{}}>
                    //             <TranscriptDetailHeader
                    //                 backPress={() => { navigation.navigate('TranscriptList')}}
                    //                 optionPress={() => { alert('Open up options modal' )}}
                    //             />
                    //         </View>
                    //     );
                    // },
                }}
            /> 
        </TranscriptStack.Navigator>
    );
}

/* 
Note: HomeDrawerNav is now HomeNavigator.
HomeDrawerNav is a component in HomeNavigator; it controls
page navigation and user session options, like log out.
*/
const HomeDrawerNav = () => {
    const { height, width } = Dimensions.get('screen'); // this should update on every render
    return (
        <HomeDrawer.Navigator 
            // drawerContent={props => { console.log('props: ', props)}}
            name='Drawer'
            drawerType='slide' 
            initialRoutName={UploadScreen} 
            drawerStyle={{backgroundColor: 'white', width: width/2}}
            screenOptions={{}}
            backBehavior='history'
            edgeWidth={width/2}
            sceneContainerStyle={{backgroundColor: 'silver'}} // styles all screens
            screenOptions={{}} // styling for screens
            > 
                <HomeDrawer.Screen name="Upload" component={UploadScreen} options={{drawerLabel: 'Upload'}} />
                <HomeDrawer.Screen name="Transcripts" component={TranscriptNav} options={{drawerLabel: 'Transcripts'}}/>
                <HomeDrawer.Screen name="Record" component={RecordScreen} options={{drawerLabel: 'Record'}}/>
                <HomeDrawer.Screen name="SignOut" component={SignOutScreen} options={{drawerLabel: 'Sign Out'}}/>
        </HomeDrawer.Navigator>
    );
}

/*
Note: This is not used now. The stack was used merely for a header,
but that is not good practice and there are better solutions. This
might work if I spend time learning how to override this parent stack.

Alternatives:
    - HeaderSwitcher -- 
        specify page sets, where different sets
        have differing headers.
        when a page is visited, its corresponding header is used. 
        For now, I need two pages sets. 
    - Hardcode differing headers into the screens.
    - Create stack nav for sets
    - Figure out how to do it with the code below.


HomeNavigator is responsible for page permissions for valid users.
AuthNavigator in src/navigation/AuthScreenNav.js is its antithesis.
*/
export const HomeNavigator = () => {  
    var headerSets = { // each key is a page set for a given header
        initial: {
            pages: ['Upload', 'Record', 'SignOut', 'TranscriptList'],
            header: () => { return (<MainHeader />); },
        },
        set1: {
            page: ['TranscriptDetail'],
            header: () => { return (<TranscriptDetailHeader /> ) }, 
        },
    };
    const [head, setHead] = useState(headerSets.initial.header);
    return ( 
        <HeaderContext.Provider value={{setHeader: setHead, headerSets: headerSets}}> 
            <HomeStack.Navigator>
                <HomeStack.Screen 
                    name='Wavely' 
                    options={{ 
                        header: () => { return head },
                        title: 'Wavely'
                    }}
                    component={HomeDrawerNav}
                />
            </HomeStack.Navigator> 
        </HeaderContext.Provider>
    );
}; 
