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
import { SearchBar, useTitle } from '../../components/index';

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

    const TEST_DATA = [ 
        { // do not rerender on transcript set
            id: Math.random().toString(),
            file_info: {
                duration: '0.5'
            }, // should one state reference another?
            name: 'test1',
            date: 'monday',
            data:  {
                audio_name: 'test', 
                speech_data: []
            }   
        },
        { // do not rerender on transcript set
            id: Math.random().toString(),
            file_info: {
                duration: '0.5'
            }, // should one state reference another?
            name: 'test2',
            date: 'monday',
            data:  {
                audio_name: 'test', 
                speech_data: []
            }   
        },
        { // do not rerender on transcript set
            id: Math.random().toString(),
            file_info: {
                duration: '0.5'
            }, // should one state reference another?
            name: 'test3',
            date: 'monday',
            data:  {
                audio_name: 'test', 
                speech_data: []
            }   
        },
        { // do not rerender on transcript set
            id: Math.random().toString(),
            file_info: {
                duration: '0.5'
            }, // should one state reference another?
            name: 'test4',
            date: 'monday',
            data:  {
                audio_name: 'test', 
                speech_data: []
            }   
        },
    ];

    const handleLoadPage = (item) => { // go to its details page 
        navigation.navigate('TranscriptDetail', 
        { name: 'TranscriptDetail',  data: item });
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
