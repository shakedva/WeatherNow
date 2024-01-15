import { useState, useEffect } from "react"
import { autocompleteAddress, apiKey } from "../util";
import { useDispatch } from 'react-redux'
import { locationsActions } from "../store/locations.js";
import './SearchBar.css';
import ErrorPage from "./ErrorPage.jsx";
const DEBOUNCE_DELAY = 500;

export default function SearchBar() {
    const [location, setLocation] = useState('');
    const [cities, setCities] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    // Fetch suggestion from autocomplete api when input changes after debounce
    useEffect(() => {
        const getData = setTimeout(() => {
            setError(false);
            if (location === '' || cities.some(location => location === `${location.localizedName}, ${location.country}`)) {
                return;
            }
            fetch(`${autocompleteAddress}?` + new URLSearchParams({
                apikey: apiKey,
                q: location
            }))
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
                    setError(true);
                })
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(getData);
    }, [location]);

    function handleLocationChange(event) {
        let location = event.target.value;
        setLocation(location);
    }
    function handleSuggestionClicked(location) {
        dispatch(locationsActions.setSelectedLocation(location));
        setLocation(`${location.localizedName}, ${location.country}`);
        setShowSuggestions(false); // Close dropdown
    }
    function handleClearClicked() {
        setLocation("");
    }
    return (
        <div className="d-flex justify-content-center" id="search-bar">
            <div className="col-7">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </span>
                    <input list="cities"
                        type="text"
                        className={`form-control ${error ? `border border-danger` : undefined}`}
                        placeholder="Enter Location"
                        aria-label="Location"
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
                {error && <div>Oops, something went wrong. Please try again later.</div>}
            </div>
        </div>
    )
}