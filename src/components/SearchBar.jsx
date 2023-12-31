import { useState } from "react"
const autocompleteAddress = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete'
const apiKey = 'aID1uGelP7d2tREmiHtpwKlPUNty1Be6'

export default function SearchBar({ onLocationClicked }) {
    const [location, setLocation] = useState('');
    const [cities, setCities] = useState([]);

    function handleLocationChange(event) {
        const city = event.target.value;
        setLocation(city);
        if (cities.includes(city)) {
            onLocationClicked(city)
        }
    }
    function handleSubmit() {
        console.log(location);

        fetch(`${autocompleteAddress}?apikey=${apiKey}&q=${location}`)
            .then(res => res.json())
            .then(json => {
                console.log(json)

                const suggestions = []
                json.forEach(city => {
                    console.log(`${city.LocalizedName}, ${city.Country.ID}`)
                    const cityData = `${city.LocalizedName}, ${city.Country.ID}`
                    suggestions.push(cityData)
                });
                setCities(suggestions);

            }).catch(function () {
                console.log(`servers are not available right now`)
            })
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="col-5">
                <input className="form-control" type="text" list="cities" value={location} onChange={handleLocationChange} />
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
            <div>
                <button className="btn btn-outline-success" onClick={handleSubmit}>Search</button>
            </div>
        </div>
    )
}