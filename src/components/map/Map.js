import React, {useEffect} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setMapViewWithCoords, setWeatherInfoScreenType, showWeatherInfoScreen} from "../../store/actions/actions";
import {MapStyles} from "../common/mapStyles";
import GetLocation from "react-native-get-location";
import {isNightMode} from "../common/nightModeSlector";

const markerImages = {
    badWeather: require('../../res/bad_weather_marker.png'),
    mediumWeather: require('../../res/medium_weather_marker.png'),
    goodWeather: require('../../res/good_weather_marker.png'),
    report: require('../../res/report_marker.png'),
    favorite: require('../../res/favourite_marker.png')
}

export const Map = ({navToLocFunc, rotateToNorthFunc}) => {

    const routes = useSelector(state => state.nav.routes);
    const weatherOnRoutes = useSelector(state => state.nav.weatherOnRoutes);
    const currentWeather = useSelector(state => state.nav.currentWeather);
    const searchType = useSelector(state => state.screen.searchType);
    const reports = useSelector(state => state.nav.reports);
    const allReports = useSelector(state => state.nav.allReports);
    const favourites = useSelector(state => state.nav.favourites);
    const mapView = useSelector(state => state.screen.mapView);
    const routePlusHours = useSelector(state => state.screen.routePlusHours);
    const nightMode = useSelector(state => state.user.nightMode);

    const dispatch = useDispatch();

    let mapComponent;

    useEffect(() => {
        changeMapToMapView();
        rotateToNorthFunc.current = pointToTheNorth;
        navToLocFunc.current = navToLocation;
    }, [mapView]);

    let idx = 0;

    const getColor = () => {
        switch (idx) {
            case 0:
                idx = idx + 1;
                idx = idx % 3;
                return '#0f0'
            case 1:
                idx = idx + 1;
                idx = idx % 3;
                return '#ff0'
            case 2:
                idx = idx + 1;
                idx = idx % 3;
                return '#f00'
            default:
                return '#f00'
        }
    }

    const calculatePinImage = (weather) => {
        if (weather.temperature < 0.5 || weather.rain > 0.5 || weather.snow > 0.5) {
            return markerImages.badWeather;
        }
        if (weather.temperature < 5 || weather.rain > 0 || weather.snow > 0 || weather.clouds > 80) {
            return markerImages.mediumWeather;
        }
        return markerImages.goodWeather
    }

    const openWeatherScreen = (data, screenType) => {
        dispatch(showWeatherInfoScreen(data));
        dispatch(setWeatherInfoScreenType(screenType));
    }

    const addRoutes = (routes) => {
        if (!routes || searchType !== 'navigation') return null;
        routes = routes.sort((left, right) => right.score * 5 + right.length - left.score * 5 - left.length)
        return routes.map(each => {
            return <Polyline
                coordinates={each.route}
                strokeColor={getColor()}
                strokeWidth={6}
                tappable={true}
                onPress={() => {
                    let {route, ...routeData} = each;
                    routeData = {
                        ...routeData,
                        no: routes.indexOf(each),
                        finalScore: each.score * 5 + each.length,
                        total: routes.length
                    };
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
                        onPress={() => openWeatherScreen(weather, 'checkpoint')}>
                    <Image
                        source={calculatePinImage(weather)}
                        style={{width: 50, height: 50}}
                        resizeMode="contain"
                    />
                </Marker>
            );
    }

    const addWeatherData = (currentWeather) => {
        return searchType === 'weather' ? (
            <Marker coordinate={{
                latitude: !!currentWeather.lat ? parseFloat(currentWeather.lat) : 0,
                longitude: !!currentWeather.lng ? parseFloat(currentWeather.lng) : 0
            }}
                    onPress={() => openWeatherScreen(currentWeather, 'weather')}>
                <Image
                    source={calculatePinImage(calculatePinImage(currentWeather))}
                    style={{width: 50, height: 50}}
                    resizeMode="contain"
                />
            </Marker>
        ) : null;
    }

    const addReportsOnReportScreen = (reports) => {
        return searchType === 'reports' ? (
                reports.map(report => (
                        <Marker key={Math.random()}
                                coordinate={{
                                    latitude: parseFloat(report.lat),
                                    longitude: parseFloat(report.lng)
                                }}
                                onPress={() => openWeatherScreen(report, 'report')}>
                            <Image
                                source={markerImages.report}
                                style={{width: 50, height: 50}}
                                resizeMode="contain"
                            />
                        </Marker>
                    )
                )
            ) :
            null;
    }

    const addReportsForRoutes = (reports) => {
        return searchType === 'navigation' ? (
                reports.map(report => (
                        <Marker key={Math.random()}
                                coordinate={{
                                    latitude: parseFloat(report.lat),
                                    longitude: parseFloat(report.lng)
                                }}
                                onPress={() => openWeatherScreen(report, 'report')}>
                            <Image
                                source={markerImages.report}
                                style={{width: 50, height: 50}}
                                resizeMode="contain"
                            />
                        </Marker>
                    )
                )
            ) :
            null;
    }

    const addFavourites = (favourites) => {
        return !!favourites && favourites !== [] && searchType === 'favourites' ? (
                 favourites.map(fav => (
                        <Marker key={Math.random()}
                                coordinate={{
                                    latitude: parseFloat(fav.lat),
                                    longitude: parseFloat(fav.lng)
                                }}
                                onPress={() => openWeatherScreen(fav, 'favourites')}>
                            <Image
                                source={markerImages.favorite}
                                style={{width: 50, height: 50}}
                                resizeMode="contain"
                            />
                        </Marker>
                    )
                )
            ) :
            null;
    }

    const changeMapToMapView = () => {
        mapComponent.animateToRegion(mapView);
    }

    const navToLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(loc => {
            const region = {
                latitude: loc.latitude,
                longitude: loc.longitude,
                latitudeDelta: 3,
                longitudeDelta: 3,
            }
            dispatch(setMapViewWithCoords(region));
        })
    }

    const pointToTheNorth = () => {
        mapComponent.animateCamera({
            heading: 0
        })
    }

    return <View style={backgroundStyle}>
        <MapView
            ref={(thisMap) => {
                mapComponent = thisMap;
            }}
            provider={PROVIDER_GOOGLE}
            style={backgroundStyle.map}
            initialRegion={mapView}
            customMapStyle={isNightMode(nightMode) ? MapStyles.nightMode : MapStyles.lightMode}>
            {addRoutes(routes)}
            {addWeatherData(currentWeather)}
            {addReportsForRoutes(reports)}
            {addReportsOnReportScreen(allReports)}
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



