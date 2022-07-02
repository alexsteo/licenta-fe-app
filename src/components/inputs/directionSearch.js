import React, {useState} from 'react';
import {View} from "react-native";
import {SearchBar} from "./searchBar";
import {getDirections} from "../common/apiMethods";
import {getLanguageTranslations} from "../common/languages/languageSelector";
import {useSelector} from "react-redux";

export const DirectionSearch = ({setSnackBar}) => {

    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

    return (
        <View>
            <SearchBar searchPlaceHolder={translations.searchBarTextDirections} searchMethod={getDirections} setSnackBar={setSnackBar}/>
        </View>
    )
}