import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, List, Searchbar} from 'react-native-paper';
import {useDispatch} from "react-redux";
import {setModalScreen} from "../../store/actions/actions";
import {cities} from "../../res/cityList";
import {Keyboard, View} from "react-native";
import {addFavourite} from "../common/apiMethods";

const style = {
    suggestionListStyle: {
        marginTop: '15%',
        backgroundColor: '#444d'
    },
    suggestionStyle: {
        paddingTop: '2.5%'
    },
}

export const FavouriteModal = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState({});

    const [showSuggestions, setShowSuggestions] = useState(false);
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setShowSuggestions(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setShowSuggestions(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const setFavourite = (location) => {
        !!location.name ? addFavourite(location, dispatch) : noLocationSelected();
    }

    const noLocationSelected = () => {
    }

    const selectLocation = (loc) => {
        Keyboard.dismiss();
        setSelectedLocation(loc);
        setSearchTerm(loc.ascii);
    }

    const generateSuggestions = (location) => {
        const cityList = cities.map(city => {
            return {
                name: city.City,
                ascii: city.AccentCity,
                lat: city.Latitude,
                lng: city.Longitude,
                country: city.Country,
                pop: city.Population
            }
        })
            .filter(city => city.name?.includes(location) || city.ascii?.includes(location))
            .sort((a, b) => {
                let popA = !isNaN(parseInt(a.pop)) ? parseInt(a.pop) : 0;
                let popB = !isNaN(parseInt(b.pop)) ? parseInt(b.pop) : 0;
                return popB - popA;
            })
            .slice(0, 3);
        return cityList
            .map(
                loc => {
                    return <List.Item
                        title={loc.ascii + ", " + loc.country.toUpperCase()}
                        key={loc.name + loc.lat + loc.lng + Math.random()}
                        left={props => <List.Icon {...props} icon="map-marker"/>}
                        onPress={() => selectLocation(loc)}
                    />
                }
            )
    }

    const getSuggestions = () => {
        return showSuggestions &&
            <View style={style.suggestionListStyle}>
                {generateSuggestions(searchTerm)}
            </View>
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
            key = {3}
            placeholder="Search"
            onChangeText={setSearchTerm}
            value={searchTerm}
        />,
        <View key={4}>
            {getSuggestions()}
        </View>,
        <Button icon="camera" mode="contained" onPress={() => setFavourite(selectedLocation)} key={5}>
            Add To Favorites
        </Button>
    ]
};