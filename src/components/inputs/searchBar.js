import React, {useEffect, useState} from 'react';
import {Keyboard, View} from "react-native";
import {Avatar, Button, List, Searchbar, Snackbar, Text, TouchableRipple} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {hideModal, showModal} from "../../store/actions/actions";
import {cities} from "../../res/cityList.js"
import loggedInImage from "../../res/profile.png";
import anonImage from "../../res/anon.png";
import {getLanguageTranslations} from "../common/languages/languageSelector";

export const SearchBar = ({searchPlaceHolder, searchMethod, setSnackBar}) => {

    const language = useSelector(state => state.user.language);
    const translations = getLanguageTranslations(language);

    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const modalIsOpen = useSelector(state => state.screen.showModal);
    const userEmail = useSelector(state => state.user.email);

    const loggedInImage = require('../../res/profile.png');
    const anonImage = require('../../res/anon.png');

    const dispatch = useDispatch();

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
            .slice(0, 7);
        return cityList
            .map(
                loc => {
                     return <Button
                        title={loc.ascii + ", " + loc.country.toUpperCase()}
                        key={loc.name + loc.lat + loc.lng + Math.random()}
                        onPress={() => {
                            Keyboard.dismiss();
                            searchMethod(loc, dispatch, setSnackBar);
                        }}
                        mode="contained"
                        style={searchStyle.suggestionStyle}
                        color={'black'}
                    > {loc.ascii + ", " + loc.country.toUpperCase()} </Button>
                }
            )
    }

    const getSuggestions = () => {
        return showSuggestions && !modalIsOpen &&
            <View style={searchStyle.suggestionListStyle}>
                {generateSuggestions(searchTerm)}
            </View>
    }

    const toggleModal = () => {
        modalIsOpen ? dispatch(hideModal()) : dispatch(showModal());
    }

    const getModalButton = () => {
        if(!!userEmail && userEmail !== '' ) {
            return <Text style={searchStyle.accountButtonStyle}>{userEmail[0].toUpperCase()}</Text>
        } else{
            return <Avatar.Image size={50} source={anonImage}/>
        }
    }

    return (
        <View>
            <View style={searchStyle}>
                <View style={searchStyle.searchViewStyle}>
                    <Searchbar
                        placeholder={searchPlaceHolder}
                        value={searchTerm}
                        onChangeText={text => setSearchTerm(text)}
                        style={searchStyle.searchBoxStyle}
                    />
                    <TouchableRipple style={searchStyle.rippleStyle} onPress={() => toggleModal()}
                                     mode="contained" title="aaa">
                        {getModalButton()}
                    </TouchableRipple>
                </View>
                {getSuggestions()}
            </View>
        </View>
    )
}



const searchStyle = {
    flexDirection: "column",
    accountButtonStyle: {
        backgroundColor: '#ababab',
        fontSize: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    searchViewStyle: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        top: '0%',
        marginTop: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBoxStyle: {
        marginLeft: '3%',
        marginRight: '4%',
        width: '75%',
    },
    rippleStyle: {
        marginRight: '3%',
        width: '15%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#ccc0',
        borderRadius: 50
    },
    suggestionListStyle: {
        marginTop: '15%',
    },
    suggestionStyle: {
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 2,
        marginLeft: '3%',
        width: '92%'
    },
    imageStyle: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
}
