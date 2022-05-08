import React, {useEffect} from 'react';
import {View} from "react-native";
import {MapScreen} from "./MapScreen";
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setLanguage, setNightMode, setUnits} from "../../store/actions/actions";

export const MainScreen = () => {

    const dispatch = useDispatch();

    const getValuesAndDispatch = async () => {
        const nightMode = await AsyncStorage.getItem('nightMode');
        const lang = await AsyncStorage.getItem('lang');
        const units = await AsyncStorage.getItem('units');
        dispatch(setNightMode(nightMode === 'on'))
        dispatch(setLanguage(lang))
        dispatch(setUnits(units))
    }

    useEffect(() => {
        async function setInitialData() {
            const response = await getValuesAndDispatch();
        }

        setInitialData().then(r => r);
        // getFavouritesForUser(dispatch, 'this_one');
    }, []);

    return (
        <View>
            <MapScreen/>
        </View>
    )
}