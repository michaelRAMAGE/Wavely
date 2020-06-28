/*
App.js conditional routing will rerender when
its dependent states are updated. 
Passing down state val and state setters from our App.js
root panel to the screens is a bit cumbersome.
Instead, we will use Context to update parent state from 
the children. This is subject to change in the future.  
*/

import React from 'react';
export const AuthContext = React.createContext();
