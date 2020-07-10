import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    videoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    video: { 
        flex: 1,
        height: height/2,
        width: width
    },
})
export default styles; 