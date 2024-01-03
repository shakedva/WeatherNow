import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Favorites from './components/Favorites.jsx';
import Home from './components/Home.jsx';
import FavoriteLocationsProvider from "./contexts/FavoriteLocationsContext.jsx";
import TemperatureProvider from "./contexts/TemperatureContext.jsx";
import ThemeProvider from "./contexts/ThemeContext.jsx";
import { clearStorageAfterTtlMinutes } from "./util.js";
import './App.css';

function App() {
  clearStorageAfterTtlMinutes();
  return (
    <ThemeProvider>
      <FavoriteLocationsProvider>
        <TemperatureProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Header />}>
                <Route index element={<Home />} />
                <Route path="favorites" element={<Favorites />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TemperatureProvider>
      </FavoriteLocationsProvider>
    </ThemeProvider>
  );
}

export default App;
