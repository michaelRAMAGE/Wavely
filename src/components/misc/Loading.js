import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Modal } from 'react-native';

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