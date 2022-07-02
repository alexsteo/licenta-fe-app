import * as React from 'react';
import {Modal, Portal, Provider} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {hideModal, setModalScreen} from "../../store/actions/actions";
import {MainModal} from "./mainModal";
import {ReportModal} from "./reportModal";
import {FavouriteModal} from "./favouriteModal";
import {SettingsModal} from "./settingsModal";
import {Appearance, View} from "react-native";
import {getLanguageTranslations} from "../common/languages/languageSelector";

const style = {
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 0,
        borderRadius: 20,
        borderWidth: 0,
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
    scrol: {
        borderWidth: 2
    }
}

const ModalSettings = () => {
    const dispatch = useDispatch();

    const visible = useSelector(state => state.screen.showModal);
    const screen = useSelector(state => state.screen.modalScreen);
    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

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
                        {chooseModalScreen(screen)}
                    </View>
                </Modal>
            </Portal>
        </Provider>
    );
};

export default ModalSettings;