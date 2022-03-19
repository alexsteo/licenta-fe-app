import React, {useState} from 'react';
import {Dimensions, View} from "react-native";
import {Map} from "../map/Map";
import {DirectionSearch} from "../inputs/directionSearch";
import {WeatherSearch} from "../inputs/weatherSearch";
import {Navigator} from "../inputs/navigator";
import {useSelector} from "react-redux";
import ModalSettings from "../modal/modalSettings";

export const MapScreen = () => {

    const searchType = useSelector(state => state.screen.searchType);

    const style = {
        view: {
            height: Dimensions.get('window').height
        },
        searchBar: {
            position: 'absolute',
            left: 0,
            width: Dimensions.get('window').width,
        },
        navigatorStyle: {
            position: 'absolute',
            top: Dimensions.get('window').height - 40,
        },
        modalStyle: {
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            padding: "15%"
        }
    }

    const getSearchType = (key) => {
        switch (key) {
            case "navigation":
                return <DirectionSearch style={style.searchBar}/>
            case "weather":
                return <WeatherSearch style={style.searchBar}/>
            default:
                return
        }
    }

    return (
        <View>
            <View>
                <Map/>
                {getSearchType(searchType)}
                <Navigator style={style.navigatorStyle}/>
            </View>
            <ModalSettings style={style.modalStyle}/>
        </View>
    )
}