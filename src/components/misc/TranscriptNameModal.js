import { View, Modal } from 'react-native';
import React from 'react';
import Loading from './Loading';
import KeywordInput from './KeywordInput';

/**
 * 
 * @param {boolean} props.isLoading
 * @param {boolean} props.uploadStatus
 * @param {Function} props.onBadExit
 * @param {Function} props.handleTranscriptName
 */
const TranscriptNameModal = (props) => {
    const {
        isLoading,
        uploadStatus,
        onBadExit,
        handleTranscriptName
    } = props; 
    return (
        <>
        <Modal 
            animationType='slide'
            transparent={true}
            visible={uploadStatus}
            onRequestClose={onBadExit}
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
        <Loading visible={isLoading} />

        </>
    );
}

export default TranscriptNameModal; 