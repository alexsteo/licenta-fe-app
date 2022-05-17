import * as React from 'react';
import {useState} from 'react';
import {Button, List, Text, ToggleButton} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {setModalScreen} from "../../store/actions/actions";
import {submitReport} from "../common/apiMethods";

export const ReportModal = () => {
    const dispatch = useDispatch();

    const [type, setType] = useState("");

    const userEmail = useSelector(state => state.user.email);

    const reportProblem = (type) => {
        submitReport(type, dispatch);
    }

    const getScreen = () => {
        if (!!userEmail && userEmail !== '') {
            return ([
                    <Button
                        key={1}
                        onPress={() => dispatch(setModalScreen('main'))}
                        icon="arrow-left-thick"
                    > Back </Button>,
                    <List.Item
                        key={2}
                        title="Report a problem on your location"
                    />,
                    <ToggleButton.Row onValueChange={value => setType(value)} value={type} key={3}>
                        <ToggleButton icon="snowflake" value="SNOW" key={11}/>
                        <ToggleButton icon="weather-pouring" value="HEAVY_RAIN" key={12}/>
                        <ToggleButton icon="weather-fog" value="FOG" key={13}/>
                        <ToggleButton icon="car-multiple" value="TRAFFIC" key={14}/>
                        <ToggleButton icon="car-traction-control" value="ROAD_ACCIDENT" key={15}/>
                    </ToggleButton.Row>,
                    <Button icon="camera" mode="contained" onPress={() => reportProblem(type)} key={5}>
                        Press me
                    </Button>]
            );

        } else {
            return ([
                    <Button
                        key={1}
                        onPress={() => dispatch(setModalScreen('main'))}
                        icon="arrow-left-thick"
                    > Back </Button>,
                    <Text>Please Login to report!</Text>
                ]
            )
        }
    }

    return getScreen();
};