import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import PersistContext from '../../contexts/PersistContext';

const UploadScreen = props => {
    const setSignOut = useContext(PersistContext);
    const [uploadStatus, setUploadStatus] = useState('');
    const [video, setVideo] = useState(null); 

    // load camera roll and pick video
    pickVideo = async () => {
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
    const handleUploadVideo = () => { setUploadStatus('x') }; 
    return (
        <View style={styles.rootContainer}>
            <View style={styles.uploadContainer}> 
                <TouchableHighlight  style={styles.button} onPress={handleLoadCameraRoll}>
                    <Icon name='cloudupload' size={30}>
                        <Text>Select a video</Text>
                    </Icon>
                </TouchableHighlight>
                {
                video && 
                    <Video
                        source={{ uri: video }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        style={{height: 200, width: 100}}

                    />
                }
            </View>
            <View>
                { video && 
                    <TouchableOpacity onPress={handleUploadVideo}>
                        <View style={styles.button}> 
                            <Text style={styles.buttonText}>
                                Upload video
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};


export default UploadScreen;