import 'react-native-gesture-handler';
import { firebase } from './server/firebase/config';
import React, { useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { AuthNavigator } from './src/navigation/AuthScreenNav';
import { HomeNavigator } from './src/navigation/HomeScreenNav';
import { AuthContext } from './src/components/contexts/AuthContext';
import { decode, encode} from 'base-64';
import { useConstructor } from './src/components/index';
import{ YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

// Move on auth state changed out 

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


export default function App() {
  const [user, setUser] = useState<firebase.auth.User | null>(null);

  // 1. test if user is already logged in 

  useConstructor(() => { // keep at top. runs once, on initial render
    console.log('In useConstructor at App.js')
    const authSubscription = firebase.auth().onAuthStateChanged((user_in: firebase.auth.User) => {
      setUser(user_in);  
      console.log('Found user. Setting user in App.js.');
    })
    return () => authSubscription(); 
  });

  return ( 
    <AuthContext.Provider value={setUser}> 
      <NavigationContainer>
        { user ? (
          <HomeNavigator />
        ) : (
          <AuthNavigator /> 
        )}
      </NavigationContainer>        
    </AuthContext.Provider>
  );
};
