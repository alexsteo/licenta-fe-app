import GetLocation from "react-native-get-location";
import {
    addReport, addToFavourites, deleteFromFavourites, hideModal, hideWeatherInfoScreen, resolveRouteCall,
    setCurrentWeather,
    setDirections,
    setFavourites, setMapView, setModalScreen,
    setReports,
    setSearchedFor
} from "../../store/actions/actions";

export const getDirections = (searchTerm, dispatch) => {
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
        .then(loc => {
            // let url = `http://10.0.2.2:8080/route/${loc.latitude},${loc.longitude}/${searchTerm.lat},${searchTerm.lng}`
            // let url = `http://10.0.2.2:8080/route/oradea/iasi`
            // console.log(url)
            let url = `http://10.0.2.2:3000/fe`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    dispatch(resolveRouteCall(data));
                    dispatch(setMapView(data.routeWithData));
                });
        })
        .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
        })
}

export const searchWeatherAtLocation = (searchTerm, dispatch) => {
    let url = `http://10.0.2.2:8080/weather/${searchTerm.lat}/${searchTerm.lng}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            dispatch(setCurrentWeather(data));
            dispatch(setSearchedFor(searchTerm));
        });
}

export const getUserReports = (dispatch) => {
    let url = `http://10.0.2.2:8080/report/`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            dispatch(setReports(data));
        });
}

export const getFavouritesForUser = (dispatch, user) => {
    let url = `http://10.0.2.2:8080/favourites/weather/${user}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            dispatch(setFavourites(data.entries));
        });
}

export const submitReport = (type, dispatch) => {
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
        .then(loc => {
            const url = `http://10.0.2.2:8080/report/insert`
            const data = {
                reporter: 'this_one',
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

export const addFavourite = (location, dispatch) => {
    const url = `http://10.0.2.2:8080/favourites/insert`;
    const data = {
        username: 'this_one',
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

export const deleteFavourite = (city, dispatch) => {
    const url = `http://10.0.2.2:8080/favourites/city/${city}`;
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