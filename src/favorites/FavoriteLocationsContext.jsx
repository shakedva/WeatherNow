import { createContext, useState, useReducer } from 'react'

export const FavoriteLocationsContext = createContext({
    favorites: [],
    addToFavorites: () => { },
    removeFromFavorites: () => { },
});
function favoriteLocationsReducer(state, action) {
    if(action.type === 'ADD-FAVORITE'){
        const updatedFavorites = [...state.favorites];
        if(!updatedFavorites.some(favLocation => favLocation.key === action.payload.key)) {
            updatedFavorites.push({
                key: action.payload.key,
                localizedName: action.payload.localizedName,
            });
        }        
        return {
            favorites: updatedFavorites,
        };
    }
    if(action.type === 'REMOVE-FAVORITE'){
        const updatedFavorites = state.favorites.filter(favLocation => favLocation.key !== action.payload.key);
        return {
            favorites: updatedFavorites,
        };

    }
}

export default function FavoriteLocationsProvider({ children }) {
    const [favoriteLocationsState, favoriteLocationsDispatch] = useReducer(
        favoriteLocationsReducer,
        {
            favorites: []
        }
    );
    function handleAddToFavorites(location) {
        favoriteLocationsDispatch({
            type: 'ADD-FAVORITE',
            payload: location
        });
    }
    function handleRemoveFromFavorites(location) {
        favoriteLocationsDispatch({
            type: 'REMOVE-FAVORITE',
            payload: location
        });
    }

    const ctxValue = {
        favorites: favoriteLocationsState.favorites,
        addToFavorites: handleAddToFavorites,
        removeFromFavorites: handleRemoveFromFavorites,
    }
    return(
        <FavoriteLocationsContext.Provider value={ctxValue}>
            {children}
        </FavoriteLocationsContext.Provider>
    )
}