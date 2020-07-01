import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { AuthNavigator } from './src/navigation/AuthScreenNav';
import { HomeNavigator } from './src/navigation/HomeScreenNav';
import { AuthContext } from './src/contexts/AuthContext';
import { decode, encode} from 'base-64';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={setUser}> 
      <NavigationContainer>
        { !loading ? <></> : user ? (
          <HomeNavigator />
        ) : (
          <AuthNavigator /> 
        )}
      </NavigationContainer>        
    </AuthContext.Provider>
  );
};
