import * as React from 'react';
import {useState} from 'react';
import {Button, List, Modal, Portal, Provider, Switch, ToggleButton} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {hideModal, setModalScreen} from "../../store/actions/actions";
import {submitReport} from "../common/apiMethods";
import {MainModal} from "./mainModal";
import {ReportModal} from "./reportModal";
import {FavouriteModal} from "./favouriteModal";

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
            case 'favourite':
                return <FavouriteModal/>;
            default:
                return <MainModal/>;
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