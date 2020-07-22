import React, { useState } from 'react'; 
import {
    TouchableHighlight, 
    TextInput,
    View,
    StyleSheet
} from 'react-native'; 
import { TranscriptCaptionItem } from '.';

const TrancriptCaptionItem = (props) => {
    const [isEditable, setIsEditable] = useState(false); 
    const [hasBeenAltered, setHasBeenAltered] = useState(true); 
    const [caption, setCaption] = useState(props.transcript_obj.text);
 
    const getColor = (confidence) => { // get caption color based on confidence
        confidence = confidence * 10 * 15
        var hsl = `hsl(${confidence}, 100%, 50%)`;
        return hsl; 
    }

    return (
        <View 
            style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row', 
                padding: 8,
                borderBottomWidth: 2,
                zIndex: -1}
            } 
            key={props.view_key}
        >
            <View style={{flex: .8, paddingRight: 15}}>
                <TextInput 
                    style={{
                        color: getColor(props.transcript_obj.confidence),
                        textAlignVertical: 'top',
                    }}
                    multiline={true}
                    value={caption}
                    onChangeText={(value) => setCaption(value) }
                    // onTextInput={(value) => setCaption(value) }
                    // onFocus={() => { setIsEditable(true); }}
                    // onBlur={() => {  setIsEditable(false); }}
                    // onEndEditing={() => {  setIsEditable(false); }}
                />
            </View>
            
            <TouchableHighlight 
                style={{ 
                    backgroundColor: 'powderblue', 
                    flex: .2, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    maxHeight: 30
                }} 
                onPress={() => {
                    props.setPlayBackTime(parseFloat(props.transcript_obj.time_span.startSecs)*1000); 
                }}
            >
                <Text style={{ color: 'black', fontWeight: 'bold' }} > 
                    { props.transcript_obj.time_span.startSecs.toString() 
                    + ' - ' +
                    props.transcript_obj.time_span.endSecs.toString()
                    + ''}
                </Text>                                                           
            </TouchableHighlight>                        

        </View>
    );
};

export default TranscriptCaptionItem; 