import * as React from 'react';
import {Button, List, Menu, Modal, Portal, Provider, Switch, ToggleButton} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {hideModal, setModalScreen} from "../../store/actions/actions";
import {useState} from "react";
import {submitReport} from "../common/apiMethods";

const ModalSettings = () => {
    const dispatch = useDispatch();

    const visible = useSelector(state => state.screen.showModal);
    const screen = useSelector(state => state.screen.modalScreen);

    const [type, setType] = useState("");
    const [switchOn, setSwitchOn] = useState(false);

    const containerStyle = {backgroundColor: 'white', padding: 20};

    const reportProblem = (type) => {
        submitReport(type, dispatch);
    }

    const getMainModalScreen = () => {
        return (<List.Item
            title="First Item"
            description="Item description"
            onPress={() => dispatch(setModalScreen('report'))}
            left={props => <List.Icon {...props} icon="folder"/>}
        />)
    }

    const getReportScreen = () => {
        return [
            <List.Item
                onPress={() => dispatch(setModalScreen('main'))}
                left={props => <List.Icon {...props} icon="arrow-left-thick"/>}
            />,
            <List.Item
                title="Report a problem on your location"
            />,
            <ToggleButton.Row onValueChange={value => setType(value)} value={type}>
                <ToggleButton icon="snowflake" value="SNOW" />
                <ToggleButton icon="weather-pouring" value="HEAVY_RAIN" />
                <ToggleButton icon="weather-fog" value="FOG" />
                <ToggleButton icon="car-multiple" value="TRAFFIC" />
                <ToggleButton icon="car-traction-control" value="ROAD_ACCIDENT" />
            </ToggleButton.Row>,
            <Switch value={switchOn} onValueChange={() => setSwitchOn(!switchOn)} />,
            <Button icon="camera" mode="contained" onPress={() => reportProblem(type)}>
                Press me
            </Button>
        ]
    }

    const chooseModalScreen = (screen) => {
        switch (screen) {
            case 'main':
                return getMainModalScreen();
            case 'report':
                return getReportScreen();
            default:
                return getMainModalScreen();
        }
    }

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={() => dispatch(hideModal())} contentContainerStyle={containerStyle}>
                    {chooseModalScreen(screen)}
                </Modal>
            </Portal>
        </Provider>
    );
};

export default ModalSettings;