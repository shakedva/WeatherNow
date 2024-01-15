import { useState, useEffect } from "react";
import { currentConditionsAddress, apiKey, convertCelsiusToFahrenheit } from "../util";
import { getTemperatureSymbol } from "../store/temperature.js";
import { useSelector, useDispatch } from 'react-redux'
import { favoriteLocationsActions } from "../store/favoriteLocations.js";
import bookmarkImg from '../assets/bookmark.svg';
import bookmarkFillImg from '../assets/bookmark-heart-fill.svg';
import './LocationDetails.css'
import ErrorPage from "./ErrorPage.jsx";


const DEFAULT_DETAILS = {
    text: '',
    temperature: 0,
}

export default function LocationDetails({ location }) {
    const [details, setDetails] = useState(DEFAULT_DETAILS);
    const [savedLocation, setSavedLocation] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const temperatureUnit = useSelector(state => state.temperature.temperatureUnit)
    const favorites = useSelector(state => state.favoriteLocations.favorites);
    useEffect(() => {
        const isSaved = favorites.some(favLocation => favLocation.key === location.key); 
        setSavedLocation(isSaved);
        // Fetch when no data is saved in local storage
        const fetchCurrentConditions = async () => {
            try {
                const response = await fetch(`${currentConditionsAddress}${location.key}?` + new URLSearchParams({
                    apikey: apiKey
                }));
                const json = await response.json();
                if (json.length > 0) {
                    const observation = json[0];
                    const observationDetails = {
                        text: observation.WeatherText,
                        temperature: observation.Temperature.Metric.Value,
                    }
                    localStorage.setItem(`weatherDetails_${location.key}`, JSON.stringify(observationDetails));
                    setDetails(observationDetails);
                    setError(false);
                }
            }
            catch (error) {
                setError(true);
            }
        };
        const storedWeatherDetails = localStorage.getItem(`weatherDetails_${location.key}`);
        if (storedWeatherDetails) {
            setDetails(JSON.parse(storedWeatherDetails));
        } else {
            fetchCurrentConditions();
        }
    }, [favorites, location]);

    function handleSaveLocation() {
        const isSaved = favorites.some(favLocation => favLocation.key === location.key);
        if (isSaved) {
            dispatch(favoriteLocationsActions.removeFromFavorites(location));
        } else {
            dispatch(favoriteLocationsActions.addToFavorites(location));
        }
    }

    let bookmark = <img src={bookmarkImg} onClick={handleSaveLocation} width="32" height="32" alt="Save bookmark"/>
    if (savedLocation)
        bookmark = <img src={bookmarkFillImg} onClick={handleSaveLocation} width="32" height="32" alt="Unsave bookmark"/>
    const unit = getTemperatureSymbol(temperatureUnit);
    const temperature = temperatureUnit === 'celsius' ? `${details.temperature}${unit}` : `${convertCelsiusToFahrenheit(details.temperature)}${unit}`
    return (
        <div className="card mt-3" id="location-details">
            <div className="card-body">
                {error ?
                    <ErrorPage>Failed to fetch current conditions. Please try again later.</ErrorPage> :
                    <>
                        <div className="d-flex flex-row-reverse bookmark"> {bookmark} </div>
                        <h1 className="card-title">{temperature}</h1>
                        <h3 className="card-secondary-title">{location.localizedName}</h3>
                        <p className="card-text">{details.text}</p>
                    </>
                }
            </div>
        </div>
    );
}