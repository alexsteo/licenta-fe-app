import * as React from 'react';
import {useState} from 'react';
import {Button, List, Searchbar} from 'react-native-paper';
import {useDispatch} from "react-redux";
import {setModalScreen} from "../../store/actions/actions";

export const FavouriteModal = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const setFavourite = (type) => {
        // setFavourite(type, dispatch);
    }

    return [
        <List.Item
            key={1}
            onPress={() => dispatch(setModalScreen('main'))}
            left={props => <List.Icon {...props} icon="arrow-left-thick"/>}
        />,
        <List.Item
            key={2}
            title="Add a location to your favourites"
        />,
        <Searchbar
            placeholder="Search"
            onChangeText={setSearchTerm}
            value={searchTerm}
        />,
        <Button icon="camera" mode="contained" onPress={() => setFavourite(location)} key={5}>
            Press me
        </Button>
    ]
};