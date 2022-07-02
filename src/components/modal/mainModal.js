import * as React from 'react';
import {Button, FAB, Text, TouchableRipple} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {setModalScreen} from "../../store/actions/actions";
import {getLanguageTranslations} from "../common/languages/languageSelector";
import {Image, View} from "react-native";

export const MainModal = () => {
    const dispatch = useDispatch();

    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

    return <View style={style.mainView}>
        <View style={style.innerView}>
            <TouchableRipple key={1} onPress={() => dispatch(setModalScreen('favourite'))} style={style.buttonInner}>
                <View style={style.touchableView}>
                    <Image source={require("../../res/icons/favorite.png")} style={style.imageStyle}/>
                    <View style={style.textView}>
                        <Text style={style.text}>{translations.modalAddFavourite}</Text>
                    </View>
                </View>
            </TouchableRipple>
            <TouchableRipple key={2} onPress={() => dispatch(setModalScreen('report'))} style={style.buttonInner}>
                <View style={style.touchableView}>
                    <Image source={require("../../res/icons/report.png")} style={style.imageStyle}/>
                    <View style={style.textView}>
                        <Text style={style.text}>{translations.reportModalTitle}</Text>
                    </View>
                </View>
            </TouchableRipple>
        </View>
        <TouchableRipple key={3} onPress={() => dispatch(setModalScreen('settings'))} style={style.button}>
            <View style={style.touchableView}>
                <Image source={require("../../res/icons/settings.png")} style={style.imageStyle}/>
                <View style={style.textView}>
                    <Text style={style.text}>{translations.modalSettingsButton}</Text>
                </View>
            </View>
        </TouchableRipple>
    </View>
};

const style = {
    button: {
        marginTop: '5%',
        height: '45%',
        width: '45%',
        border: 2,
        borderColor: '#fa4',
    },
    buttonInner: {
        margin: '5%',
        height: '80%',
        width: '45%',
        border: 2,
        borderColor: '#fa4',
    },
    mainView: {
        marginTop: '10%',
        marginBottom: '10%',
        height: '90%',
        alignItems: 'center'
    },
    innerView: {
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    touchableView: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
    },
    imageStyle: {
        marginLeft: '20%',
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
    },
    textView: {
        marginTop: '10%',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
    }
}