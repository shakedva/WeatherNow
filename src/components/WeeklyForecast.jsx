import { useState, useEffect } from "react";
import { fiveDayForecastAddress, apiKey, convertISO8601ToDayOfTheWeek } from "../util";
import DailyCard from "./DailyCard.jsx";
import WeatherChart from "./WeatherChart.jsx";
import ErrorPage from "./ErrorPage.jsx"
import './WeeklyForecast.css'

const DEFAULT_FORECAST = {
    headlineText: '',
    dailyForecasts: [],
}

export default function WeeklyForecast({ location }) {
    const [forecast, setForecast] = useState(DEFAULT_FORECAST);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWeeklyForecast = async () => {
            try {

                const response = await fetch(`${fiveDayForecastAddress}${location.key}?` + new URLSearchParams({
                    apikey: apiKey,
                    metric: true.toString()
                }));
                const json = await response.json();
                const headlineText = json.Headline.Text;
                const dailyForecasts = json.DailyForecasts.map(day => ({
                    date: convertISO8601ToDayOfTheWeek(day.Date),
                    minimumTemperature: day.Temperature.Minimum.Value,
                    maximumTemperature: day.Temperature.Maximum.Value,
                    icon: day.Day.Icon,
                }));
                const updatedForecast = {
                    headlineText,
                    dailyForecasts
                }
                localStorage.setItem(`forecast_${location.key}`, JSON.stringify(updatedForecast));
                setForecast(updatedForecast);
                setError(false);
            }
            catch (error) {
                setError(true);
            }
        };
        const storedForecast = localStorage.getItem(`forecast_${location.key}`);
        if (storedForecast) {
            setForecast(JSON.parse(storedForecast));
        } else {
            fetchWeeklyForecast();
        }
    }, [location]);



    return (
        <div id="weekly-forecast">
            <div className="container">
                {error ? <ErrorPage>Failed to fetch the weekly forecast. Please try again later.</ErrorPage> :
                    <>
                        <h4 className="forecast-title">{forecast.headlineText}</h4>
                        <div className="row">
                            <div className="col-sm-12 col-lg-4 pb-3">
                                {forecast.dailyForecasts.map(day => {
                                    return <DailyCard key={`forecast-${location.key}-${day.date}`} dailyForecast={day} />
                                })}
                            </div>
                            <div className="weather-chart col-sm-12 col-lg-8">
                                <WeatherChart forecast={forecast.dailyForecasts} />
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}