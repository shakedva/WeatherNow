import { FavoriteLocationsContext } from "../favorites/FavoriteLocationsContext.jsx";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import LocationDetails from "./LocationDetails.jsx";

export default function Favorites() {
    const { favorites } = useContext(FavoriteLocationsContext);
    const navigate = useNavigate();
    function handleFavoriteClicked() {
        navigate('/');
    }
    return (
        <div id="favorites">
            <h2>Favorites</h2>
            <div>
                {favorites.map(favLocation => {
                    return (
                        <Link className="link" to="/" key={`fav-${favLocation.key}`} state={{ location: favLocation }}>
                            <LocationDetails location={favLocation} />
                        </Link>
                    )
                })}
            </div>
        </div>

    )
}