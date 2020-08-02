import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Modal } from 'react-native';

/**
 * @description A loading Modal used for components that have loading states
 * @param {Boolean} props.visible - A state variable that controls when loading modal
 * should be displayed  
 * @param {Boolean} props.transparent - (Optional) Make loading modal transparent
 * @param {visible} props.onClose - (Optional) When backing out of loading modal 
 * before props.visible is set to False, handle what should happen. 
 */
const Loading = props => {
    const [keywords, setKeywords] = useState('');
    return ( 
        <Modal // loading
            animationType='slide'
            transparent={props.transparent !== null? props.transparent : false}
            visible={props.visible}
            onRequestClose={props.onClose !== null ? props.onClose : alert('Closing modal')}
        >
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}> 
                <Text size={40}>Processing request</Text>
                <ActivityIndicator size={40}/>
            </View>
        </Modal>
    );
};
export default Loading; 