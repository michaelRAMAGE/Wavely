/*
TranscriptDetailScreen hosts
specific data about a specific
transcript. TranscriptListScreen 
has a FlatList with items. When 
an item is clicked, this page will
be generated provided navigation data. 
*/
import React, { useContext, useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,  
    Dimensions, 
    ScrollView,
    Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { HeaderContext } from '../../contexts/HeaderContext';
import { SearchBar } from '../../components/index';
import { Video } from 'expo-av';

/* 
- Make the transcript editable
- Highlight transcript words based on confidence levels
- Export to multiple platforms 
- Send the document to email (basically the same as in TranscriptListScreen)
- Throw error when video uri cannot be found
-- Should we also save videos to our database or ...?
- Account for small transcript, take up less space or use filler
*/


const TranscriptDetailsScreen = ({ navigation, route }) => {
    const { width, height } = Dimensions.get('window');
    const [keywords, setKeywords] = useState(null);
    // const { 
    //     file_info, name, date, data 
    // } = route.params.data; // received from transcriptlistitem
    
    // Test data below for tuning UI
    const file_info = { 
        type:'video', 
        uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fwavely-e3e07459-e462-4db5-8544-e83bed15870e/ImagePicker/fca89a98-4784-4521-8a66-946cbe89ffbd.mp4'
    };
    const data = {
        audio_name: 'testing_ui',
        speech_data: [
            {
                text: 'Hello to you all!',
                time_span: { startSecs: '0', endSecs: '1.5' }
            },
            {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' }
            },
            {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' }
            },
            {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' }
            },
            {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' }
            },
            {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' }
            },
            {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' }
            },
            {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' }
            },
            {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' }
            },
            {
                text: 'We will learn to code.',
                time_span: { startSecs: '1.5', endSecs: '3.2' }
            },
            {
                text: 'Lets begin now',
                time_span: { startSecs: '3.2', endSecs: '4.5' }
            },
        ]
    };


    // const header = useContext(HeaderContext);
    // const isFocused = useIsFocused();
    
    // useEffect(() => { // takes a second to refresh
    //     if (isFocused) {
    //         console.log('TranscriptDetailsScreen is focused')
    //         header.setHeader(header.headerSets.set1.header);      
    //     }; 
    //     return () => { header.setHeader(header.headerSets.initial.header) };
    // },[navigation]);

    const keysInTranscript = (keyword_list, transcript_text) => { // search a transcript chunk
        return keyword_list.some((elem, idx, arr) => { 
            // console.log('elem: ', elem)
            // console.log('text: ', transcript_text)
            // console.log('result: ', transcript_text.toLowerCase().includes(elem.toLowerCase())+'\n')
            return transcript_text.toLowerCase().includes(elem.toLowerCase());
        });
    };

    const getTranscriptViews = () => {
        var keyword_list = keywords ? keywords.replace(/\s+/g,'').split(',') : '';
        // console.log('Keyword list: ', keyword_list)
        const views = data.speech_data.map((transcript_obj, key) => {
            const get_view = () => { 
                return (
                    <View 
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row', 
                            padding: 5}
                        } 
                        key={key}>
                        <Text> 
                            {transcript_obj.text}
                        </Text>
                        <Text> 
                            { transcript_obj.time_span.startSecs.toString() 
                            + ' - ' +
                            transcript_obj.time_span.endSecs.toString()
                            + ''}
                        </Text>
                    </View>
                );
            };
            // will the first render wait for map to complete?
            if (keyword_list !== '') {
                if (keysInTranscript(keyword_list, transcript_obj.text)) { 
                    // console.log('Found')
                    return get_view(); 
                }
            }
            else {
                return get_view(); 
            }
        }); 
        return views;
    };

    return (
        <View style={styles.rootContainer}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <SearchBar onSubmit={setKeywords} />
                </View>
                <ScrollView 
                    style={styles.transcriptBody}
                    indicatorStyle='black'
                    persistentScrollbar={true}
                    
                >
                { data ? 
                    getTranscriptViews()   
                    : 
                    <></>
                } 
                </ScrollView>
            </View> 
            <View style={styles.videoContainer}>
                { (file_info.type === 'video' && file_info.uri) && 
                <Video
                    source={{ uri: file_info.uri }}
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

        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    searchContainer: {
        flex: .4,
        justifyContent: 'center',
        alignContent: 'center'
    },
    videoContainer: {
        flex: .6,
        margin: 10,
        borderWidth: 1,
        borderRadius: 3
    },
    transcriptBody: {
        flex: .85,
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: 'white'

    },
    searchBar: {
        flex: .2, // works but huge
        minHeight: 25,
        maxHeight: 50
    },

});

export default TranscriptDetailsScreen; 