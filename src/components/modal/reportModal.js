import * as React from 'react';
import {useState} from 'react';
import {Button, List, Text, TouchableRipple} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {submitReport} from "../common/apiMethods";
import {getLanguageTranslations} from "../common/languages/languageSelector";
import {Image, View} from "react-native";
import {ReturnButton} from "./returnButton";

const reportImages = {
    normal: {
        traffic: require('../../res/icons/traffic-black.png'),
        accident: require('../../res/icons/accident-black.png'),
        fog: require('../../res/icons/fog-black.png'),
        rain: require('../../res/icons/rain-black.png'),
        snow: require('../../res/icons/snow-black.png')
    },
    selected: {
        traffic: require('../../res/icons/traffic-white.png'),
        accident: require('../../res/icons/accident-white.png'),
        fog: require('../../res/icons/fog-white.png'),
        rain: require('../../res/icons/rain-white.png'),
        snow: require('../../res/icons/snow-white.png')
    }
}

export const ReportModal = () => {
    const dispatch = useDispatch();

    const [type, setType] = useState("");

    const userEmail = useSelector(state => state.user.email);
    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

    const reportProblem = (type) => {
        submitReport(type, dispatch, userEmail);
    }

    const getButtonIfEnabled = () => {
        if (type === 'SNOW' || type === 'HEAVY_RAIN' || type === 'FOG' || type === 'TRAFFIC' || type === 'ROAD_ACCIDENT') {
            return (
                <Button icon="camera" mode="contained" onPress={() => reportProblem(type)} key={5}>
                    {getButtonText()}
                </Button>
            )
        }
    }

    const getButtonText = () => {
        switch (type) {
            case "SNOW":
                return translations.reportModalButtonSnow
            case "HEAVY_RAIN":
                return translations.reportModalButtonHeavyRain
            case "FOG":
                return translations.reportModalButtonFog
            case "TRAFFIC":
                return translations.reportModalButtonTraffic
            case "ROAD_ACCIDENT":
                return translations.reportModalButtonRoadAccident
            default:
                return translations.reportModalButtonEmpty
        }
    }


    const getScreen = () => {
        if (!!userEmail && userEmail !== '') {
            return ([
                    <ReturnButton/>,
                    <List.Item
                        key={2}
                        title={translations.reportModalTitle}
                    />,
                    <View style={style.buttonsViewStyle}>
                        <TouchableRipple onPress={() => setType('FOG')} mode="contained" title="lang">
                            <Image source={type === 'FOG' ? reportImages.selected.fog : reportImages.normal.fog}/>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => setType('HEAVY_RAIN')} mode="contained" title="lang">
                            <Image source={type === 'HEAVY_RAIN' ? reportImages.selected.rain : reportImages.normal.rain}/>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => setType('SNOW')} mode="contained" title="lang">
                            <Image source={type === 'SNOW' ? reportImages.selected.snow : reportImages.normal.snow}/>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => setType('TRAFFIC')} mode="contained" title="lang">
                            <Image source={type === 'TRAFFIC' ? reportImages.selected.traffic : reportImages.normal.traffic}/>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => setType('ROAD_ACCIDENT')} mode="contained" title="lang">
                            <Image source={type === 'ROAD_ACCIDENT' ? reportImages.selected.accident : reportImages.normal.accident}/>
                        </TouchableRipple>
                    </View>,
                    <View>
                        {getButtonIfEnabled()}
                    </View>
                ]
            );

        } else {
            return ([
                    <ReturnButton/>,
                    <Text>{translations.noUserReport}</Text>
                ]
            )
        }
    }

    return getScreen();
};

const style = {
    buttonsViewStyle: {
        flexDirection: 'row'
    }
}