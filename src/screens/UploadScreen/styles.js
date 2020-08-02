import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,

        alignContent: 'center'
    },
    videoContainer: {
        flex: 1,
        margin: 10,
    }
})
export default styles; 