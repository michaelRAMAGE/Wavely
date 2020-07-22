/*
TranscriptDetailScreen hosts
specific data about a specific
transcript. TranscriptListScreen 
has a FlatList with items. When 
an item is clicked, this page will
be generated provided navigation data. 
*/
import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,  
    Dimensions, 
    ScrollView,
    Platform, 
} from 'react-native';
import { 
    SearchBar, 
    TranscriptCaptionItem, 
    useConstructor
} from '../../components/index';
import { Video } from 'expo-av';
import EditIcon from 'react-native-vector-icons/AntDesign' // options


/* 
- Make the transcript editable
- Highlight transcript words based on confidence levels
- Export to multiple platforms 
- Send the document to email (basically the same as in TranscriptListScreen)
- Throw error when video uri cannot be found
-- Should we also save videos to our database or ...?
- Account for small transcript, take up less space or use filler
*/

const TranscriptDetailsScreen = ({ route }) => {
    // const { width, height } = Dimensions.get('window');
    const [captionViews, setCaptionViews] = useState(null); // set the views
    const [transcriptCaptions, setTranscriptCaptions] = useState(null); // set the text
    const [keywords, setKeywords] = useState(null);
    const [playBackTime, setPlayBackTime] = useState(0); 
    const { 
        name, date
    } = route.params.data;

    // life-cycle control
    useConstructor(() => { // before first render (init)
        console.log('Before first render (useConstructor)');
        initTranscriptCaptions(); 
        getCaptionViews() } ); 
    useEffect(() => { // after each render
        console.log('After render (useEffect1)');
        getCaptionViews()
    }, 
        [transcriptCaptions, keywords]
    ); 
    
    const file_info = { 
        type:'video', 
        uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fwavely-e3e07459-e462-4db5-8544-e83bed15870e/ImagePicker/fca89a98-4784-4521-8a66-946cbe89ffbd.mp4'
    };

    const data = {
        audio_name: 'testing_ui',
        speech_data: [
            {
                text: 'Hello to you all!',
                time_span: { startSecs: '17', endSecs: '1.5' },
                confidence: .68
            },
            {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' },
                confidence: .9
            },
            {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' },
                confidence: .55
            },
            {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' },
                confidence: .7
            },
            {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' },
                confidence: .8
            },
            {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' },
                confidence: .1
            },
            {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' },
                confidence: .2
            },
            {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' },
                confidence: .3
            },
            {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' },
                confidence: .4
            },
            {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' },
                confidence: .5
            },
            {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' },
                confidence: .6
            },
        ]
    };

    const initTranscriptCaptions = () => {
        const captions = data.speech_data.map((transcript_obj, key) => {
            return transcript_captions.push(transcript_obj); 
        }); 
        setTranscriptCaptions(captions); 
    }

    const keysInTranscript = (keyword_list, transcript_text) => { // search a transcript chunk
        return keyword_list.some((elem, idx, arr) => { 
            return transcript_text.toLowerCase().includes(elem.toLowerCase());
        });
    };

    const getCaptionViews = () => { 
        var keyword_list = keywords ? keywords.replace(/\s+/g,'').split(',') : null;
        const views = data.speech_data.map((transcript_obj, key) => {
            if (keyword_list) {d
                if (keysInTranscript(keyword_list, transcript_obj.text)) { 
                    return (
                        <TranscriptCaptionItem
                            view_key={key}
                            transcript_obj={transcript_obj}
                            setPlayBackTime={setPlayBackTime}
                        />
                    ); 
                }
            }
            else { 
                return (
                    <TranscriptCaptionItem
                        view_key={key}
                        transcript_obj={transcript_obj}
                        setPlayBackTime={setPlayBackTime}
                    />
                );                
            }
        }); 
        setCaptionViews(views);
    };

    return (
        <View style={styles.rootContainer}>
             <View style={styles.videoContainer}>
                { (file_info.type === 'video' && file_info.uri) && 
                <Video
                    source={{ uri: file_info.uri }}
                    // ref={_handleVideoRef}
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
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <SearchBar onSubmit={setKeywords} />
                </View>
                <ScrollView 
                    style={styles.transcriptBody}
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
    },
    searchContainer: {
        flex: .6,
        justifyContent: 'center',
        alignContent: 'center'
    },
    videoContainer: {
        flex: .4,
        margin: 10,
        borderWidth: 1,
        borderRadius: 3
    },
    transcriptBody: {
        flex: .80,
        marginHorizontal: 20,
        borderWidth: 2,
        borderRadius: 3,
        backgroundColor: 'white',
        padding: 5,
        zIndex:1

    },
    searchBar: {
        flex: .2, // works but huge
        minHeight: 30,
        maxHeight: 50
    },

});

export default TranscriptDetailsScreen; 