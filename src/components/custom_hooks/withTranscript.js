import React, { useState, useEffect } from 'react';
import { save_transcript } from '../../../server/firebase/functions/index';
import upload_file from '../../../server/scripts/upload_file';
import { objHasNullValue, DATETIME } from '../../helpers'; 
import TranscriptNameModal from '../misc/TranscriptNameModal';
import { Alert, View, Platform } from 'react-native';

/**
 * @description Underlying state-management for components
 * that set a file to be sent to server to STT API
 */
const withTranscript = Component => {
    const transcriptWrapper = (props) => {
        const [file, setFile] = useState({  
            uri: null, 
            duration: null,
            width: null,
            height: null,
            type: null 
        }); 
        const [transcript, setTranscript] = useState({ 
            id: null,
            file_info: null, 
            name: null,
            date: null,
            data:  {
                audio_name: null, 
                speech_data: []
            }   
        });
        const [isLoading, setIsLoading] = useState(false); 
        const [uploadStatus, setUploadStatus] = useState(false); 

        useEffect(() => { // Save transcript if all of its properties are non-null
            console.log('Transcript set: ', transcript)
            if (!objHasNullValue(transcript, ['id']) 
            && !objHasNullValue(transcript.data.speech_data, [])) {
                console.log('Transcript ready to save!')
                // save_transcript(transcript); 
                props.navigation.navigate('TranscriptNav'); 
            }
        }, [transcript])

        useEffect(() => {
            console.log('File set: ', file)
        }, [file]);

        /**
         * @description Set name of transcript to user's choice or default
         * @param {String} title 
         */
        const handleTranscriptName = (title) => {
            if (!objHasNullValue(transcript, ['name', 'file_info', 'id'])) { 
                if (!title) {
                    title = `Untitled_${Date.now()}`;
                }
                setTranscript((prevState) => ({
                    ...prevState,
                    name: title,
                }));
                Alert.alert(`Transcript named ${title}`);
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
            setIsLoading(false);
            setUploadStatus(false);
        };      
        
        // Handlers to set this HOC's state from wrapped components
        const handleUploadStatus = (bool) => { setUploadStatus(bool) };
        const handleIsLoading = (bool) => { setIsLoading(bool) };
        const handleFile = (input_file) => { 
            setFile((prevState) => ({...prevState,...input_file})); 
        };

        /**
         * @description Send file to server, call STT API, and receive transcript data
         * @param {onNull} onNull Control what happens when the API returns 
         * an empty response. This can include something along the lines of a 
         * function which resets local states or calls component methods. 
         * @param {onError} onError Control what happens when an error. This can 
         * include something along the lines of a function which resets local states 
         * or calls component methods.  
         */
        const handleFetch = (onNull, onError) => { // upload file; get and save trancript
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setUploadStatus(true);
            }, 1200);
            const file_data = { // construct a file to send to server
                platform: Platform.OS,
                kind: file.type,
                uri: file.uri
            };
            upload_file(file_data) 
            .then((response_data) => { 
                onSuccess(response_data); 
                console.log(`File uploaded, converted, and transcript retrieved: ${response_data}`); 
                if (response_data.speech_data.length !== 0) {
                    setTranscript(prevState => ({
                        ...prevState,
                        id: Date.now().toString(),
                        file_data: file,
                        date: DATETIME(),
                        data: {...response_data}
                    }));
                    setIsLoading(false); 
                    setUploadStatus(true);                   
                }
                else {
                    if (onNull) { 
                        onNull();
                    }
                    resetStates(); 
                }
            })
            .catch(err => {  
                if (onError) {               
                    onError(); 
                }
                resetStates(); 
                throw (err);
            });
        };

        return (<View style={{flex: 1}}>
                    <TranscriptNameModal 
                        isLoading={isLoading}
                        uploadStatus={uploadStatus}
                        onBadExit={() => { 
                            setUploadStatus(false);
                        }}
                        handleTranscriptName={handleTranscriptName}
                    />
                    <Component 
                        {...props} 
                        states={{
                            file: file,
                            transcript: transcript,
                            isLoading: isLoading,
                            uploadStatus: uploadStatus
                        }}
                        handlers={{
                            handleFetch: handleFetch,
                            handleFile: handleFile,
                            handleUploadStatus: handleUploadStatus,
                            handleIsLoading: handleIsLoading
                        }}/>
                </View>
        );       

    }
    return transcriptWrapper; 

}
export default withTranscript; 