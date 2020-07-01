import React, { useState, useContext } from 'react';
import { Transcripts, RecordScreen, UploadScreen } from '../screens/index';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AuthNavigator } from './src/navigation/AuthScreenNav';
import { PersistContext } from '../contexts/PersistContext';

/* { props => { <HomeScreen {...props} extraData={user} /> } }
</Home.Screen> */ // not sure what this did but it triggers error

const Home = createMaterialTopTabNavigator();
export const HomeNavigator = (props) => {
    const [ signOut, setSignOut ] = useState(null);
    return (
        <PersistContext.Provider value={setSignOut}>
        {
            signOut ? 
            (<AuthNavigator />) 
            :
            (<Home.Navigator style={{paddingTop:30}}> 
                <Home.Screen name="Transcripts" component={Transcripts} />
                <Home.Screen name="Upload" component={UploadScreen} />
                {/* <Home.Screen name="Record" component={RecordScreen} /> */}
            </Home.Navigator>)
        }   
        </PersistContext.Provider>
    );
}; 
