import React from 'react';
import {View} from "react-native";
import {SearchBar} from "./searchBar";
import {searchWeatherAtLocation} from "../common/apiMethods";
import {getLanguageTranslations} from "../common/languages/languageSelector";
import {useSelector} from "react-redux";

export const WeatherSearch = () => {

    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

    return (
        <View>
            <SearchBar searchPlaceHolder={translations.searchBarTextWeather} searchMethod={searchWeatherAtLocation}/>
        </View>
    )
}