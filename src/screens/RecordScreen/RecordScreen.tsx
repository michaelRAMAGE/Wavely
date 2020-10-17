import React, { useState, useEffect } from 'react';
import { save_transcript } from '../../../server/firebase/functions/index.js';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight,
    Alert

} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system'; 
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/Entypo';
import { withTranscript } from '../../components/index';
import { ScreenProps } from '../../types';

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

const RecordScreen: React.FC<ScreenProps> = ({ handlers }) => {  
    const [recordingInstance, setRecordingInstance] = useState<Audio.Recording | null>(null); 
    const [duration, setDuration] = useState<String | null>(null); 
    const [isRecording, setisRecording] = useState<Boolean>(false); 
    
    /**
     * Handlers passed from higher order component withTranscript.
     * View HOC for more information on possible handlers and states.
     */ 
    const {
        handleFetch, // look at withTranscript HOC for possible arguments
        handleFile // takes TFile as argument
    } = handlers; 
    

    useEffect(() => { 
        handleDuration();
    }); // update duration on recording 

    /**
     * @description Set and update recording duration during recording session.
     * This helps render a recording duration view while recording via setDuration state. 
     */
    const handleDuration = async () => {
        if (recordingInstance && isRecording) {
            try {
                var { durationMillis } = await recordingInstance.getStatusAsync();
                var durationSeconds = durationMillis/1000;
                var minutes = Math.floor(durationSeconds/60);
                var seconds_ms = (durationSeconds%60).toFixed(2).toString().split('.');
                var seconds = seconds_ms[0];
                var milliseconds = seconds_ms[1];
                setDuration(`${minutes > 0 ? minutes + 'm' : ''} ${seconds}s ${milliseconds}`); 
            }
            catch (err) {
                throw (err);
            }
        }
    }

    /**
     * @description Begin recording, initializing recording instance.
     * Note: Component must rerender before we can use recordingInstance.someInstanceMethod,
     * so in startRecording we directly call methods through Audio.Recording() instance,
     * instead of recordingInstance. Everywhere else we use recordingInstance. 
     */
    const startRecording = async () => {      
        const { status, permissions } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
        if (status !== 'granted') {
            throw new Error('Audio recording permissions not granted. \
            You must grant these permissions to utilize our service. '); 
        } 
        setisRecording(true); // will start chain of duration updating
        const recording_instance = new Audio.Recording();
        try {
            await recording_instance.prepareToRecordAsync(recordingOptions);
            await recording_instance.startAsync();
        }
        catch (error) {
            stopRecording(); // redirect to stop recording
            throw (error); 
        }
        setRecordingInstance(recording_instance); 
    }

    /**
     * @description Stop recording through call on recording instance
     */
    const stopRecording = async () => {
        setisRecording(false);
        try { // try to stop and pass file to HOC handler handleFile for server upload
            const status: Audio.RecordingStatus = await recordingInstance.getStatusAsync();
            const { uri } = await FileSystem.getInfoAsync(recordingInstance.getURI())
            handleFile({
                uri: uri,
                duration: status.durationMillis,
                type: 'audio',                
            });
            await recordingInstance.stopAndUnloadAsync();
            resetStates(); // then reset states
        }
        catch (error) { // otherwise throw error and restart process
            resetRecording(); // delete recording and reset states
            throw(error);
        }
    }

    /**
     * @description Delete recording after intentional stop or on error.
     */
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

    /**
     * @description Reset recording 
     */
    const resetRecording = () => {
        deleteRecording();
        resetStates();
    }

    /**
     * @description Reset up user-induced states
     */
    const resetStates = () => { 
        setRecordingInstance(null);
        setDuration(null);
    };   

    // Call backs passed to HOC handleFetch function
    const onNull = () => { 
        Alert.alert('Transcript could not be generated from recording.');
        resetStates();
    }
    const onError = () => { resetStates(); }

    return ( 
        <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {isRecording ? 
            <TouchableHighlight onPress={() => { 
                stopRecording(); 
                handleFetch(onNull, onError);
            }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='controller-stop' size={40} color='red'>
                        Stop
                    </Icon>
                    <Text style={{fontSize: 20}}> {duration} </Text>
                </View>
            </TouchableHighlight>
            :
            <TouchableHighlight onPress={startRecording}>
                <Icon name='controller-record' size={40} color='green'>
                    Start
                </Icon> 
            </TouchableHighlight>
            }   
        </View>
        </>
    );
};

export default withTranscript(RecordScreen);