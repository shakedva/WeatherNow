import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';
import SearchBar from "./SearchBar.jsx"
import Forecast from "./Forecast.jsx"

const DEFAULT_LOCATION = {
    key: '215854',
    localizedName: 'Tel Aviv',
    country: 'Israel',
}
export default function Home({location = DEFAULT_LOCATION}) {
    const { state } = useLocation();
    const [selectedLocation, setSelectedLocation] = useState(location)
    function handleLocationClicked(location){
        setSelectedLocation(location);
    }
    useEffect(() => {
        if(state) {
            setSelectedLocation(state.location);
        }
    }, [location]);

    return (
        <div id="home">
            <SearchBar onLocationClicked={handleLocationClicked}/>
            <Forecast location={selectedLocation}/>
        </div>
    )
}