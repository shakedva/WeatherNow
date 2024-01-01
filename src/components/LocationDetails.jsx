import { useState, useEffect } from "react";
import { currentConditionsAddress, apiKey } from "../util";
const DEFAULT_DETAILS = {
    text: '',
    temperature: { c: 0, f: 0 },
}

export default function LocationDetails({ location }) {
    const [details, setDetails] = useState(DEFAULT_DETAILS);
    const [showCelsius, setShowCelsius] = useState(true);
    useEffect(()=>{
        fetch(`${currentConditionsAddress}${location.key}?apikey=${apiKey}`)
        .then(res => res.json())
        .then(json => {
            if (json.length > 0) {
                const observation = json[0];
                const temperature = {
                    c: observation.Temperature.Metric.Value,
                    f: observation.Temperature.Imperial.Value,
                };
                const weatherText = observation.WeatherText;

                setDetails({
                    text: weatherText,
                    temperature: temperature,
                });
            }
        }).catch(function () {
            console.log(`servers are not available right now`)
        })
    }, [location]);
    return (
        <div className="card mt-3" id="location-details">
            <div className="card-body">
                <p>{location.localizedName}</p>
                {showCelsius ? <p>{details.temperature.c}°c</p> : <p>{details.temperature.f}°f</p>}
                <p>{details.text}</p>
            </div>
        </div>
    );
}