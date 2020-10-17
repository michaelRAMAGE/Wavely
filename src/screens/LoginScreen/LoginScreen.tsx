import { get_user } from '../../../server/firebase/functions/index.js';
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../components/index';
import { 
    Image, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Alert} 
from 'react-native'
import { Loading } from '../../components/index'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function LoginScreen({navigation}) {

    const setUser: React.Dispatch<any> = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onFooterLinkPress = () => {
        navigation.navigate('Register');
    }
    useEffect(() => {
        return () => { console.log('Unmounting component')}
    })
    const loginWithEmailPass = async () => {
        setIsLoading(true);
        const user_in = await get_user(email, password);
        if (!user_in) {
            setEmail('');
            setPassword('');
        }
        else { 
            console.log('Updating state')
            setUser(user_in); 
        }
        setIsLoading(false); 
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
                            loginWithEmailPass()
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