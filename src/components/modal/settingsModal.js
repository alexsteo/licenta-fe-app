import * as React from 'react';
import {Avatar, Button, List, ToggleButton, TouchableRipple} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {setLanguage, setModalScreen, setNightMode, setUnits} from "../../store/actions/actions";
import {View} from "react-native";
import {getLanguageTranslations} from "../common/languages/languageSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    }
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


export const SettingsModal = () => {
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.screen.nightMode);
    const language = useSelector(state => state.screen.language);
    const units = useSelector(state => state.screen.units);
    const translations = getLanguageTranslations(language);

    const calculateButtonTitle = () => {
        return nightMode ? translations.switchLightMode : translations.switchNightMode;
    }

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

    return [
        <List.Item
            key={1}
            onPress={() => dispatch(setModalScreen('main'))}
            left={props => <List.Icon {...props} icon="arrow-left-thick"/>}
        />,
        <Button icon="camera" mode="contained" onPress={() => toggleNightMode()}>
            {calculateButtonTitle()}
        </Button>,
        <View style={style.langView}>
            {getLanguageImages()}
        </View>,
        <ToggleButton.Row onValueChange={value => saveUnits(value)} value={units} key={3}>
            <ToggleButton icon="ruler" value="metric"/>
            <ToggleButton icon="crown-outline" value="imperial"/>
        </ToggleButton.Row>,
    ]
};