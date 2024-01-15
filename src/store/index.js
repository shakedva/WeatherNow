import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme';
import temperatureReducer from './temperature';
import favoriteLocationsReducer from './favoriteLocations';
const store = configureStore({
    reducer: {
        theme: themeReducer, 
        temperature: temperatureReducer,
        favoriteLocations: favoriteLocationsReducer,
    }
});

export default store;