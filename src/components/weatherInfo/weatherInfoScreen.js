import * as React from 'react';
import {Modal, Portal, Provider, TouchableRipple} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {hideWeatherInfoScreen} from "../../store/actions/actions";
import {deleteFavourite} from "../common/apiMethods";
import {Appearance, Image, Text, View} from "react-native";
import {cities} from "../../res/cityList";
import {getLanguageTranslations} from "../common/languages/languageSelector";

const format = (toFormat, ...values) => {
    for (let value of values) {
        toFormat = toFormat.replace("{/}", value);
    }
    return toFormat.toString();
}

const getMeasurementValue = (value, units, type) => {
    if (units === 'metric') return value;
    switch (type) {
        case 'length':
            return (0.621371192 * value).toFixed(1);
        case 'temperature':
            return (1.8 * value + 32).toFixed(1);
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
        const toDisplay = [getMeasurementValue(data.length?.toFixed(1), units, 'length'), data.finalScore?.toFixed(0)];
        let idx = 0;
        return (
            <View style={style.modalViewStyle}>
                <View style={style.textView}>
                    {translations.weatherInfoRoute.split('\n').map(text => {
                        if ((text.lastIndexOf("Route") >= 0 || text.lastIndexOf('Ruta') >= 0) && units === 'imperial') {
                            if(language === 'en') {
                                text = text.replace('km', 'miles');
                            } else if (language === 'ro'){
                                text = text.replace('km', 'mile');
                            }
                            return <Text style={style.textStyleRoute}>{format(text, toDisplay[idx++])}</Text>
                        }
                        return <Text style={style.textStyleRoute}>{format(text, toDisplay[idx++])}</Text>
                    })}
                </View>
            </View>
        )
    }

    const favouriteData = () => {
        console.log(data)
        const toDisplay = [data.city?.toUpperCase(), data.temperature, data.rain, data.snow, data.clouds];
        let idx = 0;
        return (
            <View style={style.modalViewStyleWithButton}>
                <View style={style.textViewWithButton}>
                    {translations.weatherInfoForecast.split('\n').map(text => {
                        if ((text.lastIndexOf("Temperature") >= 0 || text.lastIndexOf("Temperatura") >= 0) >= 0 && units === 'imperial') {
                            text = text.replace('C', 'F');
                            return <Text
                                style={style.textStyleWithButton}>{format(text, getMeasurementValue(toDisplay[idx++], units, 'temperature'))}</Text>
                        }
                        return <Text style={style.textStyleWithButton}>{format(text, toDisplay[idx++])}</Text>
                    })}
                </View>
                <TouchableRipple style={style.ripple} onPress={() => {
                    callDeleteFavourite()
                }}>
                    <View>
                        <Image source={require('../../res/icons/bin.png')} style={style.img}/>
                    </View>
                </TouchableRipple>
            </View>
        )
    }

    const routeWeatherData = () => {
        const toDisplay = [data.location?.toUpperCase(), getMeasurementValue(data.temperature, units, 'temperature'), data.rain, data.snow, data.clouds];
        let idx = 0;
        return (
            <View style={style.modalViewStyle}>
                <View style={style.textView}>
                    {translations.weatherInfoForecast.split('\n').map(text => {
                        if ((text.lastIndexOf("Temperature") >= 0 || text.lastIndexOf("Temperatura") >= 0) && units === 'imperial') {
                            text = text.replace('C', 'F');
                        }
                        return <Text style={style.textStyle}>{format(text, toDisplay[idx++])}</Text>
                    })}
                </View>
            </View>
        )
    }

    const weatherData = () => {
        const toDisplay = [data.city?.toUpperCase(), data.temperature, data.rain, data.snow, data.clouds];
        let idx = 0;
        return (
            <View style={style.modalViewStyle}>
                <View style={style.textView}>
                    {translations.weatherInfoForecast.split('\n').map(text => {
                        if ((text.lastIndexOf("Temperature") >= 0 || text.lastIndexOf("Temperatura") >= 0) >= 0 && units === 'imperial') {
                            text = text.replace('C', 'F');
                            return <Text
                                style={style.textStyle}>{format(text, getMeasurementValue(toDisplay[idx++], units, 'temperature'))}</Text>
                        }
                        return <Text style={style.textStyle}>{format(text, toDisplay[idx++])}</Text>
                    })}
                </View>
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
                <View style={style.textView}>
                    <Text style={style.textStyle}>{format(translations.weatherInfoReportsTitle, getClosestCity(data).AccentCity)}</Text>
                    {!!data && !!data.typeAndAmount && !!data.typeAndAmount.FOG && <Text style={style.textStyleReport}>{format(translations.weatherInfoReportsFog, data.typeAndAmount.FOG)}</Text>}
                    {!!data && !!data.typeAndAmount && !!data.typeAndAmount.HEAVY_RAIN && <Text style={style.textStyleReport}>{format(translations.weatherInfoReportsHeavyRain, data.typeAndAmount.HEAVY_RAIN)}</Text>}
                    {!!data && !!data.typeAndAmount && !!data.typeAndAmount.SNOW && <Text style={style.textStyleReport}>{format(translations.weatherInfoReportsSnow, data.typeAndAmount.SNOW)}</Text>}
                    {!!data && !!data.typeAndAmount && !!data.typeAndAmount.TRAFFIC && <Text style={style.textStyleReport}>{format(translations.weatherInfoReportsTraffic, data.typeAndAmount.TRAFFIC)}</Text>}
                    {!!data && !!data.typeAndAmount && !!data.typeAndAmount.ROAD_ACCIDENT && <Text style={style.textStyleReport}>{format(translations.weatherInfoReportsAccidents, data.typeAndAmount.ROAD_ACCIDENT)}</Text>}
                </View>
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
        backgroundColor: 'white',
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
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    textStyle: {
        marginTop: '2%',
        marginBottom: '2%',
        fontSize: 22,
        color: 'black',
    },
    textStyleReport: {
        fontSize: 20,
        color: 'black',
    },
    textStyleRoute: {
        color: 'black',
        fontSize: 18
    },
    textView: {
        padding: '10%',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: '5%',
        marginTop: '10%',
    },
    ripple: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: 150,
        marginBottom: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        margin: '5%',
        width: 100,
        height: 100
    },
    modalStyleWithButton: {
        position: 'absolute',
        top: 50,
        height: 500,
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    modalViewStyleWithButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    textStyleWithButton: {
        color: 'black',
        marginTop: '2%',
        fontSize: 22,
    },
    textViewWithButton: {
        color: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: '5%',
        marginTop: '10%',
        padding: '3%'
    },
}

export default WeatherInfoScreen;