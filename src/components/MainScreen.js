import React, {useEffect, useRef, useState} from 'react';
import MapView, {Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {Dimensions, Keyboard, StyleSheet, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import GetLocation from "react-native-get-location";

export const MainScreen = () => {

    const [buttonText, setButtonText] = useState("asd");
    const [text, setText] = React.useState("");
    const [searchHeight, setSearchHeight] = useState("85%");
    const [coordinates1, setCoordinates1] = useState([]);
    const [coordinates2, setCoordinates2] = useState([]);
    const [coordinates3, setCoordinates3] = useState([]);
    const [location, setLocation] = useState("");

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const searchStyle = {
        flexDirection: 'row',
        position: 'absolute',
        top: isKeyboardVisible ? '55%' : '85%',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const searchBoxStyle = {
        marginLeft: '2.5%',
        width: '70%',
    }

    const buttonStyle = {
        marginLeft: '2.5%',
        width: '20%'
    }

    const backgroundStyle = {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'flex-end',
        alignItems: 'center',
        map: {
            ...StyleSheet.absoluteFillObject,
        },
    };

    const test = () => {
        console.log("asdas")
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(loc => {
                let url = `http://10.0.2.2:8080/route/${loc.latitude + "," + loc.longitude}/${text}`
                console.log(url)
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)

                        setCoordinates1(data.route1)
                        if(!!data.route2) {
                            setCoordinates2(data.route2)
                        } else {
                            setCoordinates2([])
                        }
                        if(!!data.route3) {
                            setCoordinates3(data.route3)
                        } else {
                            setCoordinates3([])
                        }
                    });
            })
            .catch(error => {
                const {code, message} = error;
                console.warn(code, message);
            })

    }

    const map = () => {
        return <MapView
            provider={PROVIDER_GOOGLE}
            style={backgroundStyle.map}
            initialRegion={{
                latitude: 46.7657,
                longitude: 23.5943,
                latitudeDelta: 3,
                longitudeDelta: 3,
            }}
        >
            <Polyline
                coordinates={coordinates1}
                strokeColor="#0f0"
                strokeWidth={6}
            />
            <Polyline
                coordinates={coordinates2}
                strokeColor="#f00"
                strokeWidth={6}
            />
            <Polyline
                coordinates={coordinates3}
                strokeColor="#00f"
                strokeWidth={6}
            />
        </MapView>

    }

    const searchBar = () => {
        return (
            <View style={backgroundStyle}>
                {map()}
                <View style={searchStyle}>
                    <TextInput
                        value={text}
                        onChangeText={text => setText(text)}
                        style={searchBoxStyle}
                        onFocus={() => setSearchHeight("50%")}
                        onEndEditing={() => {
                            console.log("asdasd")
                            setSearchHeight("85%")
                        }}
                    />
                    <Button style={buttonStyle} icon="camera" mode="contained" onPress={() => test()}>
                        {buttonText}
                    </Button>
                </View>
            </View>)
    }

    return (searchBar())
}