import * as React from 'react';
import {useEffect, useState} from 'react';
import {Avatar, Button, TextInput, ToggleButton, TouchableRipple} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {login, logout, setLanguage, setModalScreen, setNightMode, setUnits} from "../../store/actions/actions";
import {View} from "react-native";
import {getLanguageTranslations} from "../common/languages/languageSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

const style = {
    langView: {
        flexDirection: 'row',
        width: '100%'
    },
    selected: {
        color: '#0f0a'
    },
    notSelected: {
        color: '#0000'
    },
    loginButtonStyle: {
        flexDirection: 'row',
        width: '100%'
    },
    accountButtonsStyle: {},
    accountView: {}
}

const langs = ['en', 'ro'];

const languageImages = {
    normal: {
        ro: require('../../res/ro.png'),
        en: require('../../res/en.png'),
        de: require('../../res/de.png'),
    },
    selected: {
        ro: require('../../res/ro_selected.png'),
        en: require('../../res/en_selected.png'),
        de: require('../../res/de_selected.png'),
    }
}

GoogleSignin.configure({
    webClientId: "943316841319-l2mg8bl09aq9m3a65e62b9iu7em1i6s3.apps.googleusercontent.com",
});

export const SettingsModal = () => {
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.screen.nightMode);
    const language = useSelector(state => state.screen.language);
    const units = useSelector(state => state.screen.units);
    const userEmail = useSelector(state => state.screen.email);
    const translations = getLanguageTranslations(language);

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [accountState, setAccountState] = useState('main');

    useEffect(() => {
    }, []);

    const toggleNightMode = async () => {
        await AsyncStorage.setItem('nightMode', !nightMode ? 'on' : 'off');
        dispatch(setNightMode(!nightMode));
    }

    const saveLang = async (lang) => {
        await AsyncStorage.setItem('lang', lang);
        dispatch(setLanguage(lang));
    }

    const saveUnits = async (units) => {
        await AsyncStorage.setItem('units', units);
        dispatch(setUnits(units));
    }

    const getLanguageImages = () => {
        return langs.map(lang => {
                const image = lang === language ?
                    Object.entries(languageImages.selected).filter(entry => entry[0] === lang)[0][1] :
                    Object.entries(languageImages.normal).filter(entry => entry[0] === lang)[0][1];
                return <TouchableRipple onPress={() => saveLang(lang)}
                                        mode="contained" title="lang">
                    <Avatar.Image size={50}
                                  source={image}/>
                </TouchableRipple>
            }
        )
    }

    const mainButtons = () => {
        return (
            <View style={style.loginButtonStyle}>
                <Button mode="contained" title="Sign up" onPress={() => setAccountState('sign-up')}>
                    Sign up
                </Button>
                <Button
                    mode="contained"
                    title="Sign in"
                    icon="email"
                    onPress={() => setAccountState('sign-in')}/>
                <Button
                    mode="contained"
                    title="Google Sign-In"
                    icon="google"
                    onPress={() => onGoogleButtonPress()}/>
            </View>
        )
    }

    const signInButtons = () => {
        return (
            <View>
                <Button
                    key={1}
                    onPress={() => dispatch(setModalScreen('main'))}
                    icon="arrow-left-thick"
                > Back </Button>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}>
                </TextInput>
                <TextInput
                    label="Password"
                    value={pass}
                    onChangeText={text => setPass(text)}>
                </TextInput>
                <Button type="contained" onPress={() => signIn()}>Login</Button>
                <Button type="contained" onPress={() => setAccountState('forgot')}>Forgot Password</Button>
            </View>
        )
    }

    const forgotButtons = () => {
        return (
            <View>
                <Button
                    key={1}
                    onPress={() => dispatch(setModalScreen('main'))}
                    icon="arrow-left-thick"
                > Back </Button>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}>
                </TextInput>
                <Button type="contained" onPress={() => forgotPassword()}>Send reset email</Button>
            </View>
        )
    }

    const signUpButtons = () => {
        return (
            <View>
                <Button
                    key={1}
                    onPress={() => dispatch(setModalScreen('main'))}
                    icon="arrow-left-thick"
                > Back </Button>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}>
                </TextInput>
                <TextInput
                    label="Password"
                    value={pass}
                    onChangeText={text => setPass(text)}>
                </TextInput>
                <TextInput
                    label="Confirm Password"
                    value={confirmPass}
                    onChangeText={text => setConfirmPass(text)}>
                </TextInput>
                <Button onPress={() => signUp()}>Login</Button>
            </View>
        )
    }

    const logoutButtons = () => {
        return (
            <Button mode="contained" title="Sign out" onPress={() => signOut()}>
                Sign out
            </Button>
        )
    }

    const getAccountView = () => {
        if (!!userEmail && userEmail !== '') {
            return logoutButtons();
        } else {
            switch (accountState) {
                case 'main':
                    return mainButtons();
                case 'sign-in':
                    return signInButtons();
                case 'sign-up':
                    return signUpButtons();
                case 'forgot':
                    return forgotButtons();
                default:
                    return mainButtons();
            }
        }
    }

    const forgotPassword = () => {
        auth().sendPasswordResetEmail(email).then(() => {
        });
        setAccountState('main')
    }

    const signOut = () => {
        auth().signOut().then(() => {
        })
        auth().onAuthStateChanged((user) => {
            if (!user) {
                dispatch(logout());
            }
        })
    }

    const signUp = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && pass === confirmPass) {
            auth()
                .createUserWithEmailAndPassword(email, pass)
                .then((userCred) => {
                    dispatch(login(userCred.user.email))
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            return;
        }
    }

    const signIn = () => {
        auth()
            .signInWithEmailAndPassword(email, pass)
            .then((userCred) => dispatch(login(userCred.user.email)))
            .catch(error => console.log(error))
    }

    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}); // <-- Add this
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.log(error.message);
        }
        auth().onAuthStateChanged((user) => {
            if (!user) {
                dispatch(logout());
            } else {
                dispatch(login(user.email))
            }
        })
    }

    return [
        <Button
            key={1}
            onPress={() => dispatch(setModalScreen('main'))}
            icon="arrow-left-thick"
        > Back </Button>,
        <Button icon="camera" mode="contained" onPress={() => toggleNightMode()}>
            {nightMode ? translations.switchLightMode : translations.switchNightMode}
        </Button>,
        <View style={style.langView}>
            {getLanguageImages()}
        </View>,
        <ToggleButton.Row onValueChange={value => saveUnits(value)} value={units} key={3}>
            <ToggleButton icon="ruler" value="metric"/>
            <ToggleButton icon="crown-outline" value="imperial"/>
        </ToggleButton.Row>,
        <View style={style.accountView}>
            {getAccountView()}
        </View>
    ]
};