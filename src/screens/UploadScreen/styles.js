import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    videoContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    video: { 
        height: height/2,
        width: width
    }
})