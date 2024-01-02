import { useContext } from "react";
import { TemperatureContext } from "../contexts/TemperatureContext.jsx";
import { convertCelsiusToFahrenheit } from "../util.js";

export default function DailyCard({ dailyForecast }) {
    const { temperatureUnit } = useContext(TemperatureContext);
    const minimumTemp = dailyForecast.minimumTemperature;
    const maximumTemp = dailyForecast.maximumTemperature;
    const temperature = temperatureUnit === 'celsius' ?
        `${minimumTemp}° - ${maximumTemp}° ` :
        `${convertCelsiusToFahrenheit(minimumTemp)}° - ${convertCelsiusToFahrenheit(maximumTemp)}°`
    return (
        <div className="card daily-card">
            <div className="card-body">
                <h5 className="card-title daily-card-title">{dailyForecast.date}</h5>
                <div className="card-text"> {temperature} </div>
            </div>
        </div>
    )
}

