import { FavoriteLocationsContext } from "../contexts/FavoriteLocationsContext.jsx";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import LocationDetails from "./LocationDetails.jsx";

export default function Favorites() {
    const { favorites } = useContext(FavoriteLocationsContext);
    return (
        <div id="favorites">
            <div className="row">
                {favorites.map(favLocation => {
                    return (
                        <div className="col-4 mb-3"  key={`fav-${favLocation.key}`} >
                            <Link className="link" to="/" state={{ location: favLocation }}>
                                <LocationDetails location={favLocation} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}