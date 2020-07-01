import { firebase } from '../../firebase/config';
// import speechToText from '../../scripts/gc_speechToText';
import { AuthContext } from '../../contexts/AuthContext';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import SelectButton from '../../components/SelectButton';
import UploadButton from '../../components/UploadButton';
import { Video } from 'expo-av';
import styles from './styles';


const UploadScreen = props => {
    const setUser = useContext(AuthContext);

    const [uploadStatus, setUploadStatus] = useState('');
    const [video, setVideo] = useState(null); 
    
    // We do not need to pass user; this will grab the user
    console.log(firebase.auth().currentUser.uid) // get current user info

    // load camera roll and pick video
    const pickVideo = async () => {
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
          console.log(result);
        } catch (E) {
          console.log(E);
        }
    };

    // check perms then call pick video
    const handleLoadCameraRoll = async function () {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') { 
            throw new Error('Camera roll permission not granted ):');
        }
        else {
            pickVideo()
        }
    };        

    // upload video to server 
    const handleUploadVideo = () => { console.log('cool') }; 

    const handleTranscribe = async function() {
        // const response = await speechToText(video);
    }

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
                    onTouch={handleTranscribe}
                    text='Upload video'
                />
                }
            </View>
        </View>
    );
};


export default UploadScreen;