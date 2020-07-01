import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Platform, PermissionsAndroid, FlatList, Image } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import 

const UploadScreen = props => {
    const [uploadStatus, setUploadStatus] = useState('');
    const [video, setVideo] = useState(null); 
    const [cameraRollData, setCameraRollData] = useState(null);

    const handleLoadCameraRoll = async function () {
        // if (Platform.OS === 'android') { 
        //     const result = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //         {
        //             title: 'Permission Explanation',
        //             message: 'Wavely would like to access your camera roll',
        //         },
        //     );
        //     if (result !== 'granted') { throw(result); return; }    
        // };
        CameraRoll.getPhotos({'assetType': 'Videos'})
        .then(data => console.log(data))
        .catch(e => { throw(e) } ); 
    };        

    const handleSelectVideo = () => { setVideo('x') };
    const handleVideoUpload = () => { setUploadStatus('x') }; 
    return (
        <View>
            <Text>Upload Screen</Text> 
            <View>
                { cameraRollData ? 
                    <FlatList 
                        data={cameraRollData} 
                        numColumns={3} 
                        renderItem={ ({ item }) =>  
                            <Image 
                                style={{width: '33%', height: 150,}} 
                                source={{uri: item.node.image.uri}} 
                            />
                        }
                    /> : null 
                }
            </View> 
            <View>
                <Button title='Select a video' onPress={ handleLoadCameraRoll }/> 
                <Button title='Submit' onPress={() => { console.log('submit')} } /> 
            </View>
    </View>
    );
};
export default UploadScreen;