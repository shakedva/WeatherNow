import { useState, useEffect } from "react"
const autocompleteAddress = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
const apiKey = 'aID1uGelP7d2tREmiHtpwKlPUNty1Be6'

export default function SearchBar({ onLocationClicked }) {
    const [location, setLocation] = useState('');
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const getData = setTimeout(() => {
            if (location === '' || cities.includes(location)) {
                return;
            }
            fetch(`${autocompleteAddress}?apikey=${apiKey}&q=${location}`)
                .then(res => res.json())
                .then(json => {
                    console.log(json)

                    const suggestions = []
                    json.forEach(city => {
                        console.log(`debounce: ${city.LocalizedName}, ${city.Country.ID}`)
                        const cityData = `${city.LocalizedName}, ${city.Country.ID}`
                        suggestions.push(cityData)
                    });
                    setCities(suggestions);

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
        if (cities.includes(city)) {
            onLocationClicked(city);
        }
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="col-5">
                <input
                    className="form-control"
                    type="text" list="cities"
                    value={location}
                    onChange={handleLocationChange}
                />
                <datalist id="cities">
                    {cities.map(city => {
                        return (
                            <option
                                key={city}
                                value={city}
                            >
                                {city}
                            </option>
                        )
                    })}
                </datalist>
            </div>
        </div>
    )
}