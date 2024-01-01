import { createContext, useState } from 'react'

export const TemperatureContext = createContext();

export default function TemperatureProvider({ children }) {
    const [temperatureUnit, setTemperatureUnit] = useState('celsius');
    const toggleTemperatureUnit = () => {
        setTemperatureUnit((prevTempUnit) => (prevTempUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
      };
    return (
        <TemperatureContext.Provider value={{temperatureUnit, toggleTemperatureUnit}}>
            {children}
        </TemperatureContext.Provider>
    )
}