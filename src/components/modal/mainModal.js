import * as React from 'react';
import {List} from 'react-native-paper';
import {useDispatch} from "react-redux";
import {setModalScreen} from "../../store/actions/actions";

export const MainModal = () => {
    const dispatch = useDispatch();

    const containerStyle = {backgroundColor: 'white', padding: 20};

    return [
        <List.Item
            key={1}
            title="Add Favourite Location"
            onPress={() => dispatch(setModalScreen('favourite'))}
            left={props => <List.Icon {...props} icon="heart-outline"/>}
        />,
        <List.Item
            key={2}
            title="Report a problem on the road"
            onPress={() => dispatch(setModalScreen('report'))}
            left={props => <List.Icon {...props} icon="alert-octagon"/>}
        />,
        <List.Item
            key={3}
            title="Settings"
            onPress={() => dispatch(setModalScreen('settings'))}
            left={props => <List.Icon {...props} icon="cog"/>}
        />,
    ]
};