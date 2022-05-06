import React, {useEffect} from 'react';
import {View} from "react-native";
import {MapScreen} from "./MapScreen";
import {getFavouritesForUser, getUserReports} from "../common/apiMethods";
import {useDispatch} from "react-redux";

export const MainScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // getUserReports(dispatch);
        getFavouritesForUser(dispatch, 'this_one');
    }, [])

    return (
        <View>
            <MapScreen/>
        </View>
    )
}