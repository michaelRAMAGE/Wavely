import { firebase } from '../../../server/firebase/config';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import uploadFile from '../../../server/scripts/upload_file';
import React, { useState } from 'react';
import { View, Modal, Alert } from 'react-native';
import { 
    SelectButton, 
    UploadButton, 
    KeywordInput, 
    Loading } 
from '../../components/index';
import { Video } from 'expo-av';
import styles from './styles';

/*
- Look into: How updating file affects render
- Typescript for static type checking
- How I am initializing states and using spread
- Import video/audio from Google Drive, OneDrive,...
*/

const UploadScreen = ({state, navigation, descriptors, progress}) => {
    console.log('in upload')
    const [isLoading, setIsLoading] = useState(false); // should cause rerender
    const [uploadStatus, setUploadStatus] = useState(false); // should cause rerender
    const [file, setFile] = useState({  // should cause rerender
        uri: null, // interacts with ui
        duration: null,
        width: null,
        height: null,
        type: null // interacts with ui
    }); 
    console.log(isLoading)

    /*
    @speech_data[speech_data_object(s)]
    @speech_data_object {
        words: [
            {
                word: null, 
                time_span: { startSecs: null, endSecs: null}
            },
            ...,
            {
                word: null, 
                time_span: { startSecs: null, endSecs: null}
            }
        ]
        transcript: {
            text: null, 
            time_span: { startSecs: null, endSecs: null }, 
            confidence: null
        }
    }
    */
    const [transcript, setTranscript] = useState({ // do not rerender on transcript set
        id: null,
        file_info: file, // should one state reference another?
        name: null,
        date: null,
        data:  {
            audio_name: null, 
            speech_data: []
        }   
    });

    Date.prototype.DATETIME = function() { // Date objects will inherit this method
        return (
            this.getFullYear() +
            '/' + ((this.getMonth()+1)<10?'0':'') + (this.getMonth()+1)  +
            '/' + ((this.getDate())<10?'0':'') + (this.getMonth()) +
            ' ' + ((this.getHours())<10?'0':'') + (this.getHours()) +
            ':' + ((this.getMinutes())<10?'0':'') + (this.getMinutes()) +
            ':' + ((this.getSeconds())<10?'0':'')+(this.getSeconds())
        );
    };

    const pickVideo = async () => { // load camera roll and pick video
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setFile(prevState => ({
                    ...prevState,
                    ...result,
                }));
                console.log('File after set: ', file);
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
            pickVideo();
        }
    }; 

    const saveTranscript = () => { // save to database
        const user = firebase.auth().currentUser;
        console.log(`Upload > current user: ${user}`);
            if (user) {
                console.log(`Saving transcript...: ${transcript}`)
                firebase.firestore()
                        .collection('users')
                        .doc(user.uid)
                        .collection('transcripts')
                        .add(transcript); 
            }
            else {
                throw new Error('Error: user is not recognized')
            }
    };   

    const fetchTranscript = () => { // upload file; get and save trancript
        setIsLoading(true);
        setTimeout(() => { // for testing, comment out post-timeout code (UI)
            setIsLoading(false);
            setUploadStatus(false);
        }, 5000);
        // const file_data = {
        //     platform: Platform.OS,
        //     kind: file.type,
        //     uri: file.uri
        // };
        // uploadFile(file_data) // upload to server and process request 
        // .then((response_data) => { 
        //     console.log(`File uploaded, converted, and transcript retrieved: ${response_data}`); 

        //     setTranscript(prevState => ({
        //         ...prevState,
        //         file_info: file, 
        //         date: (new Date()).DATETIME(),
        //         data: {...response_data}
        //     }));
        //     setIsLoading(false);
        //     setUploadStatus(true);
        // })
        // .catch(err => { throw new Error(err) } );
    };

    const resetStates = () => { // clean up on leave (prob bad approach)
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
    };

    return (
        <>
        {/* <Loading visible={isLoading} /> */}
        <Modal // name transcript
            animationType='slide'
            transparent={false}
            visible={uploadStatus}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                <KeywordInput  
                    instructionText='Name this transcript'
                    inputPlaceholder="Enter name"
                    onSubmit={(title) => { 
                        // setTranscript((prevState) => ({
                        //     ...prevState,
                        //     id: Date.now(),
                        //     name: title,
                        // }));
                        // saveTranscript(transcript);
                        // console.log('Transcript state set: ', transcript)
                        resetStates(); 
                        navigation.navigate('TranscriptsNav'); 
                    }}
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
                onTouch={fetchTranscript}
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