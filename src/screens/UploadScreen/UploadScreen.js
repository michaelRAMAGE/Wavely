import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Modal, Alert } from 'react-native';
import { 
    SelectButton, 
    UploadButton, 
    withTranscript 
} from '../../components/index';
import { Video } from 'expo-av';
import _ from "lodash";
import styles from './styles';

const UploadScreen = props => { 
    const {
        handleFetch,
        handleFile
    } = props.handlers;
    const {
        file
    } = props.states;

    const pickVideo = async () => { 
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                return result;
            }
        } 
        catch (err) {
            throw (err); 
        }
    };

    const handleLoadCameraRoll = async function () { 
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') { 
            throw new Error('Camera roll permission not granted ):');
        }
        else {
            const videoFile = await pickVideo();
            handleFile(videoFile); 
        }
    }; 
    
    const onNull = () => {
        Alert.alert('We could not generate a transcript \
        for your file.'); 
    }

    return (
        <>
        <View style={styles.rootContainer}>
            <SelectButton 
                onTouch={handleLoadCameraRoll}
                buttonStyle={{ 
                    marginVertical: 8,
                    marginHorizontal: 16,
                }}
                icon='cloudupload'
                iconSize={30}
                textStyle={{}}
                text='Select a video'
            /> 
            <View style={styles.videoContainer}>
                { (file.type === 'video' && file.uri) && 
                <Video
                    source={{ uri: file.uri }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={false}
                    isLooping={false}
                    useNativeControls
                    style={{flex: 1}}
                />
                }
            </View>
            { (file.type === 'video' && file.uri) && 
            <UploadButton 
                onTouch={() => { handleFetch(onNull) } }
                text='Upload video'
                buttonStyle={{ 
                    marginVertical: 8,
                    marginHorizontal: 16,
                    marginBottom: 20
                }}
                textStyle={{fontSize: 23}}
            />
            }
        </View>
        </>
    );
};
export default withTranscript(UploadScreen);