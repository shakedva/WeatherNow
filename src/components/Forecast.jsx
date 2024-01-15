import LocationDetails from "./LocationDetails.jsx"
import WeeklyForecast from "./WeeklyForecast.jsx"
import { useSelector } from 'react-redux'

export default function Forecast() {
    const location = useSelector(state => state.locations.selectedLocation);

    return (
        <div id="forecast">
            <LocationDetails location={location}/>
            <WeeklyForecast location={location}/>
        </div>
    )
}