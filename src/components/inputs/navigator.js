import React, {useState} from "react";
import {View} from "react-native";
import {BottomMenu, Item} from "react-native-bottom-menu";
import {useDispatch, useSelector} from "react-redux";
import {setSearchType} from "../../store/actions/actions";
import {getLanguageTranslations} from "../common/languages/languageSelector";
import {Snackbar} from "react-native-paper";
import {getAllReports, getFavouritesForUser} from "../common/apiMethods";

export const Navigator = (props) => {

    const [screen, setScreen] = useState("navigation");
    const [snackBar, setSnackBar] = useState(false);
    const dispatch = useDispatch();

    const language = useSelector(state => state.user.language);
    const user = useSelector(state => state.user.email);
    const translations = getLanguageTranslations(language);

    const style = {
        height: "100%"
    }

    const onMenuItemPress = (key) => {
        if(key === 'favourites' && !user) {
            setSnackBar(true);
        }
        if(key === 'favourites' && !!user) {
            getFavouritesForUser(dispatch, user);
        }
        if(key === 'reports') {
            getAllReports(dispatch);
        }
        setScreen(key);
        dispatch(setSearchType(key));
    }

    const onDismissSnackbar = () => {
        setSnackBar(false);
    }

    return (
        <View style={style}>
            <Snackbar
                visible={snackBar}
                onDismiss={onDismissSnackbar}
                duration={5000}
                action={{
                    label: 'Ok',
                    onPress: () => onDismissSnackbar(),
                }}>
                {translations.snackBarFavourite}
            </Snackbar>
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
                    onPress={() => {
                        onMenuItemPress("favourites")
                    }}
                />
                <Item
                    size={30}
                    name="alert-triangle"
                    text={translations.navigatorReports}
                    type="Feather"
                    isActive={screen === "reports"}
                    onPress={() => onMenuItemPress("reports")}
                />
            </BottomMenu>
        </View>
    )
}