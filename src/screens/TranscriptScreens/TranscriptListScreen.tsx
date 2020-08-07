/*
This screen hosts a user's transcripts.
The transcripts are rendered in a FlatList.
If a user clicks on an item in the FlatList
(a transcript), they will be directed to 
that transcript's TranscriptDetailScreen. 
*/

/*
Issue: 

Refreshing takes awhile.
New transcript takes a while to appear.

After updating file in database, opening it
again does not give new, updated file. We will
do a local update in the meantime. 
This could have to do with listening on the
specific document. 
- This seems to be because update is not updating the
doc. 
*/
import { load_all_transcripts } from '../../../server/firebase/functions/index.js';
import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet,
    FlatList, 
    SafeAreaView } 
from 'react-native';
import Item from '../../components/misc/Item';
import { Loading } from '../../components';
import { Transcript } from '../../types';

export default function TranscriptsListScreen ({ navigation }) {
    const [isLoading, setLoading] = useState<Boolean>(false);
    const [transcripts, setTranscripts] = useState<Array<Transcript>>([]);
    const [selectId, setSelectId] = useState<string>(null);

    useEffect(() => { // Get transcripts
        console.log('[TranscriptListScreen:useEffect()] TranscriptListScreen render')
        var f_clean = load_all_transcripts(setTranscripts);
        return () => f_clean(); 
    },[]);
    
    const handleLoadPage = (item: Transcript) => { // go to its details page 
        console.log('[TranscriptListScreen:handleLoadPage()] Loading page with following data: ', item)
        navigation.navigate('TranscriptDetail', { page_data: item });
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
                    data={transcripts}
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
