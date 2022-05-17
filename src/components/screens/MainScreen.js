import React, {useEffect} from 'react';
import {View} from "react-native";
import {MapScreen} from "./MapScreen";
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {login, setLanguage, setMapViewWithCoords, setNightMode, setUnits} from "../../store/actions/actions";
import auth from "@react-native-firebase/auth";
import GetLocation from "react-native-get-location";
import {getFavouritesForUser} from "../common/apiMethods";

export const MainScreen = () => {

    const dispatch = useDispatch();

    const getValuesAndDispatch = async () => {
        const nightMode = await AsyncStorage.getItem('nightMode');
        const lang = await AsyncStorage.getItem('lang');
        const units = await AsyncStorage.getItem('units');
        dispatch(setNightMode(nightMode === 'on'));
        dispatch(setLanguage(lang));
        dispatch(setUnits(units));
    }

    const setMapView = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(loc => {
            const region = {
                latitude: loc.latitude,
                longitude: loc.longitude,
                latitudeDelta: 3,
                longitudeDelta: 3,
            }
            dispatch(setMapViewWithCoords(region));
        })
    }

    useEffect(() => {
        async function setInitialData() {
            const response = await getValuesAndDispatch();
        }

        setInitialData().then(r => r);
        setMapView();

        auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(login(user.email));
                getFavouritesForUser(dispatch, user.email);
            }
        });
    }, []);

    return (
        <View>
            <MapScreen/>
        </View>
    )
}