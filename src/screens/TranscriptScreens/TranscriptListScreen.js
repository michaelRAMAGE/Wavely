import { firebase } from '../../../server/firebase/config';
import React, { useState, useContext, useEffect } from 'react';
import { 
    View, 
    StyleSheet,
    FlatList, 
    SafeAreaView } 
from 'react-native';
// import styles from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import Item from '../../components/misc/Item';


export default function TranscriptsListScreen ({navigation}) {
    const setUser = useContext(AuthContext);  
    const [isLoading, setLoading] = useState(false);
    const [transcripts, setTranscripts] = useState([]);
    const [selectId, setSelectId] = useState(null);
    // useEffect(() => {    
    //     firebase.firestore()
    //             .collection('Users')
    //             .doc(uid)
    //             .collection('transcripts')
    //             .onSnapshot(snapshot => {
    //                 const transcripts = [];
    //                 snapshot.forEach(transcript => {
    //                     tramscripts.push({})
    //                 })
    //             })
    // },[])
    const TEST_DATA = [
        {
            id: Math.random().toString(),
            name: 'Title1',
            date: 'monday',
            time: '0:53',
            transcript: 'hello my friend'

        },
        {
            id: Math.random().toString(),
            name: 'Title2',
            date: 'tuesday',
            time: '0:28',
            transcript: 'welcome to my channel'
        },
        {
            id: Math.random().toString(),
            name: 'Title3',
            date: 'wednesday',
            time: '0:55',
            transcript: 'today we will learn about cut vertices'
        },
        {
            id: Math.random().toString(),
            name: 'Title4',
            date: 'monday',
            time: '0:53',
            transcript: 'hello my friend'

        },
        {
            id: Math.random().toString(),
            name: 'Title5',
            date: 'tuesday',
            time: '0:28',
            transcript: 'welcome to my channel'
        },
        {
            id: Math.random().toString(),
            name: 'Title6',
            date: 'wednesday',
            time: '0:55',
            transcript: 'today we will learn about cut vertices'
        },
    ];

    const handleLoadPage = (item) => { // go to its details page 
        navigation.navigate('TranscriptDetail', 
        { name: 'TranscriptDetail',  data: item });
    };

    const renderItem = ({ item }) => {
        return (
            <Item 
                item={item}
                onPress={() => { 
                    setSelectId(item.id); 
                    handleLoadPage(item);
                }} // create custom page
                style={styles.item}
            />
        );
    };
    // Fetch transcripts
        // Only load when a NEW transcript has been reproduced
        // We navigate to this page with data

    // List transcripts
    return ( 
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
