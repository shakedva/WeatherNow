import LocationDetails from "./LocationDetails.jsx"
export default function Forecast({ location }) {

    return (
        <div id="forecast">
            <LocationDetails location={location}/>
        </div>
    )
}