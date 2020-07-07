import { firebase } from '../../../server/firebase/config';
import { AuthContext } from '../../contexts/AuthContext';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import uploadFile from '../../../server/scripts/upload_file';
import React, { useState, useContext } from 'react';
import { View, Text, Platform } from 'react-native';
import SelectButton from '../../components/SelectButton';
import UploadButton from '../../components/UploadButton';
import { Video } from 'expo-av';
import styles from './styles';

// We do not need to pass user; this will grab the user
// console.log(firebase.auth().currentUser.uid) // get current user info
const UploadScreen = props => {
    const setUser = useContext(AuthContext);
    const [uploadStatus, setUploadStatus] = useState('');
    const [video, setVideo] = useState(null); 
    const [transcript, setTranscript] = useState(null);
    const pickVideo = async () => { // load camera roll and pick video
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            console.log(result)
            console.log(result.uri)
            setVideo(result.uri);
          }
        } 
        catch (err) {
          throw (err); 
        }
    };
    const handleLoadCameraRoll = async function () { // check perms then call pick video
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') { 
            throw new Error('Camera roll permission not granted ):');
        }
        else {
            pickVideo()
        }
    };        
    const fetchTranscript = async () => {
        const file_data = {
            platform: Platform.OS,
            kind: 'video',
            uri: video
        };
        const data = await uploadFile(file_data);
        console.log(data)
        // setTranscript(data);
    };
    return (
        <View style={styles.rootContainer}> 
            <SelectButton 
                onTouch={handleLoadCameraRoll}
                icon='cloudupload'
                text='Select a video'
            /> 
            <View style={styles.videoContainer}>
                { video && 
                <Video
                    source={{ uri: video }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={false}
                    isLooping={false}
                    useNativeControls
                    style={styles.video}
                />
                }
            </View>
            <View>
                { video && 
                <UploadButton 
                    onTouch={fetchTranscript}
                    text='Upload video'
                />
                }
            </View>
        </View>
    );
};


export default UploadScreen;