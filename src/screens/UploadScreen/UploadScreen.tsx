import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { View, Alert } from 'react-native';
import { 
    SelectButton, 
    UploadButton, 
    withTranscript 
} from '../../components/index';
import { Video } from 'expo-av';
import styles from './styles';
import PropTypes from 'prop-types'; 
import { TFile, ScreenProps } from '../../types';

const UploadScreen: React.FC<ScreenProps> = ({ handlers, states }) => { 
    const {
        handleFetch,
        handleFile,
    } = handlers;
    const {
        file
    } = states;

    const pickVideo = async () => { 
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (result.cancelled === false) {
                handleFile({
                    uri: result.uri, 
                    width: result.height,
                    height: result.width,
                    type: result.type
                }); 
            }
        } 
        catch (err) {
            throw (err); 
        }
    };

    const handleLoadCameraRoll = async function () { 
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') { 
            throw new Error('Camera roll permission not granted');
        }
        else {
            await pickVideo();
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


// UploadScreen.propTypes = {
//     handlers: PropTypes.shape({
//         handleFetch: PropTypes.func.isRequired,
//         handleFile: PropTypes.func.isRequired,
//         handleUploadStatus: PropTypes.func,
//         handleIsLoadingh: PropTypes.func,
//     }),
//     states: PropTypes.shape({
//         transcript: PropTypes.any,
//         file: PropTypes.TFile.isRequired,
//         isLoading: PropTypes.bool,
//         uploadStatus: PropTypes.bool,
//     }),
//     navigation: PropTypes.any
// }

export default withTranscript(UploadScreen);