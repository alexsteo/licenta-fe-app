import * as React from 'react';
import {Button, Modal, Portal, Provider} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {hideWeatherInfoScreen} from "../../store/actions/actions";
import {deleteFavourite} from "../common/apiMethods";
import {Appearance, Text, View} from "react-native";
import {cities} from "../../res/cityList";
import {getLanguageTranslations} from "../common/languages/languageSelector";

const format = (toFormat, ...values) => {
    console.log(toFormat)
    for (let value of values) {
        toFormat = toFormat.replace("{/}", value);
    }
    return toFormat.toString();
}

const getMeasurementValue = (value, units, type) => {
    if (units === 'metric') return value;
    switch (type) {
        case 'length':
            return 0.621371192 * value;
        case 'temperature':
            return 1.8 * value + 32;
    }
}

const WeatherInfoScreen = () => {
    const dispatch = useDispatch();

    const data = useSelector(state => state.screen.weatherInfoScreenData);
    const weatherInfoScreenType = useSelector(state => state.screen.weatherInfoScreenType);
    const showWeatherInfoScreen = useSelector(state => state.screen.showWeatherInfoScreen);

    const units = useSelector(state => state.user.units);
    const language = useSelector(state => state.user.language);
    const userEmail = useSelector(state => state.user.email);
    const translations = getLanguageTranslations(language);

    const callDeleteFavourite = () => {
        deleteFavourite(data.city, dispatch, userEmail);
    }

    const routeData = () => {
        return (
            <View>
                <Text>
                    {format(translations.weatherInfoRoute, getMeasurementValue(data.length, units, 'length'), data.score, data.finalScore, data.no, data.total)}
                </Text>
            </View>
        )
    }

    const favouriteData = () => {
        return (
            <View style={style.modalViewStyle}>
                <Text>
                    {format(translations.weatherInfoForecast, data.location, getMeasurementValue(data.temperature, units, 'temperature'), data.rain, data.snow, data.clouds)}
                </Text>
                <Button onPress={() => {
                    callDeleteFavourite()
                }}>
                    DELETE THIS!
                </Button>
            </View>
        )
    }

    const routeWeatherData = () => {
        return (
            <View style={style.modalViewStyle}>
                <Text>
                    {format(translations.weatherInfoForecast, data.location, getMeasurementValue(data.temperature, units, 'temperature'), data.rain, data.snow, data.clouds)}
                </Text>
            </View>
        )
    }

    const weatherData = () => {
        return (
            <View style={style.modalViewStyle}>
                <Text>
                    {format(translations.weatherInfoForecast, data.location, getMeasurementValue(data.temperature, units, 'temperature'), data.rain, data.snow, data.clouds)}
                </Text>
            </View>
        )
    }

    const reportData = () => {

        const getClosestCity = (report) => {
            return cities
                .sort((left, right) =>
                    Math.abs(left.Latitude - report.lat) +
                    Math.abs(left.Longitude - report.lng) -
                    Math.abs(right.Latitude - report.lat) -
                    Math.abs(right.Longitude - report.lng))
                .slice(0, 20)
                .sort((left, right) => right.Population - left.Population)[0];
        }

        return (
            <View style={style.modalViewStyle}>
                <Text>
                    {format(translations.weatherInfoReportsTitle, getClosestCity(data).AccentCity)}
                    { !!data && !!data.typeAndAmount && !!data.typeAndAmount.FOG ? format(translations.weatherInfoReportsFog, data.typeAndAmount.FOG) : ''}
                    { !!data && !!data.typeAndAmount && !!data.typeAndAmount.HEAVY_RAIN ? format(translations.weatherInfoReportsHeavyRain, data.typeAndAmount.HEAVY_RAIN) : ''}
                    { !!data && !!data.typeAndAmount && !!data.typeAndAmount.SNOW ? format(translations.weatherInfoReportsSnow, data.typeAndAmount.SNOW) : ''}
                    { !!data && !!data.typeAndAmount && !!data.typeAndAmount.TRAFFIC ? format(translations.weatherInfoReportsTraffic, data.typeAndAmount.TRAFFIC) : ''}
                    { !!data && !!data.typeAndAmount && !!data.typeAndAmount.ROAD_ACCIDENT ? format(translations.weatherInfoReportsAccidents, data.typeAndAmount.ROAD_ACCIDENT) : ''}
                </Text>
            </View>
        )
    }

    const getScreenAndData = () => {
        switch (weatherInfoScreenType) {
            case 'route':
                return routeData();
            case 'checkpoint':
                return routeWeatherData();
            case 'weather':
                return weatherData();
            case 'report':
                return reportData();
            case 'favourites':
                return favouriteData();
            default:
                return <Text>{translations.somethingWentWrong}</Text>
        }
    }

    return (
        <Provider>
            <Portal>
                <Modal
                    visible={showWeatherInfoScreen}
                    onDismiss={() => {
                        dispatch(hideWeatherInfoScreen())
                    }}
                    contentContainerStyle={style.weatherInfoStyle}
                    style={style.modalStyle}>
                    {getScreenAndData()}
                </Modal>
            </Portal>
        </Provider>
    );
};

const style = {
    weatherInfoStyle: {
        backgroundColor: Appearance.getColorScheme() === 'dark' ? '#121212' : 'white',
        padding: 20
    },
    modalStyle: {
        position: 'absolute',
        top: 50,
        height: 500,
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    modalViewStyle: {
        height: '100%',
    },
}

export default WeatherInfoScreen;