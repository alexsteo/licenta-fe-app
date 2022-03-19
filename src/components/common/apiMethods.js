import GetLocation from "react-native-get-location";
import {addReport, setCurrentWeather, setDirections, setReports, setSearchedFor} from "../../store/actions/actions";

export const getDirections = (searchTerm, dispatch) => {
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
        .then(loc => {
            let url = `http://10.0.2.2:8080/route/${loc.latitude},${loc.longitude}/${searchTerm}`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    dispatch(setDirections(data));
                    dispatch(setSearchedFor(searchTerm));
                });
        })
        .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
        })
}

export const searchWeatherAtLocation = (searchTerm, dispatch) => {
    let url = `http://10.0.2.2:8080/weather/${searchTerm}`;
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