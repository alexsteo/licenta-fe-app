import React, {useRef, useState} from 'react';
import {Dimensions, View} from "react-native";
import {Map} from "../map/Map";
import {DirectionSearch} from "../inputs/directionSearch";
import {WeatherSearch} from "../inputs/weatherSearch";
import {Navigator} from "../inputs/navigator";
import {useDispatch, useSelector} from "react-redux";
import ModalSettings from "../modal/modalSettings";
import WeatherInfoScreen from "../weatherInfo/weatherInfoScreen";
import {Avatar, Snackbar, Text, TouchableRipple} from "react-native-paper";
import {SliderComponent} from "../map/slider";
import {FavouriteSearch} from "../inputs/favouriteSearch";
import {getLanguageTranslations} from "../common/languages/languageSelector";

export const MapScreen = () => {

    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

    const routes = useSelector(state => state.nav.routes);
    const searchType = useSelector(state => state.screen.searchType);
    const showWeatherInfoScreen = useSelector(state => state.screen.showWeatherInfoScreen);
    const weatherInfoScreenData = useSelector(state => state.screen.weatherInfoScreenData);
    const plusHours = useSelector(state => state.screen.routePlusHours);

    const rotateToNorthFunc = useRef(null);
    const navToLocFunc = useRef(null);

    const dispatch = useDispatch();

    const getSearchType = (key) => {
        switch (key) {
            case "navigation":
                return <DirectionSearch style={style.searchBar} setSnackBar={setSnackBar}/>
            case "weather":
                return <WeatherSearch style={style.searchBar}/>
            case "favourites":
                return <FavouriteSearch style={style.searchBar}/>
            case "reports":
                return <FavouriteSearch style={style.searchBar}/>
            default:
                return
        }
    }

    const getSliderIfNeeded = () => {
        return (searchType === "navigation") && !!routes && routes.length > 0 && <SliderComponent/>
    }

    const getPlusHoursView = () => {
        return searchType === 'navigation' && !!routes && routes.length > 0 && (
            <View style={style.plusHoursViewStyle}>
                <Text style={style.plusHoursTextStyle}>{getPlusHoursText()}</Text>
            </View>
        )
    }

    const getPlusHoursText = () => {
        const current = new Date();
        const time = (current.getHours() + plusHours) % 24;
        const day = (current.getHours() + plusHours) / 24 ? 'tomorrow' : 'today';
        return `Weather data is for ${day} at ${time} o'clock`
    }

    const [snackBar, setSnackBar] = useState(false);

    const onDismissSnackbar = () => {
        setSnackBar(false);
    }

    return (
        <View>
            <View>
                <Map key={"map"} navToLocFunc={navToLocFunc} rotateToNorthFunc={rotateToNorthFunc}/>
                <View style={style.sliderStyle}>
                    {getSliderIfNeeded()}
                </View>
                {getSearchType(searchType)}
                {getPlusHoursView()}
                <View style={style.buttonViewStyle}>
                    <TouchableRipple style={style.buttonStyle} onPress={() => navToLocFunc.current()}
                                     mode="contained" title="lang">
                        <Avatar.Image size={40}
                                      source={require('../../res/location.png')}/>
                    </TouchableRipple>
                    <TouchableRipple style={style.buttonStyle} onPress={() => rotateToNorthFunc.current()}
                                     mode="contained" title="lang">
                        <Avatar.Image size={40}
                                      source={require('../../res/north.png')}/>
                    </TouchableRipple>
                </View>
                <View style={style.navigatorStyle}>
                    <Navigator/>
                </View>
                <ModalSettings style={style.modalStyle}/>
                <WeatherInfoScreen/>
                <Snackbar
                    visible={snackBar}
                    onDismiss={onDismissSnackbar}
                    duration={5000}
                    action={{
                        label: 'Ok',
                        onPress: () => onDismissSnackbar(),
                    }}>
                    {translations.snackBarRoutes}
                </Snackbar>
            </View>
        </View>
    )
}

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
        marginTop: 100,
    },
    sliderStyle: {
        position: 'absolute',
        top: Dimensions.get('window').height - 200,
        left: Dimensions.get('window').width * 0.1,
        width: Dimensions.get('window').width * 0.8,
    },
    weatherInfoStyle: {
        backgroundColor: 'white',
        padding: 20
    },
    buttonViewStyle: {
        position: 'absolute',
        top: Dimensions.get('window').height - 310,
        left: Dimensions.get('window').width * 0.87,
    },
    plusHoursViewStyle: {
        position: 'absolute',
        top: 80,
        left: Dimensions.get('window').width * 0.05,
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: '#ababab',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusHoursTextStyle: {
        fontSize: 18,
    },
    buttonStyle: {
        marginTop: 10
    }
}