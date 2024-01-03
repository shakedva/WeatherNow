import { createContext, useState } from 'react'

export const TemperatureContext = createContext();

export default function TemperatureProvider({ children }) {
    const [temperatureUnit, setTemperatureUnit] = useState('celsius');
    const toggleTemperatureUnit = () => {
        setTemperatureUnit((prevTempUnit) => (prevTempUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
      };
    const getTemperatureUnit = () => {
        return temperatureUnit === 'celsius' ? '°C' : '°F';
    }
    return (
        <TemperatureContext.Provider value={{temperatureUnit, toggleTemperatureUnit, getTemperatureUnit}}>
            {children}
        </TemperatureContext.Provider>
    )
}