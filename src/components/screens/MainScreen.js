import React, {useEffect} from 'react';
import {View} from "react-native";
import {MapScreen} from "./MapScreen";
import {getUserReports} from "../common/apiMethods";
import {useDispatch} from "react-redux";

export const MainScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getUserReports(dispatch);
    }, [])

    return (
        <View>
            <MapScreen/>
        </View>
    )
}