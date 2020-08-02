/*
About: TranscriptDetailScreen hosts
specific data about a specific
transcript. TranscriptListScreen 
has a FlatList with items. When 
an item is clicked, this page will
be generated provided navigation 
route parameter data. 

Flow: When a captionObject's text changes on
a TranscriptCaptionItem, TranscriptCaptionItem's
onAltered prop function is called, which is set to
handleTranscriptCaption() in this component. When
this function is called, setTranscriptCaption is
used to update transcriptCaptions, which is detected
by useEffect (look in its dependencies). Following
the dependency change, updateCaptionViews is called
and the new text is merged, and if any keywords have
been entered for filtering on the captions, those will
e accounted for with show prop on TranscriptCaptionItem.
*/

/* 
- Export to multiple platforms 
- Send the document to email (basically the same as in TranscriptListScreen)
- Throw error when video uri cannot be found --> 
-- Should we also save videos to our database or ...?
*/

import { firebase } from '../../../server/firebase/config';
import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet,  
    Dimensions, 
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    SearchBar, 
    TranscriptCaptionItem, 
    useConstructor
} from '../../components/index';
import { Video } from 'expo-av';

const TranscriptDetailsScreen = ({ route }) => {
    const { width, height } = Dimensions.get('window');
    const { 
        key,
        id,
        file_info: { 
            uri, 
            width: vid_width, 
            height: vid_height, 
            type: file_type
        },
        name, 
        data: {
            audio_name,
            speech_data
        }
    } = route.params.data; 
    const [transcriptCaptions, setTranscriptCaptions] = useState(
        speech_data.map(object => object.transcript)
    );
    const [captionViews, setCaptionViews] = useState([]); 
    const [keywords, setKeywords] = useState([]);
    const [playBackTime, setPlayBackTime] = useState(0); 

    /*
    Custom hook that runs code before the initial render.
    Sets initial captionViews state provided data via
    navigation route parameter. 
    */
    useConstructor(() => {
        console.log('Before first render (useConstructor)');
        var views = initCaptionViews();
        setCaptionViews(...captionViews, views);
    }); 

    /*
    This useEffect manages captionViews update calls
    based on the state dependencies keywords and
    transcriptCaptions. onUnmounComponent cleans up.
    */
    useEffect(() => { 
        console.log('After render (useEffect)');
        updateCaptionViews();
    }, [transcriptCaptions, keywords]);    

    /*
    On unmountComponent
    */
    useEffect(()=> { return () => unmountDetailsScreen() }, []);

    /**
     * @description Update transcript document on database
     */
    const updateTranscript = () => { 
        const user = firebase.auth().currentUser;
        console.log(`Upload > current user: ${user}`);
            if (user) {
                console.log(`Updating transcript...: ${transcriptCaptions}`)
                var unsubscribe = firebase.firestore()
                        .collection('users')
                        .doc(user.uid)
                        .collection('transcripts')
                        .doc(key)
                        .update({'data.speech_data': transcriptCaptions}); 
                return unsubscribe;
            }
            else {
                throw new Error('Error: user is not recognized')
            }
    };   

    /**
     * @description Reset user induced states and save updates on exit
     */
    const unmountDetailsScreen = () => {
        updateTranscript();
        setPlayBackTime(0);
        setKeywords([]);
    };   

    /**
     * @description Initializes captionViews state
     * @returns TranscriptCaptionItem[]
     */
    function initCaptionViews() { // create views (reuse them, show: true | false)
        console.log('Initializing caption views...')
        const views = transcriptCaptions.map((transcript_obj, view_idx) => {
            return (
                <TranscriptCaptionItem
                    key={view_idx}
                    index={view_idx}
                    setPlayBackTime={setPlayBackTime}
                    transcriptObject={transcript_obj}
                    onSave={(index, text) => { handleTranscriptCaption(index, text) }}
                    show={true} 
                />
            );                
        }); 
        return views;
    };

    /**
     * @description Search TranscriptListItem for keywords
     * @param {Array} keyword_list 
     * keywords to search for in rendered TranscriptListItems
     * @param {String} captionText - a TranscriptListItem's text
     * @returns {boolean} true: keyword found in TranscriptListItem's text
     */
    const keysInTranscript = (keyword_list, captionText) => { 
        return keyword_list.some((keyword) => { 
            return captionText.toLowerCase().includes(keyword.toLowerCase());
        });
    };

    /**
     * @description 
     *  Sets show={true|false} prop on a TranscriptCaptionItem.
     *  A user searches all rendered TranscriptCaptionItems
     *  using a set of keywords. All TranscriptCaptionItems 
     *  containing a keyword in the keyword_list will have their
     *  show prop set to true. 
     * @param {String} captionText - a TranscriptCaptionItem's text 
     * @returns {Boolean} true: show respective TranscriptCaptionItem
     */
    const viewShouldShow = (captionText) => { // show: true | false
        if (keywords.length !== 0) {
            var keyword_list = keywords.replace(/\s+/g,'').split(',');
            return keysInTranscript(keyword_list, captionText);
        }
        else { return true };          
    }

    /**
     * @description Merge old transcriptCaptions with new tramscriptCaptions
     * @param {Number} idx - index of a TranscriptCaptionItem 
     * @param {String} text - updated transcriptCaption state
     */
    const handleTranscriptCaption = (update_index, new_transcriptObject) => { 
        console.log('Handling transcript caption update...')
        var newCaptionObjects = transcriptCaptions.map((past_transcriptObject, curr_index) => {
            return curr_index === update_index ? 
            new_transcriptObject
            : 
            past_transcriptObject;
        });
        setTranscriptCaptions(newCaptionObjects)
    }

    /**
     * @description
     *  Set/merge new captionViews after changing
     *  transcriptCaptions or keywords. 
     *  transcriptCaptions is updated when
     *  a TranscriptCaptionItem is altered
     *  and then the changes are saved. 
     *  keywords is updated when a user searches
     *  for TranscriptCaptionItems that contain
     *  certain keywords; the matching TranscriptListItems
     *  will be shown via boolean value show prop. 
     * @returns TranscriptListItem[]
     */
    function updateCaptionViews() { // show: true | false
        console.log('Updating caption views...');
        var newCaptionViews = captionViews.map(view => {
            var idx = parseInt(view.props.index); // use current key
            var transcriptCaption = transcriptCaptions[idx].text;
            var new_view = {
                ...view, 
                props: {
                    ...view.props,
                    show: viewShouldShow(transcriptCaption), // filter on keywords
                    text: transcriptCaption // replace text
                }
            }
            return new_view;
        });
        setCaptionViews(newCaptionViews);
    }
    
    return (
        <View style={styles.rootContainer}>
             <View style={styles.videoContainer}>
                { (file_type === 'video' && uri) && 
                <Video
                    source={{ uri: uri }}
                    positionMillis={playBackTime}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={false}
                    isLooping={false}
                    useNativeControls
                    style={{ flex: 1}}
                />
                }
            </View>
            <View style={styles.transcriptContainer} >
                <View style={styles.searchBar}>
                    <SearchBar onSubmit={setKeywords} />
                </View>
                <ScrollView 
                    style={styles.scrollView}
                    indicatorStyle='black'
                    persistentScrollbar={true}
                >
                    { captionViews }
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginHorizontal: 20,
    },

    // same container 
    videoContainer: {
        flex: .4,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 3,
    },
    transcriptContainer: {
        flex: .6,
        justifyContent: 'center',
        alignContent: 'center',
    },

    // same container 
    searchBar: {
        flex: .2, 
        minHeight: 50,
        maxHeight: 50,
        marginVertical: 5
    },
    scrollView: {
        flex: 1,
        // borderWidth: 2,
        // borderRadius: 3,
        // backgroundColor: 'white',
        padding: 5,
    }
});

export default TranscriptDetailsScreen; 