import LocationDetails from "./LocationDetails.jsx"
import WeeklyForecast from "./WeeklyForecast.jsx"
import { useSelector } from 'react-redux'

export default function Forecast() {
    // While we can get location inside WeeklyForecast with useSelector,
    // I decided to fetch it once here, as LocationDetails must get it from the parent component.
    const location = useSelector(state => state.locations.selectedLocation);

    return (
        <div id="forecast">
            <LocationDetails location={location}/>
            <WeeklyForecast location={location}/>
        </div>
    )
}