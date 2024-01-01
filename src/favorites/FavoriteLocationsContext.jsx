import { createContext, useState, useReducer } from 'react'

export const FavoriteLocationsContext = createContext({
    favorites: [],
    addToFavorites: () => { },
});
function favoriteLocationsReducer(state, action) {
    if(action.type === 'ADD-FAVORITE'){
        const updatedFavorites = [...state.favorites]; 
        updatedFavorites.push({
            key: action.payload.key,
            localizedName: action.payload.localizedName,
        });
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
    const ctxValue = {
        favorites: favoriteLocationsState.favorites,
        addToFavorites: handleAddToFavorites,
    }
    return(
        <FavoriteLocationsContext.Provider value={ctxValue}>
            {children}
        </FavoriteLocationsContext.Provider>
    )
}