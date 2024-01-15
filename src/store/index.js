import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme';
import temperatureReducer from './temperature';
import locationsReducer from './locations';
const store = configureStore({
    reducer: {
        theme: themeReducer, 
        temperature: temperatureReducer,
        locations: locationsReducer,
    }
});

export default store;