import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { TemperatureContext } from "../contexts/TemperatureContext.jsx";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import lightModeImg from '../assets/brightness-high-fill.svg';
import darkModeImg from '../assets/cloud-moon-fill.svg';
import './Header.css'


export default function Header() {
    const { temperatureUnit, toggleTemperatureUnit } = useContext(TemperatureContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const unit = (temperatureUnit === 'celsius') ? '°C' : '°F';
    document.body.style.backgroundColor = theme === 'light' ? '#ffdcbc' : '#0d1e31';

    let themeImg = <img src={lightModeImg} width="24" height="24"/>
    if (theme === 'dark')
        themeImg = <img src={darkModeImg} width="24" height="24"/>

    return (
        <div id={theme}>
            <header className='navbar d-flex sticky-top' id='header'>
                <div className="container-fluid">
                    <span className="navbar-text p-1">
                        Weather App
                    </span>
                    <div className="btn-group me-auto ms-2 toggle-buttons" role="group" aria-label="Default button group">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={toggleTemperatureUnit}>
                            {unit}
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={toggleTheme}>
                                {themeImg}
                        </button>
                    </div>
                    
                    <div className="btn-group me-0" role="group" aria-label="Default button group">
                        <Link
                            to='/'
                            type="button"
                            selected
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