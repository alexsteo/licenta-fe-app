import React from 'react';
import {Dimensions, View} from "react-native";
import {Map} from "../map/Map";
import {DirectionSearch} from "../inputs/directionSearch";
import {WeatherSearch} from "../inputs/weatherSearch";
import {Navigator} from "../inputs/navigator";
import {useDispatch, useSelector} from "react-redux";
import ModalSettings from "../modal/modalSettings";
import {Slider} from "@miblanchard/react-native-slider";
import {setRoutePlusHours} from "../../store/actions/actions";

export const MapScreen = () => {

    const searchType = useSelector(state => state.screen.searchType);
    const plusHours = useSelector(state => state.screen.routePlusHours);

    const dispatch = useDispatch();

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
        sliderStyle: {
            position: 'absolute',
            top: Dimensions.get('window').height - 180,
            left: Dimensions.get('window').width * 0.1,
            width: Dimensions.get('window').width * 0.8,
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

    const getSliderIfNeeded = () => {
        return (searchType === "navigation" || searchType === "weather") && <Slider
            value={plusHours}
            onValueChange={value => dispatch(setRoutePlusHours(value[0]))}
            maximumValue={24}
            step={1}/>
    }

    return (
        <View>
            <View>
                <Map/>
                <View style={style.sliderStyle}>
                    {getSliderIfNeeded()}
                </View>
                {getSearchType(searchType)}
                <Navigator style={style.navigatorStyle}/>
            </View>
            <ModalSettings style={style.modalStyle}/>
        </View>
    )
}