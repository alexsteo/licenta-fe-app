import {
    ADD_REPORT,
    ADD_TO_FAVOURITES,
    CLEAR_SELECTION,
    DELETE_FROM_FAVOURITE,
    HIDE_MODAL,
    HIDE_WEATHER_INFO_SCREEN,
    LOGIN,
    LOGOUT,
    RESOLVE_ROUTE_CALL, SET_ALL_REPORTS,
    SET_CURRENT_WEATHER,
    SET_FAVOUIRITES,
    SET_LANGUAGE,
    SET_MAP_VIEW,
    SET_MAP_VIEW_WITH_COORDS,
    SET_MODAL_SCREEN,
    SET_NIGHT_MODE,
    SET_REPORTS,
    SET_ROUTE_PLUS_HOURS,
    SET_SEARCH_TYPE,
    SET_SEARCHED_FOR,
    SET_UNITS,
    SET_WEATHER_INFO_SCREEN_TYPE,
    SHOW_MODAL,
    SHOW_WEATHER_INFO_SCREEN
} from "./types";

export const setCurrentWeather = (weather) => {
    return {
        type: SET_CURRENT_WEATHER,
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

export const setAllReports = (reports) => {
    return {
        type: SET_ALL_REPORTS,
        payload: reports
    }
}

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

export const addToFavourites = (location) => {
    return {
        type: ADD_TO_FAVOURITES,
        payload: location
    }
};

export const deleteFromFavourites = (city) => {
    return {
        type: DELETE_FROM_FAVOURITE,
        payload: city
    }
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

export const setMapViewWithCoords = (mapview) => {
    return {
        type: SET_MAP_VIEW_WITH_COORDS,
        payload: mapview
    };
};

export const setRoutePlusHours = (plusHours) => {
    return {
        type: SET_ROUTE_PLUS_HOURS,
        payload: plusHours
    };
};

export const showWeatherInfoScreen = (data) => {
    return {
        type: SHOW_WEATHER_INFO_SCREEN,
        payload: data
    }
};

export const hideWeatherInfoScreen = () => {
    return {
        type: HIDE_WEATHER_INFO_SCREEN,
    }
};

export const setWeatherInfoScreenType = (screenType) => {
    return {
        type: SET_WEATHER_INFO_SCREEN_TYPE,
        payload: screenType
    }
};

export const setNightMode = (nightMode) => {
    return {
        type: SET_NIGHT_MODE,
        payload: nightMode
    }
};

export const setUnits = (units) => {
    return {
        type: SET_UNITS,
        payload: units
    }
};

export const setLanguage = (language) => {
    return {
        type: SET_LANGUAGE,
        payload: language
    }
};

export const login = (email) => {
    return {
        type: LOGIN,
        payload: email
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};