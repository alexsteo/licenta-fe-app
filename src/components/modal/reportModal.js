import * as React from 'react';
import {useState} from 'react';
import {Button, Text, TouchableRipple} from 'react-native-paper';
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
                <Button icon="camera" mode="contained" onPress={() => reportProblem(type)} key={5} style={style.buttonStyle} color={'black'}>
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
            return <View>
                <ReturnButton/>
                <Text style={style.titleStyle} key={2}>{translations.reportModalTitle}</Text>
                <View style={style.buttonsViewStyle}>
                    <View style={style.firstView}>
                        <TouchableRipple onPress={() => setType('FOG')} mode="contained" title="lang" style={style.ripple}>
                            <Image source={type === 'FOG' ? reportImages.selected.fog : reportImages.normal.fog}/>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => setType('HEAVY_RAIN')} mode="contained" title="lang" style={style.ripple}>
                            <Image
                                source={type === 'HEAVY_RAIN' ? reportImages.selected.rain : reportImages.normal.rain}/>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => setType('SNOW')} mode="contained" title="lang" style={style.ripple}>
                            <Image source={type === 'SNOW' ? reportImages.selected.snow : reportImages.normal.snow}/>
                        </TouchableRipple>
                    </View>
                    <View style={style.secondView}>
                        <TouchableRipple onPress={() => setType('TRAFFIC')} mode="contained" title="lang" style={style.ripple}>
                            <Image style={style.imgStyle}
                                source={type === 'TRAFFIC' ? reportImages.selected.traffic : reportImages.normal.traffic}/>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => setType('ROAD_ACCIDENT')} mode="contained" title="lang" style={style.ripple}>
                            <Image
                                source={type === 'ROAD_ACCIDENT' ? reportImages.selected.accident : reportImages.normal.accident}/>
                        </TouchableRipple>
                    </View>
                </View>
                <View>
                    {getButtonIfEnabled()}
                </View>
            </View>
                ;

        } else {
            return <View>
                <ReturnButton/>
                <Text>{translations.noUserReport}</Text>
            </View>
        }
    }

    return getScreen();
};

const style = {
    buttonStyle: {

    },
    imgStyle: {

    },
    firstView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: '5%',
    },
    secondView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: '10%',
    },
    ripple: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'black',
        backgroundColor: '#dadada',
        width: 90,
        height: 90,
        margin: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsViewStyle: {
    },
    titleStyle: {
        marginTop: '5%',
        marginBottom: '5%',
        textAlign: 'center',
        fontSize: 22,
        color: 'black',
    }
}