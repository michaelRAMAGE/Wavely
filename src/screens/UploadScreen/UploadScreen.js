import { firebase } from '../../../server/firebase/config';
import { AuthContext } from '../../contexts/AuthContext';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import uploadFile from '../../../server/scripts/upload_file';
import React, { useState, useContext } from 'react';
import { View, Text, Platform, ActivityIndicator, Modal, Alert } from 'react-native';
import SelectButton from '../../components/buttons/SelectButton';
import UploadButton from '../../components/buttons/UploadButton';
import KeyWordInput from '../../components/misc/KeywordInput';
import { Video } from 'expo-av';
import styles from './styles';


// We do not need to pass user; this will grab the user
// console.log(firebase.auth().currentUser.uid) // get current user info
const UploadScreen = ({state, navigation, descriptors, progress}) => {
    // console.log(navigation)
    // console.log(state)
    // console.log(descriptors)
    // console.log(progress)
    const setUser = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [video, setVideo] = useState(null); 
    const [transcript, setTranscript] = useState({
        name: '',
        date: '',
        transcript: ''
    });
    const pickVideo = async () => { // load camera roll and pick video
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
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
            pickVideo();
        }
    };        
    const fetchTranscript = () => { // upload file; get and save trancript
        setIsLoading(true); 
        // setTimeout(() => { 
        //     setIsLoading(false);
        //     var user = firebase.auth().currentUser;
        //     if (user) {
        //         var transcript_name = `Untitled_${Date.now()}`; 
        //         <KeywordInput 
        //             instructionText='Name this transcript'
        //             inputPlaceholder="Enter name"
        //             onSubmit={setKeyQuery}
        //         />
        //         setTranscript({
        //             name: transcript_name,
        //             date: Date.now(),
        //             transcript: 'I had fun'
        //         })
        //         const userRef = firebase.firestore().collection('users')
        //         userRef.doc(user.uid).collection('transcripts').set(transcript); 
        //     } 
        //     navigation.navigate('Transcripts'); // transfer to transcripts page
        // }, 5000);
        const file_data = {
            platform: Platform.OS,
            kind: 'video',
            uri: video
        };
        uploadFile(file_data).then((data) => { // upload to server and process request 
            console.log(`File uploaded, converted, and transcript retrieved: ${data}`); 
            var user = firebase.auth().currentUser;
            if (user) {
                var transcript_name = `Untitled_${Date.now()}`; 
                <KeywordInput 
                    instructionText='Name this transcript'
                    inputPlaceholder="Enter name"
                    onSubmit={setKeyQuery}
                />
                setTranscript({
                    name: transcript_name,
                    date: Date.now(),
                    transcript: data
                })
                const userRef = firebase.firestore().collection('users')
                userRef.doc(user.uid).collection('transcripts').set(transcript); 
            }
            else {
                throw new Error('Error: user is not recognized')
            }
        });
    };
    return (
        <>
        <Modal 
            animationType='slide'
            transparent={false}
            visible={isLoading}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}> 
                <Text size={30}>Processing request</Text>
                <ActivityIndicator size={40}/>
            </View>
        </Modal>
        <View style={styles.rootContainer}>
            <SelectButton 
                onTouch={handleLoadCameraRoll}
                buttonStyle={styles.selectButton}
                icon='cloudupload'
                iconSize={30}
                textStyle={{}}
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
            <View >
                { video && 
                <UploadButton 
                    onTouch={fetchTranscript}
                    text='Upload video'
                    buttonStyle={{}}
                    textStyle={{fontSize: 23}}
                />
                }
            </View>
        </View>
        </>
    );
};
export default UploadScreen;