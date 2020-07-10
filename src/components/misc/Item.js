import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity} 
from 'react-native';
import ExportIcon from 'react-native-vector-icons/Entypo';


const Item = ({item, onPress, style}) => { 
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <View style={styles.leftItem}>
                <Text style={{color: 'black'}}> Date: {item.date} </Text>
                <Text style={{color: 'black'}}> Length: {item.time} </Text>
            </View>
            <View style={styles.middleItem}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}> 
                    {item.name} 
                </Text>
            </View>
            <View style={styles.rightItem}>
                <View style={styles.exportIcon}>
                    <ExportIcon.Button 
                        name='export' 
                        size={25} 
                        backgroundColor='black'
                        onPress={() => console.log('Export modal')} 
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rightItem: {
        // backgroundColor: 'green',
        flexDirection: 'column',
        alignItems: 'center'
    },
    leftItem: {
        // backgroundColor: 'blue',
        flexDirection: 'column'
    },
    middleItem: {
        // backgroundColor: 'orange',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }, 
    exportIcon: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
});

export default Item; 