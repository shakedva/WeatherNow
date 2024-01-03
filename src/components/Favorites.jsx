import { FavoriteLocationsContext } from "../contexts/FavoriteLocationsContext.jsx";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import LocationDetails from "./LocationDetails.jsx";

export default function Favorites() {
    const { favorites } = useContext(FavoriteLocationsContext);
    return (
        <div id="favorites">
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