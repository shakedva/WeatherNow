import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme';
import temperatureReducer from './temperature';

const store = configureStore({
    reducer: {
        theme: themeReducer, 
        temperature: temperatureReducer,
    }
});

export default store;