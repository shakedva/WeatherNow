import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: []
}

const favoriteLocationsSlice = createSlice({
    name: 'favoriteLocations', 
    initialState,
    reducers: {
        addToFavorites(state, action){
            const updatedFavorites = [...state.favorites];
            if(!updatedFavorites.some(favLocation => favLocation.key === action.payload.key)) {
                state.favorites.push({
                    key: action.payload.key,
                    localizedName: action.payload.localizedName,
                });
            }
        },
        removeFromFavorites(state, action){
            state.favorites.filter(favLocation => favLocation.key !== action.payload.key);
        },
    }
});

export const favoriteLocationsActions = favoriteLocationsSlice.actions;
export default favoriteLocationsSlice.reducer;