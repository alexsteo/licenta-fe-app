import * as React from 'react';
import {Modal, Portal, Provider} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {hideModal, setModalScreen} from "../../store/actions/actions";
import {MainModal} from "./mainModal";
import {ReportModal} from "./reportModal";
import {FavouriteModal} from "./favouriteModal";
import {SettingsModal} from "./settingsModal";
import {Appearance, Text, View} from "react-native";

const style = {
    containerStyle: {
        backgroundColor: Appearance.getColorScheme() === 'dark' ? '#121212' : 'white',
        padding: 20,
        paddingTop: 0
    },
    modalStyle: {
        position: 'absolute',
        top: 50,
        height: 500,
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    modalViewStyle: {
        height: '100%',
    },
}

const ModalSettings = () => {
    const dispatch = useDispatch();

    const visible = useSelector(state => state.screen.showModal);
    const screen = useSelector(state => state.screen.modalScreen);

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
                <Modal
                    style={style.modalStyle}
                    visible={visible}
                    onDismiss={() => {
                        dispatch(hideModal())
                        dispatch(setModalScreen('main'))
                    }}
                    contentContainerStyle={style.containerStyle}
                >
                    <View style={style.modalViewStyle}>
                        <Text>Replace me with a logo</Text>
                        {chooseModalScreen(screen)}
                    </View>
                </Modal>
            </Portal>
        </Provider>
    );
};

export default ModalSettings;