import * as React from 'react';
import {Button, List} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {setModalScreen, setNightMode} from "../../store/actions/actions";

export const SettingsModal = () => {
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.screen.nightMode);

    const calculateButtonTitle = () => {
        return nightMode ? 'Switch to light mode' : 'Switch to night mode';
    }

    const toggleNightMode = () => {
        dispatch(setNightMode(!nightMode));
    }

    return [
        <List.Item
            key={1}
            onPress={() => dispatch(setModalScreen('main'))}
            left={props => <List.Icon {...props} icon="arrow-left-thick"/>}
        />,
        <Button icon="camera" mode="contained" onPress={() => toggleNightMode()}>
            {calculateButtonTitle()}
        </Button>
    ]
};