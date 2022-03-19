import React from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";

export const Map = () => {

    const directions = useSelector(state => state.nav.directions);
    const currentWeather = useSelector(state => state.nav.currentWeather);
    const searchType = useSelector(state => state.screen.searchType);
    const reports = useSelector(state => state.nav.reports);

    const addRoutes = (directions) => {
        return !!directions.routes && searchType === 'navigation' ? directions.routes.map(route => {
            return !!route ? <Polyline
                coordinates={route}
                strokeColor="#0f0"
                strokeWidth={6}
            /> : null;
        }) : null
    }

    const addWeatherData = (currentWeather) => {
        return searchType === 'weather' ? (
            <Marker coordinate={{
                latitude: !!currentWeather.lat ? parseFloat(currentWeather.lat) : 0,
                longitude: !!currentWeather.lng ? parseFloat(currentWeather.lng) : 0
            }}>
                <View style={{backgroundColor: "red", padding: 10}}>
                    <Text>{currentWeather.name + "    " + (currentWeather.temperature - 273.15).toFixed(2)}</Text>
                </View>
            </Marker>
        ) : null;
    }

    const addReports = (reports) => {
        return searchType === 'navigation' ? (
                reports.map(report => (
                        <Marker key={Math.random()} coordinate={{
                            latitude: parseFloat(report.lat),
                            longitude: parseFloat(report.lng)

                        }}>
                            <View style={{backgroundColor: getReportColor(report.type), padding: 10}}>
                                <Text>{report.type}</Text>
                            </View>
                        </Marker>
                    )
                )
            ) :
            null;
    }

    const getReportColor = (type) => {
        switch (type) {
            case 'SNOW':
                return '#A2BCE0'
            case 'HEAVY_RAIN':
                return '#0B5563'
            case 'FOG':
                return '#5E5C6C'
            case 'TRAFFIC':
                return '#E53D00'
            case 'ROAD_ACCIDENT':
                return '#F13030'
            default:
                return '#F13030'
        }
    }

    const map = () => {
        return <View style={backgroundStyle}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={backgroundStyle.map}
                initialRegion={{
                    latitude: 46.7657,
                    longitude: 23.5943,
                    latitudeDelta: 3,
                    longitudeDelta: 3,
                }}>
                {addRoutes(directions)}
                {addWeatherData(currentWeather)}
                {addReports(reports)}
            </MapView>
        </View>
    }

    return map();
}

const backgroundStyle = {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    map: {
        ...StyleSheet.absoluteFillObject,
    },
};


