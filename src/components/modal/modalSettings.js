import * as React from 'react';
import {Modal, Portal, Provider} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {hideModal, setModalScreen} from "../../store/actions/actions";
import {MainModal} from "./mainModal";
import {ReportModal} from "./reportModal";
import {FavouriteModal} from "./favouriteModal";
import {SettingsModal} from "./settingsModal";

const ModalSettings = () => {
    const dispatch = useDispatch();

    const visible = useSelector(state => state.screen.showModal);
    const screen = useSelector(state => state.screen.modalScreen);

    const containerStyle = {backgroundColor: 'white', padding: 20};

    const chooseModalScreen = (screen) => {
        switch (screen) {
            case 'main':
                return <MainModal/>;
            case 'report':
                return <ReportModal/>;
            case 'settings':
                return <SettingsModal/>;
            case 'favourite':
                return <FavouriteModal/>;
            default:
                return <MainModal/>;
        }
    }

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={() => {
                    dispatch(hideModal())
                    dispatch(setModalScreen('main'))
                }}
                       contentContainerStyle={containerStyle}>
                    {chooseModalScreen(screen)}
                </Modal>
            </Portal>
        </Provider>
    );
};

export default ModalSettings;