import LocationDetails from "./LocationDetails.jsx"
import WeeklyForecast from "./WeeklyForecast.jsx"
export default function Forecast({ location }) {

    return (
        <div id="forecast">
            <LocationDetails location={location}/>
            <WeeklyForecast location={location}/>
        </div>
    )
}