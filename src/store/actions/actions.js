import {
    ADD_REPORT,
    CLEAR_SELECTION, HIDE_MODAL, RESOLVE_ROUTE_CALL,
    SET_CURRENT_WEATHER,
    SET_DIRECTIONS, SET_FAVOUIRITES, SET_MAP_VIEW, SET_MODAL_SCREEN, SET_REPORTS, SET_ROUTE_PLUS_HOURS,
    SET_SEARCH_TYPE,
    SET_SEARCHED_FOR,
    SHOW_MODAL
} from "./types";

export const setCurrentWeather = (weather) => {
    return {
        type:SET_CURRENT_WEATHER,
        payload: weather,
    };
};

export const setSearchedFor = (searchedFor) => {
    return {
        type: SET_SEARCHED_FOR,
        payload: searchedFor,
    };
};

export const setSearchType = (searchType) => {
    return {
        type: SET_SEARCH_TYPE,
        payload: searchType
    };
};

export const clearSelection = () => {
    return {
        type: CLEAR_SELECTION
    };
};

export const showModal = () => {
    return {
        type: SHOW_MODAL
    };
};

export const hideModal = () => {
    return {
        type: HIDE_MODAL
    };
};

export const addReport = (report) => {
    return {
        type: ADD_REPORT,
        payload: report
    };
};

export const setReports = (reports) => {
    return {
        type: SET_REPORTS,
        payload: reports
    };
};

export const setModalScreen = (screen) => {
    return {
        type: SET_MODAL_SCREEN,
        payload: screen
    };
};

export const setFavourites = (favouriteData) => { //TODO: rename to smth more specific
    return {
        type: SET_FAVOUIRITES,
        payload: favouriteData
    };
};

export const resolveRouteCall = (response) => {
    return {
        type: RESOLVE_ROUTE_CALL,
        payload: response
    };
};

export const setMapView = (routes) => {
    return {
        type: SET_MAP_VIEW,
        payload: routes
    };
};

export const setRoutePlusHours = (plusHours) => {
    return {
        type: SET_ROUTE_PLUS_HOURS,
        payload: plusHours
    };
};