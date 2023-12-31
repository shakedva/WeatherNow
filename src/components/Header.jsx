import { Link, Outlet } from "react-router-dom";

export default function Header() {
    return (
        <div id='header'>
            <header className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-text">
                        Weather App
                    </span>
                    <div className="d-flex">
                        <Link
                            to='/'
                            className="btn btn-outline-success">
                            Home
                        </Link>
                        <Link
                            to='/favorites'
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