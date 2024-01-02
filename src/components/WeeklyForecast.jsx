import { useState, useEffect } from "react";
import { fiveDayForecastAddress, apiKey, convertISO8601ToDayOfTheWeek } from "../util";
import DailyCard from "./DailyCard.jsx";

const DEFAULT_FORECAST = {
    headlineText: '',
    dailyForecasts: [],
}


export default function WeeklyForecast({ location }) {
    const [forecast, setForecast] = useState(DEFAULT_FORECAST);
    useEffect(() => {
        const fetchWeeklyForecast = async () => {
            try {
                const response = await fetch(`${fiveDayForecastAddress}${location.key}?apikey=${apiKey}&metric=true`);
                const json = await response.json();
                const headlineText = json.Headline.Text;
                const dailyForecasts = json.DailyForecasts.map(day => ({
                    date: convertISO8601ToDayOfTheWeek(day.Date),
                    temperature: day.Temperature.Minimum.Value,
                }));
                const updatedForecast = {
                    headlineText,
                    dailyForecasts
                }
                    localStorage.setItem(`forecast_${location.key}`, JSON.stringify(updatedForecast));
                    setForecast(updatedForecast);
                }
            catch(error) {
                console.log(`servers are not available right now`)
            }
        };
        const storedForecast =  localStorage.getItem(`forecast_${location.key}`);
        if (storedForecast) {
            console.log('fetching forecast from storage... ')
            setForecast(JSON.parse(storedForecast));
        } else {
            fetchWeeklyForecast();
        }
            

        // fetch(`${fiveDayForecastAddress}${location.key}?apikey=${apiKey}&metric=true`)
        // .then(res => res.json())
        // .then(json => {
        //     const headlineText = json.Headline.Text;
        //     const dailyForecasts = json.DailyForecasts.map(day => ({
        //         date: convertISO8601ToDayOfTheWeek(day.Date),
        //         temperature: day.Temperature.Minimum.Value,
        //     }));
        //     const updatedForecast = {
        //         headlineText,
        //         dailyForecasts
        //     }
        //     setForecast(updatedForecast);

        // }).catch(function () {
        //     console.log(`servers are not available right now`)
        // })
    }, [location]);

    return (
        <div>
            <h2>{forecast.headlineText}</h2>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {forecast.dailyForecasts.map(day => {
                            return <DailyCard key={`forecast-${location.key}-${day.date}`} dailyForecast={day} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}