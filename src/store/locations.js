import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
    selectedLocation: null,
}

const locationsSlice = createSlice({
    name: 'locations', 
    initialState,
    reducers: {
        addToFavorites(state, action){
            const updatedFavorites = [...state.favorites];
            if(!updatedFavorites.some(favLocation => favLocation.key === action.payload.key)) {
                updatedFavorites.push({
                    key: action.payload.key,
                    localizedName: action.payload.localizedName,
                });
            }
            state.favorites = updatedFavorites;
        },
        removeFromFavorites(state, action){
            state.favorites = state.favorites.filter(favLocation => favLocation.key !== action.payload.key);
        },
        setSelectedLocation(state, action) {
            state.selectedLocation = action.payload;
        }
    }
});

export const locationsActions = locationsSlice.actions;
export default locationsSlice.reducer;