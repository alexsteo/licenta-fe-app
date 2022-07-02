import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Text, TextInput, TouchableRipple} from 'react-native-paper';
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
                                        mode="contained" title="lang" style={style.langRipple}>
                    <Image source={image} style={style.imgStyle}/>
                </TouchableRipple>
            }
        )
    }

    const mainButtons = () => {
        return (
            <View style={style.mainAccButtonView}>
                <Button
                    style={style.mainAccButtonView.button}
                    labelStyle={{fontSize: 40}}
                    contentStyle={style.mainAccButtonView.buttonContent}
                    color={'black'}
                    icon="account-plus"
                    mode="contained"
                    title="Sign up"
                    onPress={() => setAccountState('sign-up')}/>
                <Button
                    style={style.mainAccButtonView.button}
                    labelStyle={{fontSize: 40}}
                    contentStyle={style.mainAccButtonView.buttonContent}
                    color={'black'}
                    mode="contained"
                    title="Email Sign in"
                    icon="login"
                    onPress={() => setAccountState('sign-in')}/>
                <Button
                    style={style.mainAccButtonView.button}
                    labelStyle={{fontSize: 40}}
                    contentStyle={style.mainAccButtonView.buttonContent}
                    color={'black'}
                    mode="contained"
                    title="Google Sign-In"
                    icon="google"
                    onPress={() => onGoogleButtonPress()}/>
            </View>
        )
    }

    const signInButtons = () => {
        return (
            <View style={style.signIn.mainView}>
                <Button
                    key={1}
                    onPress={() => setAccountState('main')}
                    icon="arrow-left-thick"
                    color={'black'}
                > {translations.modalBackButton} </Button>
                <View style={style.signIn.textInputs}>
                    <TextInput
                        label={translations.email}
                        value={email}
                        onChangeText={text => setEmail(text)}>
                    </TextInput>
                </View>
                <View style={style.signIn.textInputs}>
                    <TextInput
                        secureTextEntry={true}
                        label={translations.password}
                        value={pass}
                        onChangeText={text => setPass(text)}>
                    </TextInput>
                </View>
                <Button mode={'contained'} style={style.signIn.button} color={'black'}
                        labelStyle={{fontSize: 20}} onPress={() => signIn()}>{translations.signIn}</Button>
                <Button mode={'contained'} style={style.signIn.button} color={'black'}
                        labelStyle={{fontSize: 20}} onPress={() => setAccountState('forgot')}>{translations.forgotPassword}</Button>
            </View>
        )
    }

    const forgotButtons = () => {
        return (
            <View style={style.forgot.mainView}>
                <Button
                    key={1}
                    onPress={() => setAccountState('sign-up')}
                    icon="arrow-left-thick"
                    color={'black'}
                > {translations.modalBackButton} </Button>
                <View style={style.forgot.textInputs}>
                    <TextInput
                        label={translations.email}
                        value={email}
                        onChangeText={text => setEmail(text)}>
                    </TextInput>
                </View>
                <Button mode={'contained'} style={style.forgot.button} color={'black'} labelStyle={{fontSize: 20}}
                         onPress={() => forgotPassword()}>{translations.sendPasswordRecoveryEmail}</Button>
            </View>
        )
    }

    const signUpButtons = () => {
        return (
            <View style={style.signUp.mainView}>
                <Button
                    key={1}
                    onPress={() => setAccountState('main')}
                    icon="arrow-left-thick"
                    color={'black'}
                > {translations.modalBackButton} </Button>
                <View style={style.signUp.textInputs}>
                    <TextInput
                        label={translations.email}
                        value={email}
                        onChangeText={text => setEmail(text)}>
                    </TextInput>
                </View>
                <View style={style.signUp.textInputs}>
                    <TextInput
                        secureTextEntry={true}
                        label={translations.password}
                        value={pass}
                        onChangeText={text => setPass(text)}>
                    </TextInput>
                </View>
                <View style={style.signUp.textInputs}>
                    <TextInput
                        secureTextEntry={true}
                        label={translations.confirmPassword}
                        value={confirmPass}
                        onChangeText={text => setConfirmPass(text)}>
                    </TextInput>
                </View>
                <Button onPress={() => signUp()} mode={'contained'} style={style.signUp.button} color={'black'} labelStyle={{fontSize: 20}}>{translations.signUp}</Button>
            </View>
        )
    }

    const logoutButtons = () => {
        return (
            <Button style={style.signOut} mode="contained" title="Sign out" onPress={() => signOut()} color={'black'}>
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

    const getAccountSettingsTitle = () => {
        switch (accountState) {
            case 'main':
                return translations.accountSettings;
            case 'sign-in':
                return translations.signInTitle;
            case 'sign-up':
                return translations.signUpTitle;
            case 'forgot':
                return translations.forgotTitle;
            default:
                return translations.accountSettings;
        }
    }

    const getSettings = () => {
        return ((!!userEmail && userEmail !== '') || accountState === 'main') && <View>
            <View style={style.themeView}>
                <View style={style.themeView.textView}>
                    <Text style={style.themeButtonsStyle.textStyle}>{translations.theme}</Text>
                    <Text style={style.languageButtonsStyle.textStyle}>{getNightModeText()}</Text>
                </View>
                <View style={style.themeButtonsStyle}>
                    <TouchableRipple onPress={() => toggleNightMode('day')}
                                     mode="contained" title="lang" style={style.themeRipple}>
                        <Image source={nightMode === 'day' ? themeImages.selected.day : themeImages.normal.day}/>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => toggleNightMode('night')}
                                     mode="contained" title="lang" style={style.themeRipple}>
                        <Image source={nightMode === 'night' ? themeImages.selected.night : themeImages.normal.night}/>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => toggleNightMode('device')}
                                     mode="contained" title="lang" style={style.themeRipple}>
                        <Image
                            source={nightMode === 'device' ? themeImages.selected.device : themeImages.normal.device}/>
                    </TouchableRipple>
                </View>
            </View>
            <View style={style.langView}>
                <View style={style.langView.textView}>
                    <Text style={style.languageButtonsStyle.textStyle}>{translations.language}</Text>
                    <Text style={style.languageButtonsStyle.textStyle}>{getLanguageText()}</Text>
                </View>
                <View style={style.languageButtonsStyle}>
                    {getLanguageImages()}
                </View>
            </View>
            <View style={style.unitView}>
                <View style={style.unitView.textView}>
                    <Text style={style.unitButtonsStyle.textStyle}>{translations.measurementUnits}</Text>
                    <Text style={style.unitButtonsStyle.textStyle}>{getUnitsText()}</Text>
                </View>
                <View style={style.unitButtonsStyle}>
                    <TouchableRipple onPress={() => saveUnits('metric')}
                                     mode="contained" title="lang" style={style.unitRipple}>
                        <Image source={units === 'metric' ? unitImages.selected.metric : unitImages.normal.metric}/>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => saveUnits('imperial')}
                                     mode="contained" title="lang" style={style.unitRipple}>
                        <Image source={units === 'imperial' ? unitImages.selected.imperial : unitImages.normal.imperial}/>
                    </TouchableRipple>
                </View>
            </View>
        </View>
    }

    return <View>
        <ReturnButton/>
        <View>{getSettings()}</View>
        <View style={style.accountView}>
            <View style={style.accountView.textView}>
                <Text style={style.accountView.textStyle}>{getAccountSettingsTitle()}</Text>
            </View>
            <View style={style.accountView.buttonView}>
                {getAccountView()}
            </View>
        </View>
    </View>
};

