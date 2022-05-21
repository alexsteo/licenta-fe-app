import * as React from 'react';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {setModalScreen} from "../../store/actions/actions";
import {getLanguageTranslations} from "../common/languages/languageSelector";

export const MainModal = () => {
    const dispatch = useDispatch();

    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

    return [
        <Button
            key={1}
            title="Add Favourite Location"
            onPress={() => dispatch(setModalScreen('favourite'))}
            icon="heart-outline"
        > {translations.modalAddFavourite} </Button>,
        <Button
            key={2}
            title="Report a problem on the road"
            onPress={() => dispatch(setModalScreen('report'))}
            icon="alert-octagon"
        > {translations.modalReportProblem} </Button>,
        <Button
            key={3}
            title="Settings"
            onPress={() => dispatch(setModalScreen('settings'))}
            icon="cog"
        > {translations.modalSettingsButton} </Button>,
    ]
};