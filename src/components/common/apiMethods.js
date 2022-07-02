import GetLocation from "react-native-get-location";
import {
    addReport, addToFavourites, deleteFromFavourites, hideModal, hideWeatherInfoScreen, resolveRouteCall, setAllReports,
    setCurrentWeather,
    setDirections,
    setFavourites, setMapView, setMapViewWithCoords, setModalScreen,
    setReports,
    setSearchedFor
} from "../../store/actions/actions";

export const getDirections = (searchTerm, dispatch, setSnackbar) => {
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
        .then(loc => {
            let url = `https://licenta-backend-teo.herokuapp.com/route/${loc.latitude + "," + loc.longitude}/${searchTerm.lat + "," + searchTerm.lng}`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(!!data.status || !!data.error) {
                        setSnackbar(true);
                    } else {
                        dispatch(resolveRouteCall(data));
                        dispatch(setMapView(data.routeWithData));
                    }
                })
                .catch(error => {
                    setSnackbar(true);
                });
        });
}

export const searchWeatherAtLocation = (searchTerm, dispatch, setSnackBar) => {
    let url = `https://licenta-backend-teo.herokuapp.com/weather/${searchTerm.lat}/${searchTerm.lng}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const region = {
                latitude: parseFloat(data.lat),
                longitude: parseFloat(data.lng),
                latitudeDelta: 3,
                longitudeDelta: 3,
            }
            dispatch(setMapViewWithCoords(region))
            dispatch(setCurrentWeather(data));
            dispatch(setSearchedFor(searchTerm));
        })
        .catch(error => setSnackBar(true));
}

export const getFavouritesForUser = (dispatch, user) => {
    let url = `https://licenta-backend-teo.herokuapp.com/favourites/weather/${user}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            dispatch(setFavourites(data.entries));
        });
}

export const submitReport = (type, dispatch, user) => {
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
        .then(loc => {
            const url = `https://licenta-backend-teo.herokuapp.com/report/insert`
            const data = {
                reporter: user,
                lat: loc.latitude,
                lng: loc.longitude,
                type
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    dispatch(addReport(data));
                });
        })
        .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
        })
}

export const addFavourite = (location, dispatch, user) => {
    const url = `https://licenta-backend-teo.herokuapp.com/favourites/insert`;
    const data = {
        username: user,
        lat: location.lat,
        lng: location.lng,
        city: location.name
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            dispatch(addToFavourites(data));
            dispatch(setModalScreen("main"));
            dispatch(hideModal());
        });
}

export const deleteFavourite = (city, dispatch, user) => {
    const url = `https://licenta-backend-teo.herokuapp.com/favourites/city/${city}/${user}`;
    const options = {
        method: 'DELETE',
    };
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            dispatch(hideWeatherInfoScreen())
            dispatch(deleteFromFavourites({city: city, success: data}))
        });
}

export const getAllReports = (dispatch) => {
    let url = `https://licenta-backend-teo.herokuapp.com/report/merged`;
    const data = {
        minLat:-180,
        minLng:-180,
        maxLat:180,
        maxLng:180
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            dispatch(setAllReports(data));
        });
}