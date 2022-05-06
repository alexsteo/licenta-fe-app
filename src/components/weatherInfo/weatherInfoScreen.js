import * as React from 'react';
import {Button, Modal, Portal, Provider, Text} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {hideWeatherInfoScreen} from "../../store/actions/actions";
import {deleteFavourite} from "../common/apiMethods";

const WeatherInfoScreen = () => {
    const dispatch = useDispatch();

    const weatherInfoScreenData = useSelector(state => state.screen.weatherInfoScreenData);
    const weatherInfoScreenType = useSelector(state => state.screen.weatherInfoScreenType);
    const showWeatherInfoScreen = useSelector(state => state.screen.showWeatherInfoScreen);

    const callDeleteFavourite = () => {
        deleteFavourite(weatherInfoScreenData.city, dispatch);
    }

    return (
        <Provider>
            <Portal>
                <Modal visible={showWeatherInfoScreen} onDismiss={() => dispatch(hideWeatherInfoScreen())}
                       contentContainerStyle={style.weatherInfoStyle}>
                    <Text>{JSON.stringify(weatherInfoScreenData)}</Text>
                    {weatherInfoScreenType === 'favourites' && <Button onPress={() => {
                        callDeleteFavourite()
                    }}>DELETE THIS!</Button>}
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
}

export default WeatherInfoScreen;