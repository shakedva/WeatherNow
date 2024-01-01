import { useContext } from "react";
import { TemperatureContext } from "../contexts/TemperatureContext.jsx";
import { convertCelsiusToFahrenheit } from "../util.js";

export default function DailyCard({ dailyForecast }) {
    const { temperatureUnit } = useContext(TemperatureContext);
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{dailyForecast.date}</h5>
                <div className="card-text">
                    { temperatureUnit === 'celsius' ? <p>{dailyForecast.temperature}°C</p> : <p>{convertCelsiusToFahrenheit(dailyForecast.temperature)}°F</p>  }
                </div>
            </div>
        </div>
    )
}

