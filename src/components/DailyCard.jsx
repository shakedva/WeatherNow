import { convertCelsiusToFahrenheit, getWeatherIcon } from "../util.js";
import { useSelector } from 'react-redux'

export default function DailyCard({ dailyForecast }) {
    const temperatureUnit = useSelector(state => state.temperature.temperatureUnit)
    const minimumTemp = dailyForecast.minimumTemperature;
    const maximumTemp = dailyForecast.maximumTemperature;
    const temperature = temperatureUnit === 'celsius' ?
        `${minimumTemp}° - ${maximumTemp}° ` :
        `${convertCelsiusToFahrenheit(minimumTemp)}° - ${convertCelsiusToFahrenheit(maximumTemp)}°`
    const iconName = getWeatherIcon(dailyForecast.icon);
    return (
        <div className="card daily-card d-flex">
            <div className="card-body row d-flex justify-content-between">
                <div className="col-5">
                    <h5 className="card-title daily-card-title">{dailyForecast.date}</h5>
                    <div className="card-text"> {temperature} </div>
                </div>
                <div className="col-5 d-flex flex-row-reverse">
                    <img className="daily-card-icon" src={require(`../assets/icons/${iconName}`)} alt={iconName} />
                </div> 
            </div>
        </div>
    )
}

