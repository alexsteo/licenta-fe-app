import {LOGIN, LOGOUT, SET_LANGUAGE, SET_NIGHT_MODE, SET_UNITS} from "../actions/types";

const INITIAL_STATE = {
    nightMode: false,
    units: 'metric',
    language: 'en',
    email: '',
};

export const userReducer = (state = INITIAL_STATE, action) => {
    console.log(action.type + " with: " + action.payload + " at: " + new Date().toLocaleTimeString())
    switch (action.type) {
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