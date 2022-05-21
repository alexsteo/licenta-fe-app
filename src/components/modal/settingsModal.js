import * as React from 'react';
import {useEffect, useState} from 'react';
import {Avatar, Button, Text, TextInput, TouchableRipple} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {login, logout, setLanguage, setModalScreen, setNightMode, setUnits} from "../../store/actions/actions";
import {Image, View} from "react-native";
import {getLanguageTranslations} from "../common/languages/languageSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {ReturnButton} from "./returnButton";

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

const themeImages = {
    normal: {
        device: require('../../res/icons/device-black.png'),
        day: require('../../res/icons/sun-black.png'),
        night: require('../../res/icons/moon-black.png'),
    },
    selected: {
        device: require('../../res/icons/device-white.png'),
        day: require('../../res/icons/sun-white.png'),
        night: require('../../res/icons/moon-white.png'),
    }
}

const unitImages = {
    normal: {
        metric: require('../../res/icons/celsius-black.png'),
        imperial: require('../../res/icons/fahrenheit-black.png'),
    },
    selected: {
        metric: require('../../res/icons/celsius-white.png'),
        imperial: require('../../res/icons/fahrenheit-white.png'),
    }
}

GoogleSignin.configure({
    webClientId: "943316841319-l2mg8bl09aq9m3a65e62b9iu7em1i6s3.apps.googleusercontent.com",
});

export const SettingsModal = () => {
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.user.nightMode);
    const units = useSelector(state => state.user.units);
    const userEmail = useSelector(state => state.user.email);
    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [accountState, setAccountState] = useState('main');

    useEffect(() => {
    }, []);

    const toggleNightMode = async (nightM) => {
        await AsyncStorage.setItem('nightMode', nightM);
        dispatch(setNightMode(nightM));
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
                    {translations.signUp}
                </Button>
                <Button
                    mode="contained"
                    title="Email Sign in"
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
                > {translations.modalBackButton} </Button>
                <TextInput
                    label={translations.email}
                    value={email}
                    onChangeText={text => setEmail(text)}>
                </TextInput>
                <TextInput
                    secureTextEntry={true}
                    label={translations.password}
                    value={pass}
                    onChangeText={text => setPass(text)}>
                </TextInput>
                <Button type="contained" onPress={() => signIn()}>{translations.signIn}</Button>
                <Button type="contained"
                        onPress={() => setAccountState('forgot')}>{translations.forgotPassword}</Button>
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
                > {translations.modalBackButton} </Button>
                <TextInput
                    label={translations.email}
                    value={email}
                    onChangeText={text => setEmail(text)}>
                </TextInput>
                <Button type="contained"
                        onPress={() => forgotPassword()}>{translations.sendPasswordRecoveryEmail}</Button>
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
                > {translations.modalBackButton} </Button>
                <TextInput
                    label={translations.email}
                    value={email}
                    onChangeText={text => setEmail(text)}>
                </TextInput>
                <TextInput
                    secureTextEntry={true}
                    label={translations.password}
                    value={pass}
                    onChangeText={text => setPass(text)}>
                </TextInput>
                <TextInput
                    secureTextEntry={true}
                    label={translations.confirmPassword}
                    value={confirmPass}
                    onChangeText={text => setConfirmPass(text)}>
                </TextInput>
                <Button onPress={() => signUp()}>{translations.signUp}</Button>
            </View>
        )
    }

    const logoutButtons = () => {
        return (
            <Button mode="contained" title="Sign out" onPress={() => signOut()}>
                {translations.signOut}
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

    const getLanguageText = () => {
        switch (language) {
            case 'en':
                return translations.languageEnglish
            case 'ro':
                return translations.languageRomanian
            default:
                return ''
        }
    }

    const getUnitsText = () => {
        switch (units) {
            case 'metric':
                return translations.unitsMetric
            case 'imperial':
                return translations.unitsImperial
            default:
                return ''
        }
    }

    const getNightModeText = () => {
        switch (nightMode) {
            case 'night':
                return translations.nightModeNight
            case 'day':
                return translations.nightModeDay
            case 'device':
                return translations.nightModeDevice
            default:
                return ''
        }
    }

    return [
        <ReturnButton/>,
        <View style={style.langView}>
            <Text style={style.languageButtonsStyle.textStyle}>{translations.language}</Text>
            <View style={style.languageButtonsStyle}>
                <TouchableRipple onPress={() => toggleNightMode('day')}
                                 mode="contained" title="lang">
                    <Image source={nightMode === 'day' ? themeImages.selected.day : themeImages.normal.day}/>
                </TouchableRipple>
                <TouchableRipple onPress={() => toggleNightMode('night')}
                                 mode="contained" title="lang">
                    <Image source={nightMode === 'night' ? themeImages.selected.night : themeImages.normal.night}/>
                </TouchableRipple>
                <TouchableRipple onPress={() => toggleNightMode('device')}
                                 mode="contained" title="lang">
                    <Image source={nightMode === 'device' ? themeImages.selected.device : themeImages.normal.device}/>
                </TouchableRipple>
                <Text style={style.languageButtonsStyle.textStyle}>{getNightModeText()}</Text>
            </View>
        </View>,
        <View style={style.langView}>
            <Text style={style.languageButtonsStyle.textStyle}>{translations.language}</Text>
            <View style={style.languageButtonsStyle}>
                {getLanguageImages()}
                <Text style={style.languageButtonsStyle.textStyle}>{getLanguageText()}</Text>
            </View>
        </View>,
        <View style={style.unitView}>
            <Text style={style.unitButtonsStyle.textStyle}>{translations.measurementUnits}</Text>
            <View style={style.unitButtonsStyle}>
                <TouchableRipple onPress={() => saveUnits('metric')}
                                 mode="contained" title="lang">
                    <Image source={units === 'metric' ? unitImages.selected.metric : unitImages.normal.imperial}/>
                </TouchableRipple>
                <TouchableRipple onPress={() => saveUnits('imperial')}
                                 mode="contained" title="lang">
                    <Image source={units === 'imperial' ? unitImages.selected.metric : unitImages.normal.imperial}/>
                </TouchableRipple>
                <Text style={style.unitButtonsStyle.textStyle}>{getUnitsText()}</Text>
            </View>
        </View>,
        <View style={style.accountView}>
            {getAccountView()}
        </View>
    ]
};

const style = {
    langView: {
        flexDirection: 'column',
        width: '100%'
    },
    languageButtonsStyle: {
        flexDirection: 'row',
        textStyle: {
            fontSize: 32
        }
    },
    unitView: {
        flexDirection: 'column',
        width: '100%'
    },
    unitButtonsStyle: {
        flexDirection: 'row',
        textStyle: {
            fontSize: 32,
        }
    },
    accountButtonsStyle: {},
    accountView: {},
    loginButtonStyle: {
        flexDirection: 'row',
        width: '100%'
    },
}