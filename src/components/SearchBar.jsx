import { useState, useEffect } from "react"
import { autocompleteAddress, apiKey } from "../util";

export default function SearchBar({ onLocationClicked }) {
    const [location, setLocation] = useState('');
    const [cities, setCities] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    useEffect(() => {
        const getData = setTimeout(() => {
            if (location === '' || cities.some(location => location === `${location.localizedName}, ${location.country}`)) {
                return;
            }
            fetch(`${autocompleteAddress}?apikey=${apiKey}&q=${location}`)
                .then(res => res.json())
                .then(json => {
                    const suggestions = json.map(location => ({
                        key: location.Key,
                        localizedName: location.LocalizedName,
                        country: location.Country.LocalizedName,
                    }));
                    setCities(suggestions);
                    if (suggestions.length !== 0)
                        setShowSuggestions(true);
                }).catch(function () {
                    console.log(`servers are not available right now`)
                })
        }, 1000);

        return () => clearTimeout(getData);
    }, [location]);

    function handleLocationChange(event) {
        let location = event.target.value;
        setLocation(location);
    }
    function handleSuggestionClicked(location) {
        onLocationClicked(location);
        setLocation(`${location.localizedName}, ${location.country}`);
        setShowSuggestions(false);
    }
    function handleClearClicked() {
        setLocation("");
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="col-7">

                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                    </span>
                    <input list="cities"
                        type="text"
                        className="form-control clearable-input"
                        placeholder="Enter Location"
                        aria-label="Location"
                        aria-describedby="basic-addon1" 
                        value={location}
                        onChange={handleLocationChange}
                        onClick={() => { if (cities.length != 0) setShowSuggestions(true) }}    
                        />
                    <span className="input-group-text" onClick={handleClearClicked}>&times;</span>
                </div>
                <ul className={`dropdown-menu ${showSuggestions ? 'show' : undefined}`} id="list-group">
                    {cities.map(location => {
                        return (
                            <li
                                className="list-group-item"
                                key={location.key} >
                                <a className="dropdown-item"
                                    onClick={() => handleSuggestionClicked(location)}>
                                    {`${location.localizedName}, ${location.country}`}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}