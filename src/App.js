import { HashRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Favorites from './components/Favorites.jsx';
import Home from './components/Home.jsx';
import FavoriteLocationsProvider from "./contexts/FavoriteLocationsContext.jsx";
import TemperatureProvider from "./contexts/TemperatureContext.jsx";
import ThemeProvider from "./contexts/ThemeContext.jsx";
import { clearStorageAfterTtlMinutes } from "./util.js";
import ErrorPage from "./components/ErrorPage.jsx";
import './App.css';


function App() {
  clearStorageAfterTtlMinutes();
  return (
    <ThemeProvider>
      <FavoriteLocationsProvider>
        <TemperatureProvider>
          <HashRouter>
            {/*Use HashRouter instead of BrowserRouter due to GitHub pages deploy requirements */}
            <Routes>
              <Route path="/" element={<Header />}>
                <Route index element={<Home />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="*" element={<ErrorPage/>}/>
              </Route>
            </Routes>
          </HashRouter>
        </TemperatureProvider>
      </FavoriteLocationsProvider>
    </ThemeProvider>
  );
}

export default App;
