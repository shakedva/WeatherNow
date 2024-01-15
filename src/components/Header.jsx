import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { themeActions } from "../store/theme.js";
import { temperatureActions, getTemperatureSymbol } from "../store/temperature.js";
import lightModeImg from '../assets/brightness-high-fill.svg';
import darkModeImg from '../assets/cloud-moon-fill.svg';
import './Header.css'

export default function Header() {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.theme)
    const temperatureUnit = useSelector(state => state.temperature.temperatureUnit)

    document.body.style.backgroundColor = theme === 'light' ? '#ffdcbc' : '#0d1e31';

    let themeImg = <img src={lightModeImg} width="24" height="24" alt="Light mode"/>
    if (theme === 'dark')
        themeImg = <img src={darkModeImg} width="24" height="24" alt="Dark mode"/>

    function handleToggle() {
        dispatch(themeActions.toggleTheme());
    }
    function handleToggleTemperatureUnit() {
        dispatch(temperatureActions.toggleTemperatureUnit());
    }
    return (
        <div id={theme}>
            <header className='navbar d-flex sticky-top' id='header'>
                <div className="container-fluid">
                    <span className="navbar-text navbar-brand p-1">
                        Weather App
                    </span>
                    <div className="me-auto ms-2 toggle-buttons" role="group" aria-label="Default button group">
                        <NavLink
                            to='/'
                            className="link navbar-brand">
                            Home
                        </NavLink>
                        <NavLink
                            to='/favorites'
                            className="link navbar-brand">
                            Favorites
                        </NavLink>
                    </div>
                    <div className="btn-group me-0" role="group" aria-label="Default button group">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={handleToggleTemperatureUnit}>
                            {getTemperatureSymbol(temperatureUnit)}
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={handleToggle}>
                            {themeImg}
                        </button>
                    </div>
                </div>
            </header>
            <Outlet />
        </div>
    )
}