import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Searchbar, Text} from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import {cities} from "../../res/cityList";
import {Keyboard, View} from "react-native";
import {addFavourite} from "../common/apiMethods";
import {getLanguageTranslations} from "../common/languages/languageSelector";
import {ReturnButton} from "./returnButton";

export const FavouriteModal = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState({});
    const [showSuggestions, setShowSuggestions] = useState(false);

    const userEmail = useSelector(state => state.user.email);
    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

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
        !!location.name ? addFavourite(location, dispatch, userEmail) : noLocationSelected();
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
            .slice(0, 5);
        return cityList
            .map(
                loc => {
                    return <Button
                        title={loc.ascii + ", " + loc.country.toUpperCase()}
                        key={loc.name + loc.lat + loc.lng + Math.random()}
                        onPress={() => selectLocation(loc)}
                        mode="outlined"
                        style={style.suggestionStyle}
                    > <Text style={{ color: 'black'}}>{loc.ascii + ", " + loc.country.toUpperCase()}</Text> </Button>
                }
            )
    }

    const getSuggestions = () => {
        return (
            <View style={style.suggestionListStyle}>
                {generateSuggestions(searchTerm)}
            </View>
        )
    }

    const getScreen = () => {
        if (!!userEmail && userEmail !== '') {
            return <View>
                <ReturnButton/>
                <Text style={style.titleStyle}
                      key={2}
                      title="Add a location to your favourites"
                > {translations.favouritesModalTitle} </Text>
                <Searchbar
                    key={3}
                    placeholder={translations.searchForLocation}
                    onChangeText={setSearchTerm}
                    value={searchTerm}
                />
                <View key={4}>
                    {getSuggestions()}
                </View>
                <View>
                    <Button icon="camera" mode="contained" onPress={() => setFavourite(selectedLocation)} key={5}
                            style={style.saveStyle} color={'black'}>
                        {translations.saveFavourites}
                    </Button>
                </View>
            </View>
        } else {
            return <View>
                <ReturnButton/>
                <Text>{translations.noUserFavourites}</Text>
            </View>
        }
    }

    return getScreen();
};


const style = {
    suggestionListStyle: {
        marginTop: '5%',
        marginBottom: '5%',
        color: 'black',
    },
    suggestionStyle: {
        marginTop: 5,
        borderColor: 'black',
        borderWidth: 2
    },
    saveStyle: {},
    titleStyle: {
        marginTop: '5%',
        marginBottom: '5%',
        textAlign: 'center',
        fontSize: 22,
        color: 'black',
    }
}