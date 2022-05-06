import {combineReducers} from "redux";
import {
    ADD_REPORT, ADD_TO_FAVOURITES, DELETE_FROM_FAVOURITE, RESOLVE_ROUTE_CALL,
    SET_CURRENT_WEATHER,
    SET_DIRECTIONS,
    SET_FAVOUIRITES,
    SET_REPORTS, SET_ROUTE_PLUS_HOURS,
    SET_SEARCHED_FOR
} from "../actions/types";
import {screenReducer} from "./screenReducer";
import {act} from "react-test-renderer";

const INITIAL_STATE = {
    routes: [],
    weatherOnRoutes: [],
    currentWeather: {},
    reports: [],
    searchedFor: "",
    favourites: [],
};

const eliminateFavourite = (payload, state) => {
    return payload.success === 1 ? state.favourites.filter(fav => fav.city !== deletedFav) : state.favourites;
}

const navReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_WEATHER:
            return {
                ...state,
                currentWeather: action.payload
            }
        case SET_SEARCHED_FOR:
            return {
                ...state,
                searchedFor: action.payload
            }
        case ADD_REPORT:
            return {
                ...state,
                reports: state.reports.concat(action.payload)
            }
        case SET_REPORTS:
            return {
                ...state,
                reports: action.payload
            }
        case SET_FAVOUIRITES:
            return {
                ...state,
                favourites: action.payload
            }
        case ADD_TO_FAVOURITES:
            return {
                ...state,
                favourites: state.favourites.concat(action.payload)
            }
        case RESOLVE_ROUTE_CALL:
            return {
                ...state,
                routes: action.payload.routeWithData,
                weatherOnRoutes: action.payload.weatherData,
                reports: action.payload.userReports?.reports
            }
        case DELETE_FROM_FAVOURITE:
            return {
                ...state,
                favourites: eliminateFavourite(action.payload, state)
            }
        default:
            return state
    }
};

export default combineReducers({
    nav: navReducer,
    screen: screenReducer,
});