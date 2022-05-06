import {
    CLEAR_SELECTION,
    HIDE_MODAL,
    SET_MAP_VIEW,
    SET_MODAL_SCREEN,
    SET_SEARCH_TYPE,
    SHOW_MODAL,
    SET_ROUTE_PLUS_HOURS,
    SHOW_WEATHER_INFO_SCREEN,
    HIDE_WEATHER_INFO_SCREEN,
    SET_WEATHER_INFO_SCREEN_TYPE,
    SET_NIGHT_MODE,
} from "../actions/types";

const INITIAL_STATE = {
    searchType: "navigation",
    showModal: false,
    modalScreen: 'main',
    showWeatherInfoScreen: false,
    weatherInfoScreenData: {},
    weatherInfoScreenType: '',
    nightMode: false,
    routePlusHours: 0,
    mapView: {
        latitude: 46.7657,
        longitude: 23.5943,
        latitudeDelta: 3,
        longitudeDelta: 3,
    }
};

const calculateMapView = (routes) => {
    const allCoordinates = routes.reduce((acc , current) => acc.concat(current.route), [])
    const maxLat = allCoordinates.reduce((acc, current) => current.latitude > acc ? current.latitude : acc, -181)
    const minLat = allCoordinates.reduce((acc, current) => current.latitude < acc ? current.latitude : acc, 181)
    const maxLng = allCoordinates.reduce((acc, current) => current.longitude > acc ? current.longitude : acc, -181)
    const minLng = allCoordinates.reduce((acc, current) => current.longitude < acc ? current.longitude : acc, 181)
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    return {
        latitude:  centerLat,
        longitude: centerLng,
        latitudeDelta: (maxLat - centerLat) * 2.2,
        longitudeDelta: (maxLng - centerLng) * 2.2,
    }
}

export const screenReducer = (state = INITIAL_STATE, action) => {
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
        default:
            return state
    }
};