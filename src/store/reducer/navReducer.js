import {combineReducers} from "redux";
import {
    ADD_REPORT,
    SET_CURRENT_WEATHER,
    SET_DIRECTIONS,
    SET_FAVOUIRITES,
    SET_REPORTS,
    SET_SEARCHED_FOR
} from "../actions/types";
import {screenReducer} from "./screenReducer";

const INITIAL_STATE = {
    directions: {},
    currentWeather: {},
    reports: [],
    searchedFor: "",
    favourites: []
};

const navReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_WEATHER:
            return {
                ...state,
                currentWeather: action.payload
            }
        case SET_DIRECTIONS:
            return {
                ...state,
                directions: action.payload
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
        default:
            return state
    }
};

export default combineReducers({
    nav: navReducer,
    screen: screenReducer,
});