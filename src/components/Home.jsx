import { useState } from "react"
import SearchBar from "./SearchBar.jsx"
export default function Home() {
    const [selectedLocation, setSelectedLocation] = useState('')
    function handleLocationClicked(city){
        console.log(`Option clicked: ${city}`)
        setSelectedLocation(city);
    }
    return (
        <div id="home">
            <SearchBar onLocationClicked={handleLocationClicked}/>
            <h1>{selectedLocation}</h1>
        </div>
    )
}