import { Link } from 'react-router-dom';
import LocationDetails from "./LocationDetails.jsx";
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../store/locations.js';


export default function Favorites() {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.locations.favorites)
    function handleFavLocationClicked(location) {
        dispatch(locationsActions.setSelectedLocation(location));
    }
    return (
        <div id="favorites">
            <div className="row">
                {favorites.map(favLocation => {
                    return (
                        <div className="col-4 mb-3"  key={`fav-${favLocation.key}`} >
                            <Link className="link" to="/" onClick={() => handleFavLocationClicked(favLocation)}> 
                                <LocationDetails location={favLocation} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}