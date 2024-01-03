import { useState, useEffect, useContext } from "react";
import { currentConditionsAddress, apiKey, convertCelsiusToFahrenheit } from "../util";
import { FavoriteLocationsContext } from "../contexts/FavoriteLocationsContext.jsx";
import { TemperatureContext } from "../contexts/TemperatureContext.jsx";
import bookmarkImg from '../assets/bookmark.svg';
import bookmarkFillImg from '../assets/bookmark-heart-fill.svg';
import './LocationDetails.css'
const DEFAULT_DETAILS = {
    text: '',
    temperature: 0,
}

export default function LocationDetails({ location }) {
    const [details, setDetails] = useState(DEFAULT_DETAILS);
    const [savedLocation, setSavedLocation] = useState(false);

    const { addToFavorites, removeFromFavorites, favorites } = useContext(FavoriteLocationsContext);
    const { temperatureUnit, getTemperatureUnit } = useContext(TemperatureContext);

    useEffect(() => {
        const isSaved = favorites.some(favLocation => favLocation.key === location.key);
        setSavedLocation(isSaved);
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
                }
            }
            catch(error) {
                console.log(`servers are not available right now`)
            }
        };
        const storedWeatherDetails =  localStorage.getItem(`weatherDetails_${location.key}`);
        if (storedWeatherDetails) {
            console.log('fetching location details from storage... ')
            setDetails(JSON.parse(storedWeatherDetails));
          } else {
            console.log('fetching location details from storage... ')
            fetchCurrentConditions();
          }
    }, [favorites, location]);

    function handleSaveLocation() {
        const isSaved = favorites.some(favLocation => favLocation.key === location.key);
        if (isSaved) {
            removeFromFavorites(location)
        } else {
            addToFavorites(location);
        }
    }

    let bookmark = <img src={bookmarkImg} onClick={handleSaveLocation} width="32" height="32"/>
    if (savedLocation)
        bookmark = <img src={bookmarkFillImg} onClick={handleSaveLocation} width="32" height="32"/>
    const unit = getTemperatureUnit();
    const temperature =  temperatureUnit === 'celsius' ? `${details.temperature}${unit}` : `${convertCelsiusToFahrenheit(details.temperature)}${unit}`
    return (
        <div className="card mt-3" id="location-details">
            <div className="card-body">
                <div className="d-flex flex-row-reverse bookmark"> {bookmark} </div>
                <h1 className="card-title">{temperature}</h1>
                <h3 className="card-secondary-title">{location.localizedName}</h3>
                <p className="card-text">{details.text}</p>
            </div>
        </div>
    );
}