import * as React from 'react';
import {useState} from 'react';
import {Button, List, Switch, ToggleButton} from 'react-native-paper';
import {useDispatch} from "react-redux";
import {setModalScreen} from "../../store/actions/actions";
import {submitReport} from "../common/apiMethods";

export const ReportModal = () => {
    const dispatch = useDispatch();

    const [type, setType] = useState("");
    const [switchOn, setSwitchOn] = useState(false);

    const reportProblem = (type) => {
        submitReport(type, dispatch);
    }

    return [
        <List.Item
            key={1}
            onPress={() => dispatch(setModalScreen('main'))}
            left={props => <List.Icon {...props} icon="arrow-left-thick"/>}
        />,
        <List.Item
            key={2}
            title="Report a problem on your location"
        />,
        <ToggleButton.Row onValueChange={value => setType(value)} value={type} key={3}>
            <ToggleButton icon="snowflake" value="SNOW"/>
            <ToggleButton icon="weather-pouring" value="HEAVY_RAIN"/>
            <ToggleButton icon="weather-fog" value="FOG"/>
            <ToggleButton icon="car-multiple" value="TRAFFIC"/>
            <ToggleButton icon="car-traction-control" value="ROAD_ACCIDENT"/>
        </ToggleButton.Row>,
        <Switch value={switchOn} onValueChange={() => setSwitchOn(!switchOn)} key={4}/>,
        <Button icon="camera" mode="contained" onPress={() => reportProblem(type)} key={5}>
            Press me
        </Button>
    ]
};