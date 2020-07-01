import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Platform, PermissionsAndroid, FlatList, Image, SafeAreaView } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

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
        //     console.log(result);
            // if (result !== 'granted') { throw(result); return; }    
        // };
        // CameraRoll.getPhotos({'assetType': 'Videos'})
        // .then(data => console.log(data))
        // .catch(e => { throw(e) } ); 
        console.log('good')
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') { 
            console.log('Camera roll permission granted!')
            const cameraRollVideos = await MediaLibrary.getAssetsAsync({'mediaType': 'video'});
            console.log(cameraRollVideos.totalCount)
            setCameraRollData([cameraRollVideos.assets[0]])
        } else {
            throw new Error('Camera roll permission not granted ):');
        }
    };        
    const handleSelectVideo = () => { setVideo('x') };
    const handleVideoUpload = () => { setUploadStatus('x') }; 
    return (
            <>
                <Button title='Select a video' onPress={ handleLoadCameraRoll }/> 
                <Button title='Submit' onPress={() => { console.log('submit')} } /> 
                { cameraRollData ? (
                    <FlatList 
                        data={cameraRollData} 
                        numColumns={3} 
                        renderItem={ ({ item }) =>  
                            <Image 
                                style={{width: '33%', height: 150,}} 
                                source={{uri: item.uri}}
                            />
                        }
                    /> ) : null 
                }
            </>
    );
};
export default UploadScreen;