const style = {
    themeView: {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: '2%',
        marginBottom: '2%',
        flexDirection: 'column',
        width: '100%',
        textView: {
            justifyContent: 'center',
            flexDirection: 'row',
        }
    },
    themeButtonsStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        textStyle: {
            color: 'black',
            fontSize: 24,
            textAlignVertical: 'center'
        }
    },
    langView: {
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'column',
        width: '100%',
        marginBottom: '2%',
        textView: {
            justifyContent: 'center',
            flexDirection: 'row',
        }
    },
    languageButtonsStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        textStyle: {
            color: 'black',
            fontSize: 24,
            textAlignVertical: 'center'
        }
    },
    unitView: {
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: '2%',
        flexDirection: 'column',
        width: '100%',
        textView: {
            justifyContent: 'center',
            flexDirection: 'row',
        }
    },
    unitButtonsStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        textStyle: {
            color: 'black',
            fontSize: 24,
            textAlignVertical: 'center'
        }
    },
    accountButtonsStyle: {},
    accountView: {
        textView: {
            marginBottom: '2%',
            alignItems: 'center',
        },
        textStyle: {
            color: 'black',
            fontSize: 22,
            textAlignVertical: 'center'
        },
        buttonView: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%'
        },
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: '3%',
        padding: '2%',
    },
    mainAccButtonView: {
        button: {
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '2%',
            marginRight: '2%'
        },
        buttonContent: {
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 50,
            width: 50,
            height: 50
        },
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1%',
        flexDirection: 'row',
        width: '100%'
    },
    signUp: {
        button: {
            marginTop: '3%',
            borderRadius: 50,
            height: '15%',
        },
        mainView: {
            width: '100%',
        },
        textInputs: {
            marginTop: '3%',
            marginBottom: '3%',
            borderRadius: 50,
            overflow: 'hidden',
        },
    },
    forgot: {
        button: {
            marginTop: '3%',
            borderRadius: 50,
            height: '25%',
        },
        mainView: {
            width: '100%',
        },
        textInputs: {
            marginTop: '3%',
            marginBottom: '3%',
            borderRadius: 50,
            overflow: 'hidden',
        },
    },
    signIn: {
        button: {
            marginTop: '3%',
            borderRadius: 50,
            height: '15%',
        },
        mainView: {
            width: '100%',
        },
        textInputs: {
            marginTop: '3%',
            marginBottom: '3%',
            borderRadius: 50,
            overflow: 'hidden',
        },
    },
    signOut: {
        borderRadius: 50
    },
    unitRipple: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'black',
        backgroundColor: '#dadada',
        width: 50,
        height: 50,
        margin: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    langRipple: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'black',
        backgroundColor: '#dadada',
        width: 50,
        height: 50,
        margin: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    themeRipple: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'black',
        backgroundColor: '#dadada',
        width: 50,
        height: 50,
        margin: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
    }
}