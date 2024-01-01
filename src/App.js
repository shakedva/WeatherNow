import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Favorites from './components/Favorites.jsx';
import Home from './components/Home.jsx';
import FavoriteLocationsProvider from "./favorites/FavoriteLocationsContext.jsx";
import './App.css';
function App() {
  return (
    <FavoriteLocationsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoriteLocationsProvider>
  );
}

export default App;
