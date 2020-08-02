/*
useConstructor is a hook that
performs procedures before a
component is rendered for the
first time (similar to clas component
componentWillMount)
*/
import React, { useState } from 'react';

const useConstructor = (callback) => {
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    if (constructorHasRun) return;
    const clean_up = callback(); 
    if (clean_up) { // unsubscribe, reset states, etc...
        clean_up(); 
    }
    setConstructorHasRun(true);
};

export default useConstructor; 