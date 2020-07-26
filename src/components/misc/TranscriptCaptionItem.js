import React, { useState } from 'react'; 
import {
    TouchableHighlight, 
    TextInput,
    View,
    Text
} from 'react-native'; 

// why did hasbeenaltered give trouble inside textinput onchangetext ?

const TrancriptCaptionItem = (props) => {
    const { 
        view_key: key, 
        captionObject: {
            text: text,
            time_span: { 
                startSecs,
                endSecs
            },
            confidence
        },
        show,
        onSave,
        setPlayBackTime
    } = props;  
    const [captionHistory, updateCaptionHistory] = useState([text]); 
    const [captionIdx, setCaptionIdx] = useState(0); 
    const [currentCaption, setCurrentCaption] = useState(captionHistory[captionIdx]); 
    const [hasBeenAltered, setHasBeenAltered] = useState(false); 
    const [displayConfidence, setDisplayConfidence] = useState(true);

    const handleCaptionModification = () => { 
        console.log('Altered...')
        setHasBeenAltered(false); // remove changes alert
        updateCaptionHistory([...captionHistory, currentCaption]); // add new item
        setCaptionIdx(captionIdx++); // update idx for new item
        onSave(key, currentCaption); // communicate change to details screen
    }

    const getColor = (confidence) => { 
        if (captionIdx === 0) { 
            confidence = confidence * 10 * 15
            var hsl = `hsl(${confidence}, 100%, 50%)`;
            return hsl; 
        }
        else { return 1; } // user changed caption; assume improved over raw data
    }

    const handleUndo = () => { 
        captionIdx>0 ? 
            setCaptionIdx(captionIdx-1) : setCaptionIdx(0);  
    }

    const handleRedo = () => {
        captionIdx<captionHistory.length ? 
            setCaptionIdx(captionIdx+1) : setCaptionIdx(captionIdx);
    }

    return (
        <View> 
        { show ?
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
                        value={currentCaption}
                        onChangeText={(value) => { 
                                if (captionHistory[captionIdx] !== value) { 
                                    console.log('caption: ', currentCaption)
                                    setCurrentCaption(value);
                                    setHasBeenAltered(true); 
                                }
                                else { setHasBeenAltered(false); }
                            }
                        }
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
                        setPlayBackTime(parseFloat(startSecs)*1000); 
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