import React, { useState } from 'react'; 
import {
    TouchableHighlight, 
    TextInput,
    View,
    Text
} from 'react-native'; 

// why did hasbeenaltered give trouble inside textinput onchangetext ?

const TrancriptCaptionItem = (props) => {
    const [displayConfidence, setDisplayConfidence] = useState(true);
    const [isEditable, setIsEditable] = useState(false); 
    const [hasBeenAltered, setHasBeenAltered] = useState(false); 
    const [caption, setCaption] = useState(props.captionObject.text);
    const confidence = props.captionObject.confidence; 
    const { startSecs, endSecs } = props.captionObject.time_span;
    const key = props.view_key; 
    const static_caption = props.captionObject.text;
    
    const handleCaptionModification = () => { 
        console.log('Altered...')
        setHasBeenAltered(false); 
        props.onAltered(key, caption); // onAltered sets trancriptCaptions in details screen
    }

    const getColor = (confidence) => { // get caption color based on confidence
        confidence = confidence * 10 * 15
        var hsl = `hsl(${confidence}, 100%, 50%)`;
        return hsl; 
    }

    return (
        <View> 
        { props.show ?
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row', 
                    padding: 8,
                    borderBottomWidth: 2,
                    zIndex: -1}
                } 
                key={key}
            >
                <View style={{flex: .5, paddingRight: 15}}>
                    <TextInput 
                        style={{
                            color: displayConfidence ?
                                getColor(confidence) : 'black',
                            textAlignVertical: 'top',
                        }}
                        multiline={true}
                        value={caption}
                        onChangeText={(value) => { 
                                if (caption !== value) { 
                                    console.log('caption: ', caption)
                                    setCaption(value); 
                                }
                                if (static_caption !== value) {
                                    setHasBeenAltered(true);
                                }
                                else { setHasBeenAltered(false); }
                            }
                        }
                        // onTextInput={(value) => setCaption(value) }
                        // onFocus={() => { setIsEditable(true); }}
                        // onBlur={() => {  setIsEditable(false); }}
                        // onEndEditing={() => {  setIsEditable(false); }}
                    />
                </View>

                { hasBeenAltered ? 
                    <TouchableHighlight 
                        style={{ 
                            backgroundColor: 'orange', 
                            flex: .3, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            maxHeight: 30,
                            marginRight: 10
                        }} 
                        onPress={handleCaptionModification}
                    >
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12}} > 
                            Save changes*
                        </Text>  
                                                                
                    </TouchableHighlight>           
                    : 
                    <></>             
                }

                <TouchableHighlight 
                    style={{ 
                        backgroundColor: 'powderblue', 
                        flex: .2, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        maxHeight: 30
                    }} 
                    onPress={() => {
                        props.setPlayBackTime(parseFloat(startSecs)*1000); 
                    }}
                >
                    <Text style={{ color: 'black', fontWeight: 'bold' }} > 
                        { 
                            startSecs.toString() 
                            + ' - ' +
                            endSecs.toString()
                            + ''
                        }
                    </Text>                                                          
                </TouchableHighlight>   
            </View>         
        : 
        <></>
        }
        </View> 
    );
};

export default TrancriptCaptionItem; 