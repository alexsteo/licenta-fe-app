import {en} from "./en";
import {ro} from "./ro";

export const getLanguageTranslations = (lang) => {
    switch (lang) {
        case 'en':
            return en;
        case 'ro':
            return ro;
        default:
            return en;
    }
}