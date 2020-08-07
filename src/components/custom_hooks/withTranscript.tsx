import React, { useState, useEffect } from 'react';
import { save_transcript } from '../../../server/firebase/functions/index.js';
import upload_file from '../../../server/scripts/upload_file';
import { objHasNullValue, DATETIME } from '../../helpers'; 
import TranscriptNameModal from '../misc/TranscriptNameModal';
import { Alert, View, Platform } from 'react-native';
import { Transcript, ResponseData, TFile, ScreenProps} from '../../types';

/**
 * @description Underlying state-management for components
 * that set a file to be sent to server to STT API
 */
const withTranscript = (Component: React.ComponentType<any & ScreenProps>) => {
    const transcriptWrapper = (props: any) => {
        const [file, setFile] = useState<TFile>({
            uri: null, 
            duration: null,
            width: null,
            height: null,
            type: null
        }); 
        const [transcript, setTranscript] = useState<Transcript>({
            id: null,
            name: null,
            date: null,
            response_data: null,
            file_info: null,
            key: null
        });
        const [isLoading, setIsLoading] = useState<boolean>(false); 
        const [uploadStatus, setUploadStatus] = useState<boolean>(false); 

        useEffect(() => { // Save transcript if all of its properties are non-null
            console.log('[withTranscript:useEffect] Transcript set: ', transcript)
            if (!objHasNullValue(transcript, ['id']) 
            && !objHasNullValue(transcript.response_data.speech_data, [])) {
                console.log('Transcript ready to save!')
                save_transcript(transcript); 
                props.navigation.navigate('TranscriptNav'); 
            }
        }, [transcript])

        useEffect(() => {
            console.log('[withTranscript:useEffect] File set: ', file);
        }, [file]);

        /**
         * @description Set name of transcript to user's choice or default
         * @param {String} title 
         */
        const handleTranscriptName = (title: string) => {
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
                response_data: { 
                    audio_name: null, 
                    speech_data: []
                }
            }));
            setIsLoading(false);
            setUploadStatus(false);
        };      
        
        // Handlers to set this HOC's state from wrapped components
        const handleUploadStatus = (bool: boolean) => { setUploadStatus(bool) };
        const handleIsLoading = (bool: boolean) => { setIsLoading(bool) };
        const handleFile = (input_file: TFile) => {
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
        const handleFetch = (onNull: Function, onError: Function) => { // upload file; get and save trancript
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
            .then((response_data: ResponseData) => { 
                console.log(`[withTranscript:handleFetch] File uploaded, converted,\
                 and transcript retrieved: ${response_data}`); 
                if (response_data.speech_data.length !== 0) {
                    setTranscript({
                        ...transcript,
                        id: (Date.now()).toString(),
                        name: null,
                        date: DATETIME(),
                        file_info: file,
                        response_data: {...response_data},
                    });
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
            .catch((err: any) => {  
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