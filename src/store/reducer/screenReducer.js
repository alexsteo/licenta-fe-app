import {
    CLEAR_SELECTION,
    HIDE_MODAL,
    HIDE_WEATHER_INFO_SCREEN,
    LOGIN,
    LOGOUT,
    SET_LANGUAGE,
    SET_MAP_VIEW,
    SET_MAP_VIEW_WITH_COORDS,
    SET_MODAL_SCREEN,
    SET_NIGHT_MODE,
    SET_ROUTE_PLUS_HOURS,
    SET_SEARCH_TYPE,
    SET_UNITS,
    SET_WEATHER_INFO_SCREEN_TYPE,
    SHOW_MODAL,
    SHOW_WEATHER_INFO_SCREEN,
} from "../actions/types";

const INITIAL_STATE = {
    searchType: "navigation",
    showModal: false,
    modalScreen: 'main',
    showWeatherInfoScreen: false,
    weatherInfoScreenData: {},
    weatherInfoScreenType: '',
    nightMode: false,
    units: 'metric',
    language: 'en',
    email: '',
    routePlusHours: 0,
    mapView: {
        latitude: 46.7657,
        longitude: 23.5943,
        latitudeDelta: 3,
        longitudeDelta: 3,
    }
};

const calculateMapView = (routes) => {
    const allCoordinates = routes.reduce((acc, current) => acc.concat(current.route), [])
    const maxLat = allCoordinates.reduce((acc, current) => current.latitude > acc ? current.latitude : acc, -181)
    const minLat = allCoordinates.reduce((acc, current) => current.latitude < acc ? current.latitude : acc, 181)
    const maxLng = allCoordinates.reduce((acc, current) => current.longitude > acc ? current.longitude : acc, -181)
    const minLng = allCoordinates.reduce((acc, current) => current.longitude < acc ? current.longitude : acc, 181)
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    return {
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: (maxLat - centerLat) * 2.2,
        longitudeDelta: (maxLng - centerLng) * 2.2,
    }
}

export const screenReducer = (state = INITIAL_STATE, action) => {
    console.log(action.type + " with: " + action.payload + " at: " + new Date().toLocaleTimeString())
    switch (action.type) {
        case CLEAR_SELECTION:
            return {
                ...INITIAL_STATE,
                searchType: state.searchType
            };
        case SET_SEARCH_TYPE:
            return {
                ...state,
                searchType: action.payload
            }
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true
            }
        case HIDE_MODAL:
            return {
                ...state,
                showModal: false
            }
        case SET_MODAL_SCREEN:
            return {
                ...state,
                modalScreen: action.payload
            }
        case SET_MAP_VIEW:
            return {
                ...state,
                mapView: calculateMapView(action.payload)
            }
        case SET_MAP_VIEW_WITH_COORDS:
            return {
                ...state,
                mapView: action.payload
            }
        case SET_ROUTE_PLUS_HOURS:
            return {
                ...state,
                routePlusHours: action.payload
            }
        case SHOW_WEATHER_INFO_SCREEN:
            return {
                ...state,
                showWeatherInfoScreen: true,
                weatherInfoScreenData: action.payload
            }
        case HIDE_WEATHER_INFO_SCREEN:
            return {
                ...state,
                showWeatherInfoScreen: false,
                weatherInfoScreenData: {}
            }
        case SET_WEATHER_INFO_SCREEN_TYPE:
            return {
                ...state,
                weatherInfoScreenType: action.payload
            }
        case SET_NIGHT_MODE:
            return {
                ...state,
                nightMode: action.payload
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        case SET_UNITS:
            return {
                ...state,
                units: action.payload
            }
        case LOGIN:
            return {
                ...state,
                email: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                email: ''
            }
        default:
            return state
    }
};