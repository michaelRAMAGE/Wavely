import React, { useState, useEffect } from 'react';
import { Dimensions, View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { 
    RecordScreen, 
    UploadScreen, 
    SignOutScreen,
    TranscriptDetailScreen,
    TranscriptListScreen } 
from '../screens/index';
import TranscriptDetailHeader from '../components/headers/TranscriptDetailHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, DrawerActions, useRoute } from '@react-navigation/native';
import TranscriptPageHeader from '../components/headers/TranscriptDetailHeader';

    // Structure
        // top navigator (STACK) - HomeNav
        // middle navigator (DRAWER) - DrawerNav
        // final navigator (STACK) - TranscriptNav

        // HomeNav has 1 screen component
            // DrawerNav
        // DrawerNav has 4 screen components
            // Record
            // Upload 
            // Transcripts
            // SignOut
        // TranscriptNav has 2 components
            // TranscriptList
            // TranscriptDetails
    // Goal
        // The goal is to conditionally set
        // header for all screens under HomeNav.
        // In my case, I want to set TranscriptDetails
        // to a different header and the rest of the 
        // screens can use the same header. This is subject
        // change though, so I want to maintain good practice and
        // have flexibility (do not want a hardcoded solution
        // that is hard to maintain). I am not sure of the best way
        // to approach this. 
        // I know some ways to solve what I am doing.
            // 1. I can just embed the header components
            // in their correct screens and style each
            // respectively. This is not really a bad
            // solution (I do not think), but I would need
            // to update each page's style. I would need
            // a common page template for each page so that
            // the header height and such remains consistent
            // across screens. After this, I could just drop
            // headers into whatever screens I want and their
            // would already be styling setup to control the 
            // presentation. This solution would be robust insofar
            // that an update in hooks by react native would not
            // affect my solution. I am not depending on hook properties.
            // I am not sure this is a big issue, but I read on useNavigationState,
            // and they mention properties to be deprecated. 
            // 2. I can use an existing hook and create some hook,
            // where I return a header based on page state. This is
            // kind of what I am doing now. I WANT to use HomeNav stack
            // to render headers for current screen. This way I do not 
            // need to style each page. Because HomeNav is stack, it has
            // options property which in turn has a property header, where
            // a custom header can be rendered. I want to conditionally 
            // render headers here. When I say existing hook, there may
            // also be a way to do it with just navigation and route
            // properties of root screen component; I have not looked into 
            // that yet. I personally feel like I would learn more about 
            // from using an approach like this

const HomeDrawer = createDrawerNavigator();
const HomeStack = new createStackNavigator();
const TranscriptStack = new createStackNavigator(); // handle page loads

const { height, width } = Dimensions.get('screen'); 

/*
This is a custom hook to change header state in main stack navigator
based on current page.
*/
const useHeader = sets => { // header set, page set
    const [isSet, setSet] = useState(null);
    const route = useRoute();

    const current_screen = null;

    return isSet;
}


/* 
This button is used in HomeNavigator's Stack Navigation header.
It opens and closes the drawer navigator (using the drawer's state). 
*/
const DrawerButton = (navigation) => { // open drawer navigation
    const [isOpen, setIsOpen] = useState(false)
    const route = useRoute(); 
    // console.log('STATE: ', route.state, ':END')
    if (route.state) {
        // console.log('HISTORY: ', route.state.history, ':END')
        console.log('ROUTES: ', route.state.routes, ':END') 
        // route.state.routes[1].state.routes.length === 2 ?
    }

    // where the value is updated for visit screen
    // it gets its own route object --> the deep stack is now in sight
    const navigation = useNavigation(); // how does this work under the hood?
    // console.log(navigation)
    return (
        <View style={{marginLeft: 5}}>
            <Icon.Button 
                size={25}
                name={isOpen ? 'menufold' : 'menuunfold' } 
                backgroundColor="#3b5998"
                onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); setIsOpen(!isOpen) }} 
            />
        </View>
    )
}

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
                    header: ({ scene, previous, navigation }) => {
                        return ( 
                            <View style={{}}>
                                <TranscriptDetailHeader
                                    backPress={() => { navigation.navigate('TranscriptList')}}
                                    optionPress={() => { alert('Open up options modal' )}}
                                />
                            </View>
                        );
                    },
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
    // console.log('Stack navigation prop: ', navigation)
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
    return ( 
        <HomeStack.Navigator 
        screenOptions={{
            headerStyle: {
                backgroundColor: 'white',
            }
        }}>
            <HomeStack.Screen 
                name='Wavely' 
                options={{ 
                    header: ({navigation, route}) => {
                        const sets = { // each key is a page set for a given header
                            set1: {
                                pages: ['Upload', 'Record', 'SignOut', 'TranscriptList'],
                                header: () => { <TranscriptPageHeader {...this.props} /> }, 
                                props: {}
                            },
                            set2: {
                                page: ['TranscriptDetail'],
                                header: () => { <DrawerButton {...this.props} /> },
                                props: {}
                            }
                        }
                        // var headerState = useHeader(sets); 
                        return <DrawerButton />;

                    },
                    // headerLeft: () => ( // all drawer screens inherit 
                    //     <DrawerButton /> // will this rerender everytime it is called?
                    // ),
                    title: 'Wavely'
                }}
                component={ HomeDrawerNav }
            />
        </HomeStack.Navigator> 
    );
}; 
