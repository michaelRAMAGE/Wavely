import React, { useState } from 'react'; 
import {
    TouchableHighlight, 
    TextInput,
    View,
    Text
} from 'react-native'; 

/**
 * @description This component manages a view presenting a single 
 * line of text from STT captioning. If a paragraph is spoken,
 * then one a transcript caption view instance is something along
 * the lines of a single sentence. 
 */
const TrancriptCaptionView = (props) => {
    const { 
        index,
        transcriptCaption: { // transcriptCaption 
            text,
            time_span: { 
                startSecs,
                endSecs
            },
            confidence
        },
        show,
        onSave,
        setPlayBackTime // each caption view has a time next to it. clicking on time updates video view. 
    } = props;  
    const [captionHistory, updateCaptionHistory] = useState<Array<string>>([text]); // history of changes made to captionview text
    const [captionIdx, setCaptionIdx] = useState<number>(0); 
    const [currentCaption, setCurrentCaption] = useState<string>(captionHistory[captionIdx]); 
    const [hasBeenAltered, setHasBeenAltered] = useState<boolean>(false); // has a caption view been altered?
    const [displayConfidence, setDisplayConfidence] = useState<boolean>(true); // allow user to set confidence indicator

    const handleCaptionModification = () => { 
        console.log('Altered...')
        setHasBeenAltered(false); // remove changes alert
        updateCaptionHistory([...captionHistory, currentCaption]); // add new caption to captionHistory
        var old_idx = captionIdx;
        setCaptionIdx(old_idx++); // caption changed, added to captionHistory; update idx, set new currentCaption
        onSave(index, 
            {
                time_span: { startSecs: startSecs, endSecs: endSecs}, 
                confidence: 1, // assume that user's change on caption improves confidence
                text: currentCaption
            }
        ); 
    }

    /**
     * @description Determine color for caption text based on STT API confidence value 
     * @param confidence - STT API's confidence on text prediction from speech
     */
    const getColor = (confidence: number): string => { 
        if (captionIdx === 0) { 
            confidence = confidence * 10 * 15
            var hsl = `hsl(${confidence}, 100%, 50%)`;
            return hsl; 
        }
        else { return 'hsl(100%, 100%, 50%)'; }
    }


    // NOT YET INTEGRATED
    const handleUndo = () => { 
        captionIdx>0 ? 
            setCaptionIdx(captionIdx-1) : setCaptionIdx(0);  
    }

    const handleRedo = () => {
        captionIdx<captionHistory.length ? 
            setCaptionIdx(captionIdx+1) : setCaptionIdx(captionIdx);
    }

    return (
        <>
        { show &&
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row', 
                    padding: 8,
                    borderBottomWidth: 2,
                }} 
            >
                <View style={{flex: .5, paddingRight: 15}}>
                    <TextInput 
                        style={{
                            color: displayConfidence ? // display confidence levels
                                getColor(confidence) : 'black',
                            textAlignVertical: 'top',
                        }}
                        multiline={true}
                        value={currentCaption}
                        onChangeText={(value) => { // user changing captionview text, 
                                                  // diff to determine if captionview text 
                                                  // has changed. if so, render a save changes indicator
                                setCurrentCaption(value);
                                if (captionHistory[captionIdx] !== value) { 
                                    setHasBeenAltered(true);
                                }
                                else { setHasBeenAltered(false); }
                            }
                        }
                    />
                </View>

                { hasBeenAltered ? // when user updates a caption view, ask if they want to save the changes
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
        }
        </>
    );
};

export default TrancriptCaptionView; 