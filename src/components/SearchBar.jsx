import { useState, useEffect } from "react"
const autocompleteAddress = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
const apiKey = 'aID1uGelP7d2tREmiHtpwKlPUNty1Be6'

export default function SearchBar({ onLocationClicked }) {
    const [location, setLocation] = useState('');
    const [cities, setCities] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    useEffect(() => {
        const getData = setTimeout(() => {
            if (location === '' || cities.some(city => location === `${city.localizedName}, ${city.country}`)) {
                return;
            }
            fetch(`${autocompleteAddress}?apikey=${apiKey}&q=${location}`)
                .then(res => res.json())
                .then(json => {
                    const suggestions = json.map(city => ({
                        key: city.Key,
                        localizedName: city.LocalizedName,
                        country: city.Country.LocalizedName,
                    }));
                    setCities(suggestions);
                    if (suggestions.length !== 0)
                        setShowSuggestions(true);
                }).catch(function () {
                    console.log(`servers are not available right now`)
                })
        }, 5000);

        return () => clearTimeout(getData);
    }, [location]);

    function handleLocationChange(event) {
        let city = event.target.value;
        city = city.trim();
        setLocation(city);
    }
    function handleSuggestionClicked(city) {
        onLocationClicked(city.key);
        setLocation(`${city.localizedName}, ${city.country}`);
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
                    {cities.map(city => {
                        return (
                            <li
                                className="list-group-item"
                                key={city.key} >
                                <a className="dropdown-item"
                                    onClick={() => handleSuggestionClicked(city)}>
                                    {`${city.localizedName}, ${city.country}`}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}