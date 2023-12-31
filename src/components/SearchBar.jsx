import { useState, useEffect } from "react"
const autocompleteAddress = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
const apiKey = 'aID1uGelP7d2tREmiHtpwKlPUNty1Be6'

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
        // location = location.trim();
        setLocation(location);
    }
    function handleSuggestionClicked(location) {
        onLocationClicked(location);
        setLocation(`${location.localizedName}, ${location.country}`);
        setShowSuggestions(false);
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="col-5">
                <input
                    className="form-control"
                    type="text" list="cities"
                    value={location}
                    onChange={handleLocationChange}
                    onClick={() => { if (cities.length != 0) setShowSuggestions(true)}}
                />
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