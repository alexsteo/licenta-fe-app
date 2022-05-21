import {Appearance} from "react-native";

export const isNightMode = (selectedNightMode) => {
    if (selectedNightMode === 'day') return true;
    if (selectedNightMode === 'night') return false;
    if(selectedNightMode === 'device') {
        return Appearance.getColorScheme() === 'dark';
    }
    return false;
}