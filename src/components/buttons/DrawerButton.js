
/* 
This button is used in HomeNavigator's Stack Navigation header.
It opens and closes the drawer navigator (using the drawer's state). 
*/
import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation, DrawerActions, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

const DrawerButton = () => { // open drawer navigation
    const [isOpen, setIsOpen] = useState(false)
    // const route = useRoute(); 
    // // console.log('STATE: ', route.state, ':END')
    // if (route.state) {
    //     // console.log('HISTORY: ', route.state.history, ':END')
    //     console.log('ROUTES: ', route.state.routes, ':END') 
    //     // where the value is updated for visit screen
    //     // it gets its own route object --> the deep stack is now in sight
    //     // .state.route pattern for nesting, recursion works 
    //     // route.state.routes[1].state.routes.length === 2 ?
    // }
    const navigation = useNavigation(); // how does this work under the hood?
    console.log('Navigation: ', navigation)
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
export default DrawerButton; 