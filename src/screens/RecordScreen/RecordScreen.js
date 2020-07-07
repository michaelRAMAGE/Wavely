import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, 
    ActivityIndicator, TouchableHighlight} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system'; 
import * as Permissions from 'expo-permissions';
import KeywordInput from '../../components/KeywordInput';
import Icon from 'react-native-vector-icons/Entypo';
import uploadFile from '../../../server/scripts/upload_file'

const recordingOptions = {
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};
const RecordScreen = props => {
    const [keyQuery, setKeyQuery] = useState('');    
    const [recordingInstance, setRecordingInstance] = useState(null); // set recording instance
    const [isRecording, setisRecording] = useState(false); 
    const [isFetching, setFetching] = useState(false);
    const [transcript, setTranscript] = useState(null);

    const startRecording = async () => {      
        const { status, permissions } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        if (status !== 'granted') {
            throw new Error('Audio recording permissions not granted. \
            You must grant these permissions to utilize our service. '); 
        } 
        setisRecording(true); // set recording state
        const recording_instance = new Audio.Recording();
        try {
            await recording_instance.prepareToRecordAsync(recordingOptions);
            await recording_instance.startAsync();
        }
        catch (error) {
            stopRecording();
            throw (error); 
        }
        setRecordingInstance(recording_instance); 
    }
    const stopRecording = async () => {
        setisRecording(false);
        try {
            await recordingInstance.stopAndUnloadAsync();
        }
        catch (error) {
            throw(error);
        }
    }
    const deleteRecording = async () => {
        try {
            console.log('recording instance', recordingInstance)
            const info = await FileSystem.getInfoAsync(recordingInstance.getURI())
            await FileSystem.deleteAsync(info.uri);
        }
        catch (error) {
            throw (error);
        }
    }
    const resetRecording = () => {
        deleteRecording();
        setRecordingInstance(null);
    }
    const fetchTranscripts = async () => {
        setFetching(true); 
        try {
            const { uri } = await FileSystem.getInfoAsync(recordingInstance.getURI());
            const file_data = {
                platform: Platform.OS,
                kind: 'audio',
                uri: uri
            }
            const data = await uploadFile(file_data); 
            // setTranscript(data.transcript); // response from our server
        }
        catch (error) {
            console.log('error in fetch: ', error)
            stopRecording();
            resetRecording();
        }
        setFetching(false);
    }
    return ( 
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {isRecording? 
            <TouchableHighlight onPress={()=> { stopRecording(); fetchTranscripts(); }}> 
                <Icon name='controller-stop' size={40} color='red'>
                    Stop
                </Icon>
            </TouchableHighlight>
            :
            <TouchableHighlight onPress={startRecording}>
                <Icon name='controller-record' size={40} color='green'>
                    Start
                </Icon> 
            </TouchableHighlight>
            }   
        </View>

        // <KeywordInput 
        //     instructionText='Search your audio for these keywords'
        //     inputPlaceholder="Enter keywords each separated by ','"
        //     onSubmit={setKeyQuery}
        // />
    );
};

const styles = StyleSheet.create({

});


export default RecordScreen;