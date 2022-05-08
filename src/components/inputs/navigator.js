import React, {useState} from "react";
import {View} from "react-native";
import {BottomMenu, Item} from "react-native-bottom-menu";
import {useDispatch} from "react-redux";
import {clearSelection, setSearchType} from "../../store/actions/actions";

export const Navigator = (props) => {

    const [screen, setScreen] = useState("navigation");
    const dispatch = useDispatch();

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
                    text="Navigation"
                    type="Feather"
                    isActive={screen === "navigation"}
                    onPress={() => onMenuItemPress("navigation")}
                />
                <Item
                    size={22}
                    type="Feather"
                    text="Weather"
                    name="sun"
                    isActive={screen === "weather"}
                    onPress={() => onMenuItemPress("weather")}
                />
                <Item
                    size={30}
                    name="star"
                    text="Favourites"
                    type="Feather"
                    isActive={screen === "favourites"}
                    onPress={() => onMenuItemPress("favourites")}
                />
            </BottomMenu>
        </View>
    )
}