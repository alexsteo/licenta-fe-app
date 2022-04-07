import React, {useEffect, useState} from 'react';
import {Keyboard, View} from "react-native";
import {Avatar, List, Searchbar, TouchableRipple} from "react-native-paper";
import {useDispatch} from "react-redux";
import {showModal} from "../../store/actions/actions";
import {cities} from "../../res/smallCityList.js"

export const SearchBar = ({searchPlaceHolder, searchMethod}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

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

    const searchStyle = {
        flexDirection: "column",
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
            backgroundColor: '#444d'
        },
        suggestionStyle: {
            paddingTop: '2.5%'
        },
        imageStyle: {
            height: 50,
            width: 50,
            borderRadius: 50
        }
    }

    const generateSuggestions = (location) => {
        const cityList = cities.map(city => {
            return {
                name: city.city,
                ascii: city.city_ascii,
                lat: city.lat,
                lng: city.lng,
                county: city.admin_name,
                country: city.country
            }
        }).filter(city => city.name.includes(location) || city.ascii.includes(location)).slice(0, 5);
        return cityList
            .map(
                loc => {
                    return <List.Item
                        title={loc.name + ", " + loc.county + ", " + loc.country}
                        key={loc.name + loc.lat + loc.lng}
                        left={props => <List.Icon {...props} icon="map-marker"/>}
                        onPress={() => {
                            Keyboard.dismiss();
                            searchMethod(loc, dispatch);
                        }}
                    />
                }
            )
    }

    const getSuggestions = () => {
        return showSuggestions &&
            <View style={searchStyle.suggestionListStyle}>
                {generateSuggestions(searchTerm)}
            </View>
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
                    <TouchableRipple style={searchStyle.rippleStyle} onPress={() => dispatch(showModal())}
                                     mode="contained" title="aaa">
                        <Avatar.Image size={50} source={require('../../res/profile.png')}/>
                    </TouchableRipple>
                </View>
                {getSuggestions()}
            </View>
        </View>
    )
}
