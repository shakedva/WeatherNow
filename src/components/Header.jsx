import { Link, Outlet } from "react-router-dom";

export default function Header() {
    return (
        <div id='header'>
            <header className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-text">
                        Weather App
                    </span>
                    <div className="btn-group" role="group" aria-label="Default button group">
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