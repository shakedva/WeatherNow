import { Link, Outlet } from "react-router-dom";
import { TemperatureContext } from "../contexts/TemperatureContext.jsx";
import { useContext } from "react";

export default function Header() {
    const { temperatureUnit, toggleTemperatureUnit } = useContext(TemperatureContext);
    const unit = (temperatureUnit === 'celsius') ? '°C' : '°F';

    return (
        <div>
            <header className="navbar bg-body-tertiary d-flex" id='header'>
                <div className="container-fluid">
                    <span className="navbar-text p-2">
                        Weather App
                    </span>
                    <button
                        className="btn btn-outline-secondary me-auto"
                        onClick={toggleTemperatureUnit}>
                        {unit}
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