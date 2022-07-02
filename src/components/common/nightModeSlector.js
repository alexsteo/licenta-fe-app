import {Appearance} from "react-native";

export const isNightMode = (selectedNightMode) => {
    if (selectedNightMode === 'day') return false;
    if (selectedNightMode === 'night') return true;
    if(selectedNightMode === 'device') {
        return Appearance.getColorScheme() === 'dark';
    }
    return false;
}