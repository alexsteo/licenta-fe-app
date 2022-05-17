import * as React from 'react';
import {Button} from 'react-native-paper';
import {useDispatch} from "react-redux";
import {setModalScreen} from "../../store/actions/actions";

export const MainModal = () => {
    const dispatch = useDispatch();

    return [
        <Button
            key={1}
            title="Add Favourite Location"
            onPress={() => dispatch(setModalScreen('favourite'))}
            icon="heart-outline"
        > Add Favourite Location </Button>,
        <Button
            key={2}
            title="Report a problem on the road"
            onPress={() => dispatch(setModalScreen('report'))}
            icon="alert-octagon"
        > Report a problem on the road </Button>,
        <Button
            key={3}
            title="Settings"
            onPress={() => dispatch(setModalScreen('settings'))}
            icon="cog"
        > Settings </Button>,
    ]
};