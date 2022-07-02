import * as React from 'react';
import {useDispatch} from "react-redux";
import {setModalScreen} from "../../store/actions/actions";
import {Image, View} from "react-native";
import {TouchableRipple} from "react-native-paper";


export const ReturnButton = () => {
    const dispatch = useDispatch();

    return (
        <View style={style.viewStyle}>
            <TouchableRipple style={style.buttonStyle} onPress={() => dispatch(setModalScreen('main'))}
                             mode="contained" title="aaa">
                <Image style={style.buttonStyle} source={require('../../res/icons/back.png')}/>
            </TouchableRipple>
            <Image style={style.imageStyle} source={require('../../res/logo.png')}/>
        </View>
    )
};

const style = {
    viewStyle: {
        flexDirection: 'row'
    },
    buttonStyle: {
        height: 50,
        width: 50
    },
    imageStyle: {
        height: 50,
        width: 200,
        marginLeft: 20
    }
}