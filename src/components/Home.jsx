import { useState } from "react"
import SearchBar from "./SearchBar.jsx"
import Forecast from "./Forecast.jsx"
const DEFAULT_LOCATION = {
    key: '215854',
    localizedName: 'Tel Aviv',
    country: 'Israel',
}
export default function Home() {
    const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION)
    function handleLocationClicked(location){
        console.log(`Option clicked: ${location}`)
        setSelectedLocation(location);
    }
    return (
        <div id="home">
            <SearchBar onLocationClicked={handleLocationClicked}/>
            <Forecast location={selectedLocation}/>
        </div>
    )
}