import React, {useEffect} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {Dimensions, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setWeatherInfoScreenType, showWeatherInfoScreen} from "../../store/actions/actions";
import {MapStyles} from "../common/mapStyles";

export const Map = () => {

    const routes = useSelector(state => state.nav.routes);
    const weatherOnRoutes = useSelector(state => state.nav.weatherOnRoutes);
    const currentWeather = useSelector(state => state.nav.currentWeather);
    const searchType = useSelector(state => state.screen.searchType);
    const reports = useSelector(state => state.nav.reports);
    const favourites = useSelector(state => state.nav.favourites);
    const mapView = useSelector(state => state.screen.mapView);
    const routePlusHours = useSelector(state => state.screen.routePlusHours);
    const nightMode = useSelector(state => state.screen.nightMode);

    const dispatch = useDispatch();

    let mapComponent;

    useEffect(() => {
        changeMapToMapView();
    }, [mapView]);

    let idx = 0;

    const getColor = () => {
        switch (idx) {
            case 0:
                idx = idx + 1;
                idx = idx % 3;
                return '#f00'
            case 1:
                idx = idx + 1;
                idx = idx % 3;
                return '#ff0'
            case 2:
                idx = idx + 1;
                idx = idx % 3;
                return '#0f0'
            default:
                return '#f00'
        }
    }

    const calculatePinColor = (weather) => {
        let color = 'green';
        if (weather.temperature < 5 || weather.rain > 0 || weather.snow > 0 || weather.clouds > 80) {
            color = 'yellow';
        }
        if (weather.temperature < 0.5 || weather.rain > 0.5 || weather.snow > 0.5) {
            color = 'red';
        }
        return color;
    }

    const openWeatherScreen = (data, screenType) => {
        dispatch(showWeatherInfoScreen(data));
        dispatch(setWeatherInfoScreenType(screenType));
    }

    const addRoutes = (routes) => {
        if (!routes || searchType !== 'navigation') return null;
        return routes.sort((left, right) => left.score * 5 + left.length - right.score * 5 - right.length)
            .map(each => {
                return <Polyline
                    coordinates={each.route}
                    strokeColor={getColor()}
                    strokeWidth={6}
                    tappable={true}
                    onPress={() => {
                        const {route, ...routeData} = each;
                        openWeatherScreen(routeData, 'route');
                    }}
                />;
            });
    }

    const addWeatherOnRoutes = (weatherOnRoutes, routePlusHours) => {
        if ((!!weatherOnRoutes && weatherOnRoutes.length <= 0) || searchType !== 'navigation') return null;
        const weatherSet = weatherOnRoutes
            .filter(weatherSet => weatherSet.plusHours === routePlusHours)[0].weatherInLocations
        return weatherSet
            .map(weather =>
                <Marker key={Math.random()}
                        coordinate={{
                            latitude: !!weather.lat ? parseFloat(weather.lat) : 0,
                            longitude: !!weather.lng ? parseFloat(weather.lng) : 0
                        }}
                        pinColor={calculatePinColor(weather).toString()}
                        onPress={() => openWeatherScreen(weather, 'checkpoint')}>
                </Marker>
            );
    }

    const addWeatherData = (currentWeather) => {
        return searchType === 'weather' ? (
            <Marker coordinate={{
                latitude: !!currentWeather.lat ? parseFloat(currentWeather.lat) : 0,
                longitude: !!currentWeather.lng ? parseFloat(currentWeather.lng) : 0
            }}
                    pinColor={'green'}
                    onPress={() => openWeatherScreen(currentWeather, 'weather')}>
            </Marker>
        ) : null;
    }

    const addReports = (reports) => {
        return searchType === 'navigation' ? (
                reports.map(report => (
                        <Marker key={Math.random()}
                                coordinate={{
                                    latitude: parseFloat(report.lat),
                                    longitude: parseFloat(report.lng)
                                }}
                                pinColor={'blue'}
                                onPress={() => openWeatherScreen(report, 'report')}>
                        </Marker>
                    )
                )
            ) :
            null;
    }

    const addFavourites = (favourites) => {
        return searchType === 'favourites' ? (
                favourites.map(fav => (
                        <Marker key={Math.random()}
                                coordinate={{
                                    latitude: parseFloat(fav.lat),
                                    longitude: parseFloat(fav.lng)
                                }}
                                pinColor={'yellow'}
                                onPress={() => openWeatherScreen(fav, 'favourites')}>
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

    const changeMapToMapView = () => {
        mapComponent.animateToRegion(mapView);
    }

    return <View style={backgroundStyle}>
        <MapView
            ref={(thisMap) => {
                mapComponent = thisMap;
            }}
            provider={PROVIDER_GOOGLE}
            style={backgroundStyle.map}
            initialRegion={mapView}
            customMapStyle={nightMode ? MapStyles.nightMode : MapStyles.lightMode}>
            {addRoutes(routes)}
            {addWeatherData(currentWeather)}
            {addReports(reports)}
            {addFavourites(favourites)}
            {addWeatherOnRoutes(weatherOnRoutes, routePlusHours)}
        </MapView>
    </View>
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



