/*
useTitle gives a list component's
name to its header component, or any 
other component that needs the currently
focused list element. 
*/
import React, { useState, useEffect } from 'react';

const useTitle = (name) => {
    const [title, setTitle] = useState(null);
    useEffect(() => {
        name ? setTitle(name) : () => { return title; }
        console.log('name: ', name)
        return () => { setTitle(null); }
    },[name])

};

export default useTitle; 