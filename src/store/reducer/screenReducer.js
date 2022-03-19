import {CLEAR_SELECTION, HIDE_MODAL, SET_MODAL_SCREEN, SET_SEARCH_TYPE, SHOW_MODAL} from "../actions/types";

const INITIAL_STATE = {
    searchType: "navigation",
    showModal: false,
    modalScreen: 'main',
};

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
        default:
            return state
    }
};