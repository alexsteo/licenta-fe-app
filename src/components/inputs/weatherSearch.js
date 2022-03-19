import React from 'react';
import {View} from "react-native";
import {SearchBar} from "./searchBar";
import {searchWeatherAtLocation} from "../common/apiMethods";

export const WeatherSearch = () => {

    return (
        <View>
            <SearchBar searchPlaceHolder="Weather Search" searchMethod={searchWeatherAtLocation}/>
        </View>
    )
}