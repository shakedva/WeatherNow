import { useState, useEffect, useContext } from "react";
import { currentConditionsAddress, apiKey, convertCelsiusToFahrenheit } from "../util";
import { FavoriteLocationsContext } from "../contexts/FavoriteLocationsContext.jsx";
import { TemperatureContext } from "../contexts/TemperatureContext.jsx";
const DEFAULT_DETAILS = {
    text: '',
    temperature: 0,
}

export default function LocationDetails({ location }) {
    const [details, setDetails] = useState(DEFAULT_DETAILS);
    const [savedLocation, setSavedLocation] = useState(false);

    const { addToFavorites, removeFromFavorites, favorites } = useContext(FavoriteLocationsContext);
    const { temperatureUnit } = useContext(TemperatureContext);
    // Check if the location is saved as favorite
    useEffect(() => {
        const isSaved = favorites.some(favLocation => favLocation.key === location.key);
        setSavedLocation(isSaved);
    }, [favorites, location]);

    useEffect(() => {
        const fetchCurrentConditions = async () => {
            try {
                const response = await fetch(`${currentConditionsAddress}${location.key}?apikey=${apiKey}`);
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
            console.log('fetching from storage... ')
            setDetails(JSON.parse(storedWeatherDetails));
          } else {
            fetchCurrentConditions();
          }

        // fetch(`${currentConditionsAddress}${location.key}?apikey=${apiKey}`)
        //     .then(res => res.json())
        //     .then(json => {
        //         if (json.length > 0) {
        //             const observation = json[0];
        //             setDetails({
        //                 text: observation.WeatherText,
        //                 temperature: observation.Temperature.Metric.Value,
        //             });
        //         }
        //     }).catch(function () {
        //         console.log(`servers are not available right now`)
        //     })
    }, [location]);

    function handleSaveLocation() {
        const isSaved = favorites.some(favLocation => favLocation.key === location.key);
        if (isSaved) {
            removeFromFavorites(location)
        } else {
            addToFavorites(location);
        }
    }

    let bookmark = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16" onClick={handleSaveLocation}>
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
    </svg>
    if (savedLocation)
        bookmark = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16" onClick={handleSaveLocation}>
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
        </svg>
    return (
        <div className="card mt-3" id="location-details">
            <div className="card-body">
                <p>{location.localizedName}</p>
                { temperatureUnit === 'celsius' ? <p>{details.temperature}°C</p> : <p>{convertCelsiusToFahrenheit(details.temperature)}°F</p>  }
                <p>{details.text}</p>
                {bookmark}
            </div>
        </div>
    );
}