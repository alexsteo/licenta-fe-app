import React from 'react';
import {View} from "react-native";
import {SearchBar} from "./searchBar";
import {getDirections} from "../common/apiMethods";

export const DirectionSearch = () => {

    return (
        <View>
            <SearchBar searchPlaceHolder="Direction Search" searchMethod={getDirections}/>
        </View>
    )
}