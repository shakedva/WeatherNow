import { HashRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Favorites from './components/Favorites.jsx';
import Home from './components/Home.jsx';
import { clearStorageAfterTtlMinutes, apiKey, geopositionAddress } from "./util.js";
import ErrorPage from "./components/ErrorPage.jsx";
import './App.css';
import { locationsActions } from "./store/locations.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DEFAULT_LOCATION = {
  key: '215854',
  localizedName: 'Tel Aviv',
  country: 'Israel',
}

function App() {
  const dispatch = useDispatch();
  clearStorageAfterTtlMinutes();
  useEffect(() => {
    function getUserCurrentPosition() {
      dispatch(locationsActions.setSelectedLocation(DEFAULT_LOCATION));
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`${geopositionAddress}?` + new URLSearchParams({
          apikey: apiKey,
          q: `${lat},${lon}`
        }))
          .then(res => res.json())
          .then(json => {
            const currentLocation = {
              key: json.Key,
              localizedName: json.LocalizedName,
              country: json.Country.LocalizedName,
            };
            dispatch(locationsActions.setSelectedLocation(currentLocation));
          }).catch(function () {
            dispatch(locationsActions.setSelectedLocation(DEFAULT_LOCATION));
          })
      }, (error) => {
        dispatch(locationsActions.setSelectedLocation(DEFAULT_LOCATION));
      });
    }
    getUserCurrentPosition();
  }, []);
  return (
    <HashRouter>
      {/*Use HashRouter instead of BrowserRouter due to GitHub pages deploy requirements */}
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
