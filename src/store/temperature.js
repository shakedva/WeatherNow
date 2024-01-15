import { createSlice } from "@reduxjs/toolkit";

const initialTemperatureState = {
    temperatureUnit: 'celsius', 
};

const temperatureSlice = createSlice({
    name: 'temperature', 
    initialState: initialTemperatureState,
    reducers: {
        toggleTemperatureUnit(state){
            state.temperatureUnit = (state.temperatureUnit === 'celsius') ?  'fahrenheit' : 'celsius';
        },
    }
});
export const getTemperatureSymbol = (unit) => {
    return unit === 'celsius' ? '°C' : '°F';
};

export const temperatureActions = temperatureSlice.actions;
export default temperatureSlice.reducer;