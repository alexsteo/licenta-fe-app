import * as React from 'react';
import {Button, Modal, Portal, Provider} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {hideWeatherInfoScreen} from "../../store/actions/actions";
import {deleteFavourite} from "../common/apiMethods";
import {Text, View} from "react-native";
import {cities} from "../../res/cityList";

const WeatherInfoScreen = () => {
    const dispatch = useDispatch();

    const data = useSelector(state => state.screen.weatherInfoScreenData);
    const weatherInfoScreenType = useSelector(state => state.screen.weatherInfoScreenType);
    const showWeatherInfoScreen = useSelector(state => state.screen.showWeatherInfoScreen);

    const units = useSelector(state => state.screen.units);
    const language = useSelector(state => state.screen.language);

    const callDeleteFavourite = () => {
        deleteFavourite(data.city, dispatch);
    }

    const routeData = () => {
        return (
            <View>
                <Text>
                    {`Selected route is ${data.length} km long\n`}
                    {`The score is ${data.score}\n`}
                    {`The computed score is ${data.finalScore}\n`}
                    {`Making it the ${data.no} out of the ${data.total} routes\n`}
                </Text>
            </View>
        )
    }

    const favouriteData = () => {
        return (
            <View style={style.modalViewStyle}>
                <Text>
                    {`Weather in ${data.city}:\n`}
                    {`Temperature is ${data.temperature} C\n`}
                    {`Rain is ${data.rain} mm\n`}
                    {`Snow is ${data.snow} mm\n`}
                    {`Clouds is ${data.clouds} %\n`}
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
                    {`Weather in ${data.city}:\n`}
                    {`Temperature is ${data.temperature} C\n`}
                    {`Rain is ${data.rain} mm\n`}
                    {`Snow is ${data.snow} mm\n`}
                    {`Clouds is ${data.clouds} %\n`}
                </Text>
            </View>
        )
    }

    const weatherData = () => {
        return (
            <View style={style.modalViewStyle}>
                <Text>
                    {`Weather in ${data.city}:\n`}
                    {`Temperature is ${data.temperature} C\n`}
                    {`Rain is ${data.rain} mm\n`}
                    {`Snow is ${data.snow} mm\n`}
                    {`Clouds is ${data.clouds} %\n`}
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
                    {`Report near ${getClosestCity(data).AccentCity}:\n`}
                    { !!data && !!data.typeAndAmount && !!data.typeAndAmount.TRAFFIC ? `There are ${data.typeAndAmount.TRAFFIC} reports of traffic in the area\n` : ''}
                    { !!data && !!data.typeAndAmount && !!data.typeAndAmount.FOG ? `There are ${data.typeAndAmount.FOG} reports of fog in the area\n` : ''}
                    { !!data && !!data.typeAndAmount && !!data.typeAndAmount.HEAVY_RAIN ? `There are ${data.typeAndAmount.HEAVY_RAIN} reports of heavy rain in the area\n` : ''}
                    { !!data && !!data.typeAndAmount && !!data.typeAndAmount.SNOW ? `There are ${data.typeAndAmount.SNOW} reports of snow in the area\n` : ''}
                    { !!data && !!data.typeAndAmount && !!data.typeAndAmount.ROAD_ACCIDENT ? `There are ${data.typeAndAmount.ROAD_ACCIDENT} reports of accidents in the area\n` : ''}
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
                return <Text>Something went wrong</Text>
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
        height: '100%',
    },
}

export default WeatherInfoScreen;