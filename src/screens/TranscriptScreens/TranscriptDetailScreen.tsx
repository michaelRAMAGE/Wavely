/*
About: TranscriptDetailScreen hosts
specific data about a specific
transcript. TranscriptListScreen 
has a FlatList with items. When 
an item is clicked, this page will
be generated provided navigation 
route parameter data. 

Flow: When a captionObject's text changes on
a TranscriptCaptionView, TranscriptCaptionView's
onAltered prop function is called, which is set to
handleTranscriptCaption() in this component. When
this function is called, setTranscriptCaption is
used to update transcriptCaptions, which is detected
by useEffect (look in its dependencies). Following
the dependency change, updateCaptionViews is called
and the new text is merged, and if any keywords have
been entered for filtering on the captions, those will
e accounted for with show prop on TranscriptCaptionView.
*/

/* 
- Export to multiple platforms 
- Send the document to email (basically the same as in TranscriptListScreen)
- Throw error when video uri cannot be found --> 
-- Should we also save videos to our database or ...?
*/

import { update_transcript } from '../../../server/firebase/functions/index.js';
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
    TranscriptCaptionView, 
    useConstructor
} from '../../components/index';
import { Video } from 'expo-av';
import { Caption } from '../../types';

const TranscriptDetailScreen = ({ route }) => {
    const { width, height } = Dimensions.get('window');
    const { 
        key,
        id,
        file_info: { 
            uri: file_uri, 
            width: vid_width, // if video, available to use on <Video>
            height: vid_height, // if video, available to use <Video>
            type: file_type
        },
        response_data: {
            speech_data
        },
        data
    } = route.params.page_data; 
    const [transcriptCaptions, setTranscriptCaptions] = useState<Array<Caption>>(speech_data);
    const [captionViews, setCaptionViews] = useState<Array<TranscriptCaptionView>>([]); 
    const [keywords, setKeywords] = useState<Array<string>>([]);
    const [playBackTime, setPlayBackTime] = useState<number>(0); 

    /*
    Custom hook that runs code before the initial render.
    Sets initial captionViews state provided data via
    navigation route parameter. 
    */
    useConstructor(() => {
        var views = initCaptionViews();
        setCaptionViews([...captionViews, views]);
    }); 

    /*
    This useEffect manages captionViews update calls
    based on the state dependencies keywords and
    transcriptCaptions. onUnmounComponent cleans up.
    */
    useEffect(() => { 
        updateCaptionViews();
    }, [transcriptCaptions, keywords]);    

    /*
    On unmountComponent
    */
    useEffect(()=> { return () => unmountDetailsScreen() }, []);

    /**
     * @description Reset user induced states and save updates on exit
     */
    const unmountDetailsScreen = () => {
        update_transcript(key, transcriptCaptions);
        setPlayBackTime(0);
        setKeywords([]);
    };   

    /**
     * @description Initializes captionViews state
     * @returns an initial array to set captionViews state
     */
    function initCaptionViews(): Array<TranscriptCaptionView> { 
        // create views (reuse them, show: true | false)
        console.log('[TranscriptDetailScreen:initCaptionViews] Initializing caption views...')
        const initial_caption_views = transcriptCaptions.map((transcriptCaption, view_idx) => {
            return (
                <TranscriptCaptionView
                    key={view_idx} // react expects this but this should not be read or modified
                    index={view_idx} // this, instead of key, is used for modifications and updates
                    setPlayBackTime={setPlayBackTime}
                    transcriptCaption={transcriptCaption}
                    onSave={(index: number, caption: Caption) => {
                         handleTranscriptCaption(index, caption);
                    }}
                    show={true} 
                />
            );                
        }); 
        return initial_caption_views;
    };

    /**
     * @description Iterate over keywords and check if atleast one
     * appears in a given captionText
     * @param captionText - a specific Caption's text
     */
    const kwInCaptionText = (captionText: string): boolean => { 
        return keywords.some((keyword: string) => { 
            return captionText.toLowerCase().includes(keyword.toLowerCase());
        });
    };

    /**
     * @description To display or to not, that is the question. 
     * Used for setting show prop on TranscriptCaptionView to true or false.
     * @param captionText - a specific Caption's text
     */
    const viewShouldShow = (captionText: string): boolean => { 
        if (keywords.length !== 0) {
            return kwInCaptionText(captionText);
        }
        else { return true };          
    }

    /**
     * @description Handler passed to onSubmit prop of <SearchBar> component. 
     * @param {string} s_keywords - <SearchBar> passes string of keywords onSubmit
     */
    const handleSearchKW = (s_keywords: string) => {
        var keyword_list = s_keywords.replace(/\s+/g,'').split(',');
        setKeywords(keyword_list);
    }

    /**
     * @description Merge old transcriptCaptions with new transcriptCaptions
     * @param update_index - Index of a modified Caption in transcriptCaptions
     * @param newTranscriptCaption - New Caption to replace old Caption
     */
    const handleTranscriptCaption = (update_index: number, newTranscriptCaption: Caption) => { 
        console.log('[TranscriptDetailScreen:handleTranscriptCaption] \
        Handling transcript caption update...');
        var newTranscriptCaptions = transcriptCaptions.map((pastTranscriptCaption, curr_index) => {
            return curr_index === update_index ? 
            newTranscriptCaption
            : 
            pastTranscriptCaption;
        });
        setTranscriptCaptions(newTranscriptCaptions)
    }

    /**
     * @description
     *  Set/merge new captionViews after changing
     *  transcriptCaptions or keywords. 
     *  transcriptCaptions is updated when
     *  a TranscriptCaptionView is altered
     *  and then the changes are saved. 
     *  keywords is updated when a user searches
     *  for TranscriptCaptionViews that contain
     *  certain keywords; the matching TranscriptListItems
     *  will be shown via boolean value show prop. 
     * @returns TranscriptListItem[]
     */
    function updateCaptionViews() { // show: true | false
        console.log('Updating caption views...');
        var newCaptionViews = captionViews.map(view => {
            var idx = parseInt(view.props.index); // use current key
            console.log('Transcript captions: ', transcriptCaptions)
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
                { (file_type === 'video' && file_uri) && 
                <Video
                    source={{ uri: file_uri }}
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
                    <SearchBar onSubmit={handleSearchKW} />
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

export default TranscriptDetailScreen; 