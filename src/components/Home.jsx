import SearchBar from "./SearchBar.jsx"
import Forecast from "./Forecast.jsx"
import { useSelector } from 'react-redux'

export default function Home() {
    const location = useSelector(state => state.locations.selectedLocation);

    if(!location) {
        return <h4 className="loading-text">Loading...</h4>;
    }
    return (
        <div id="home">
            <SearchBar/>
            <Forecast />
        </div>
    )
}