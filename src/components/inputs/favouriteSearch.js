import React from 'react';
import {View} from "react-native";
import {SearchBar} from "./searchBar";
import {searchWeatherAtLocation} from "../common/apiMethods";
import {getLanguageTranslations} from "../common/languages/languageSelector";
import {useSelector} from "react-redux";
import {setMapViewWithCoords} from "../../store/actions/actions";

export const FavouriteSearch = () => {

    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

    const navigateToSearchLocation = (loc, dispatch) => {
        const region = {
            latitude: parseFloat(loc.lat),
            longitude: parseFloat(loc.lng),
            latitudeDelta: 3,
            longitudeDelta: 3,
        }
        dispatch(setMapViewWithCoords(region));
    }

    return (
        <View>
            <SearchBar searchPlaceHolder={translations.searchBarTextFavourites} searchMethod={navigateToSearchLocation}/>
        </View>
    )
}