import { firebase } from '../../../server/firebase/config';
// import user_functions from './user_functions.js';
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { 
    Image, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View } 
from 'react-native'
import { Loading } from '../../components/index'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function LoginScreen({navigation}) {

    // firebase // set login persistence
    // .auth()
    // .setPersistence(firebase.auth.Auth.Persistence.LOCAL); 

    const setUser = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Register');
    }
    
    const loginWithEmailPass = (email, password) => {
        setIsLoading(true);
        firebase // login
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid;
            firebase
            .firestore().collection('users')
            .doc(uid)
            .get()
            .then(firestoreDocument => {
                if (!firestoreDocument.exists) {b 
                    alert("User does not exist anymore.")
                    return;
                }
                const user = firestoreDocument.data()
                setIsLoading(false);
                setUser(user);
            
            })
            .catch(error => {
                setIsLoading(false); 
                alert(error)
            });
        })
        .catch(error => {
            setIsLoading(false);
            alert(error)
        })
    }

    return ( 
        <>
        { isLoading ? 
        (<Loading visible={isLoading} />)
        :
        (<View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                            // setUser(true);
                            loginWithEmailPass(email, password)
                        }
                    }>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>)
    }
    </>
    )
}