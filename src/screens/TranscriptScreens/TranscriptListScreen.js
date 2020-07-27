/*
This screen hosts a user's transcripts.
The transcripts are rendered in a FlatList.
If a user clicks on an item in the FlatList
(a transcript), they will be directed to 
that transcript's TranscriptDetailScreen. 
*/
import { firebase } from '../../../server/firebase/config';
import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet,
    FlatList, 
    SafeAreaView } 
from 'react-native';
// import styles from './styles';
import Item from '../../components/misc/Item';
import { Loading } from '../../components';

export default function TranscriptsListScreen ({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [transcripts, setTranscripts] = useState([]);
    const [selectId, setSelectId] = useState(null);
    
    // useEffect(() => { // get transcripts
    //     console.log('Render action (TranscripListScreen)')
    //     var user = firebase.auth().currentUser;
    //     if (user) {
    //         // Get transcripts from database
    //         const subscribe = firebase.firestore()
    //                 .collection('Users')
    //                 .doc(user.uid)
    //                 .collection('transcripts')
    //                 .onSnapshot(snapshot => {
    //                     const transcripts = [];
    //                     snapshot.forEach(transcript => {
    //                         console.log('transcript: ', transcript)
    //                         transcripts.push({
    //                             ...transcript.data(),
    //                             key: transcript.id,
    //                         });
    //                     });
    //                     setTranscripts(transcripts);
    //                     setLoading(false);
    //                 });

    //         return () => subscribe();
    //     }
    //     else { throw new Error('Error: user not recognized') }
    // },[]);
    
    // test data
    const test_file_info = { 
        type:'video', 
        uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fwavely-e3e07459-e462-4db5-8544-e83bed15870e/ImagePicker/fca89a98-4784-4521-8a66-946cbe89ffbd.mp4',
        width: null, 
        height: null,
        duration: '0.5'
    };
    const data_captions = { 
        audio_name: 'testing_ui',
        speech_data: [
            {
                transcript: {
                    text: 'Hello to you all!',
                    time_span: { startSecs: '17', endSecs: '1.5' },
                    confidence: .68
                },
                words: []
            },
            {
                transcript: {
                    text: 'We will learn to code.',
                    time_span: { startSecs: '1.5', endSecs: '3.2' },
                    confidence: .9
                },
                words: []
            },
            {
                transcript: {
                    text: 'Lets begin now',
                    time_span: { startSecs: '3.2', endSecs: '4.5' },
                    confidence: .55
                },
                words: []
            }
        ]
    };
    const TEST_DATA = [ 
        { // do not rerender on transcript set
            id: Math.random().toString(),
            file_info: test_file_info,
            name: 'test1',
            date: 'monday',
            data: {
                ...data_captions
            }
        },
        { // do not rerender on transcript set
            id: Math.random().toString(),
            file_info: test_file_info,
            name: 'test2',
            date: 'monday',
            data: {
                ...data_captions
            }
        },
        { // do not rerender on transcript set
            id: Math.random().toString(),
            file_info: test_file_info,
            name: 'test3',
            date: 'monday',
            data: {
                ...data_captions
            }
        },
        { // do not rerender on transcript set
            id: Math.random().toString(),
            file_info: test_file_info,
            name: 'test4',
            date: 'monday',
            data: {
                ...data_captions
            }
        },
    ];

    const handleLoadPage = (item) => { // go to its details page 
        navigation.navigate('TranscriptDetail', { name: 'TranscriptDetail',  data: item });
    };

    const renderItem = ({ item }) => {
        return (
            <Item // manage presentation in Item.js
                item={item}
                onPress={() => { 
                    setSelectId(item.id); 
                    handleLoadPage(item);
                }} // create custom page
                style={styles.item}
            />
        );
    };
    return ( 
        <>
        <Loading visible={isLoading} />
        <View style={styles.rootContainer}>
            <SafeAreaView>
                <FlatList
                    data={TEST_DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectId}
                />
            </SafeAreaView>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignContent: 'center',
    },
    item: {
        flex: 1,
        backgroundColor: 'silver',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 3,
        borderBottomColor: 'black'
    },
})
