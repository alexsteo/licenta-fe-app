import * as React from 'react';
import {Button, Modal, Portal, Provider, Text} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {hideWeatherInfoScreen} from "../../store/actions/actions";
import {deleteFavourite} from "../common/apiMethods";
import {View} from "react-native";

const WeatherInfoScreen = () => {
    const dispatch = useDispatch();

    const weatherInfoScreenData = useSelector(state => state.screen.weatherInfoScreenData);
    const weatherInfoScreenType = useSelector(state => state.screen.weatherInfoScreenType);
    const showWeatherInfoScreen = useSelector(state => state.screen.showWeatherInfoScreen);

    const units = useSelector(state => state.screen.units);
    const language = useSelector(state => state.screen.language);

    const callDeleteFavourite = () => {
        deleteFavourite(weatherInfoScreenData.city, dispatch);
    }

    return (
        <Provider>
            <Portal>
                <Modal
                    visible={showWeatherInfoScreen}
                    onDismiss={() => {
                        dispatch(hideWeatherInfoScreen())
                    }}
                    contentContainerStyle={style.weatherInfoStyle}
                    style={style.modalStyle}>
                    <View style={style.modalViewStyle}>
                        <Text>{JSON.stringify(weatherInfoScreenData)}</Text>
                        {weatherInfoScreenType === 'favourites' &&
                        <Button onPress={() => {callDeleteFavourite()}}>
                            DELETE THIS!
                        </Button>}
                    </View>
                </Modal>
            </Portal>
        </Provider>
    );
};
const style = {
    weatherInfoStyle: {
        backgroundColor: 'white',
        padding: 20
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

export default WeatherInfoScreen;