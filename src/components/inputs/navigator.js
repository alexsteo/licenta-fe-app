import React, {useState} from "react";
import {View} from "react-native";
import {BottomMenu, Item} from "react-native-bottom-menu";
import {useDispatch, useSelector} from "react-redux";
import {setSearchType} from "../../store/actions/actions";
import {getLanguageTranslations} from "../common/languages/languageSelector";

export const Navigator = (props) => {

    const [screen, setScreen] = useState("navigation");
    const dispatch = useDispatch();

    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

    const style = {
        height: "100%"
    }

    const onMenuItemPress = (key) => {
        setScreen(key);
        dispatch(setSearchType(key));
    }

    return (
        <View style={style}>
            <BottomMenu>
                <Item
                    size={22}
                    name="navigation"
                    text={translations.navigatorNavigation}
                    type="Feather"
                    isActive={screen === "navigation"}
                    onPress={() => onMenuItemPress("navigation")}
                />
                <Item
                    size={22}
                    type="Feather"
                    text={translations.navigatorWeather}
                    name="sun"
                    isActive={screen === "weather"}
                    onPress={() => onMenuItemPress("weather")}
                />
                <Item
                    size={30}
                    name="star"
                    text={translations.navigatorFavourites}
                    type="Feather"
                    isActive={screen === "favourites"}
                    onPress={() => onMenuItemPress("favourites")}
                />
            </BottomMenu>
        </View>
    )
}