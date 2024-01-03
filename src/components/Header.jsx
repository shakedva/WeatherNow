import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { TemperatureContext } from "../contexts/TemperatureContext.jsx";
import { ThemeContext } from "../contexts/ThemeContext.jsx";



export default function Header() {
    const { temperatureUnit, toggleTemperatureUnit } = useContext(TemperatureContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const unit = (temperatureUnit === 'celsius') ? '°C' : '°F';
    document.body.style.backgroundColor = theme === 'light' ? '#ffdcbc' : '#0d1e31';
    return (
        <div id={theme}>
            <header className='navbar d-flex' id='header'>
                <div className="container-fluid">
                    <span className="navbar-text p-2">
                        Weather App
                    </span>
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={toggleTemperatureUnit}>
                        {unit}
                    </button>
                    <button
                        className="btn btn-outline-secondary me-auto"
                        onClick={toggleTheme}>
                            {theme} mode
                    </button>
                    <div className="btn-group me-0" role="group" aria-label="Default button group">
                        <Link
                            to='/'
                            type="button"
                            className="btn btn-outline-success">
                            Home
                        </Link>
                        <Link
                            to='/favorites'
                            type="button"
                            className="btn btn-outline-success">
                            Favorites
                        </Link>
                    </div>
                </div>
            </header>
            <Outlet />
        </div>
    )
}