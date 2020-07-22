import 'react-native-gesture-handler';
import { firebase } from './server/firebase/config';
import React, { useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { AuthNavigator } from './src/navigation/AuthScreenNav';
import { HomeNavigator } from './src/navigation/HomeScreenNav';
import { AuthContext } from './src/contexts/AuthContext';
import { decode, encode} from 'base-64';
import { Loading, useConstructor } from './src/components/index';
 

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
  const [user, setUser] = useState(true);

  // useConstructor(() => { // keep at top. runs once, on initial render
  //   console.log('In useConstructor at App.js')
  //   const authSubscription = firebase.auth().onAuthStateChanged((user) => {
  //     setUser(user);  
  //     console.log('Found user. Setting user in App.js.');
  //   })
  //   return () => authSubscription(); 
  // });



  // useEffect(() => { // check auth
  //   const authSubscription = firebase.auth().onAuthStateChanged((user) => {
  //       setUser(user);  
  //       setIsLoading(false);
  //   }).catch(err => { throw new Error(err) });
  //   return () => authSubscription(); 
  // },[]);

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
