
import { save_transcript } from '../../../server/firebase/functions/index';
import { objHasNullValue, DATETIME, onFetchTranscript } from '../../helpers'; 
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { View, Modal, Alert } from 'react-native';
import { 
    SelectButton, 
    UploadButton, 
    KeywordInput, 
    Loading } 
from '../../components/index';
import { Video } from 'expo-av';
import _ from "lodash";
import styles from './styles';

/*
- Import video/audio from Google Drive, OneDrive,...
- Create an underlying hook that has isLoading, uploadStatus, and fileStates
- Refactor ^^ and for record screen
*/
/**
 * @typedef File
 * @type {Object}
 * @property {String} uri - File uri
 * @property {Integer} duration - Length in milliseconds
 * @property {String} width - Width of video, if file is video
 * @property {String} height - Height of video, if file is video
 * @property {String} type - Currently supported: audio | video
 */

/**
 * @typedef SpeechData
 * @type {Array.<{transcript: { 
    *  text: String, 
    *  time_span: {
    *      startSecs: Number,
    *      endSecs: Number
    *  }, 
    *  confidence: number }}>}
*/
   
/**
* @typedef ResponseData
* @type {Object}
* @property {String} audio_name - name of audio file (used for database)
* @property {SpeechData} speech_data - formatted data from STT API
*/

/**
* @typedef Transcript
* @type {Object}
* @property {String} id - 
* @property {File} file_info - Length in milliseconds
* @property {String} name - Width of video, if file is video
* @property {String} date - Height of video, if file is video
* @property {String} type - Currently supported: audio | video
*/

/**
 * @description Upload video file to be transcribed
 * @param {*} props 
 */
const UploadScreen = (props) => {
    const [isTest, setIsTest] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [uploadStatus, setUploadStatus] = useState(false); 
    const [file, setFile] = useState({  
        uri: null, 
        duration: null,
        width: null,
        height: null,
        type: null 
    }); 
    const [transcript, setTranscript] = useState({ 
        id: Date.now().toString(),
        file_info: file, 
        name: null,
        date: null,
        data:  {
            audio_name: null, 
            speech_data: []
        }   
    });

    useEffect(() => { // save transcript if all of its properties are non-null
        if (!objHasNullValue(transcript, ['id']) && !objHasNullValue(transcript.data.speech_data, [])) {
            save_transcript(transcript); 
            resetStates();
            props.navigation.navigate('TranscriptNav'); 
        }
    }, [transcript])

    /**
     * @description Load camera roll and allow user to pick video
     */
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

    /**
     * @description Get permissions to access camera roll then pick if granted
     */
    const handleLoadCameraRoll = async function () { 
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') { 
            throw new Error('Camera roll permission not granted ):');
        }
        else {
            const videoFile = pickVideo();
            setFile(prevState => ({
                ...prevState,
                ...videoFile,
            }));
        }
    }; 

    /**
     * @description Execute code while STT API in action; 
     * this may include setting a loading state and such. 
     */
    const onBufferTranscript = () => { setIsLoading(true) };

    /**
     * @description If STT API returns non-empty result, 
     * this code will be executed. 
     * @param {ResponseData} response_data 
     */
    const onSuccessTranscript = (response_data) => { 
        setTranscript(prevState => ({
            ...prevState,
            date: DATETIME(),
            data: {...response_data}
        }));
        setIsLoading(false); 
        setUploadStatus(true);
    }

    /**
     * @description If STT API returns null result, 
     * this code will be executed. 
     */
    const onNull = () => { 
        Alert.alert('Transcript could not be generated.');
        resetStates();
    }

    /**
     * @description If an error occurs during STT API processing, 
     * execute some code to clean up or reset states.  
     */
    const onError = () => { 
        resetStates(); 
    }
    /**
     * @description After recording done, submits file and retrieves data
     */
    const handleFetch = () => {
        stopRecording(); 
        const file_data = { // file bundle to send to server
            platform: Platform.OS,
            kind: file.type,
            uri: file.uri
        };
        // onFetchTranscript(file_data, 
        //     onBufferTranscript,
        //     onSuccessTranscript,
        //     onNull,
        //     onError);
    }


    /**
     * @description Set name of transcript to user's choice or default
     * @param {String} title 
     */
    const handleTranscriptName = (title) => {
        if (!objHasNullValue(transcript, ['name', 'file_info', 'id'])) { 
            setTranscript((prevState) => ({
                ...prevState,
                name: title ? title : `Untitled_${Date.now()}`,
            }));
        }
        setUploadStatus(false);
    }

    /**
     * @description Reset up user-induced states
     */
    const resetStates = () => { 
        setFile(prevState => ({  
            ...prevState,
            uri: null,
            duration: null,
            width: null,
            height: null,
            type: null
        }));
        setTranscript((prevState) => ({
            ...prevState,
            id: null,
            file_info: null,
            name: null,
            date: null,
            data: { 
                audio_name: null, 
                speech_data: []
            }
        }));
        setUploadStatus(false); 
        setIsLoading(false); 
    };

    const testFinalTranscriptState = () => { // just a sample transcript to test ui functions
        setTranscript((prevState) => ({
            ...prevState,
            name: title ? title : `Untitled_${Date.now()}`,
            id: Math.random.toString(),
            file_info: file, 
            date: Math.random.toString(),
            data:  {
                audio_name: null, 
                speech_data: ['test']
            }   
        }));
        setUploadStatus(false);       
    }

    return (
        <>
        <Loading visible={isLoading} />
        <Modal // name transcript
            animationType='slide'
            transparent={true}
            visible={uploadStatus}
            onRequestClose={() => { setIsLoading(false); setUploadStatus(false)}}
            style={{margin: 0}}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center', 
                alignItems: 'center',
                alignContent: 'center',
                backgroundColor: 'white'

            }}> 
                <KeywordInput  
                    instructionText='Name this transcript'
                    inputPlaceholder="Enter name"
                    onSubmit={handleTranscriptName}
                />
            </View>
        </Modal>
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
                onTouch={handleFetch}
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
export default UploadScreen;