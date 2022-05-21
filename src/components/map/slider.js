import {Slider} from "@miblanchard/react-native-slider";
import {setRoutePlusHours} from "../../store/actions/actions";
import {View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

export const SliderComponent = () => {

    const dispatch = useDispatch();

    const plusHours = useSelector(state => state.screen.routePlusHours);

    return (
        <View>
            <Slider
                value={plusHours}
                onValueChange={value => dispatch(setRoutePlusHours(value[0]))}
                maximumValue={23}
                step={1}/>
        </View>
    )
}

const style = {
}