export const apiKey = 'x5SN5T7HFN8EDHhiIYF4GJ6HbmvESGjC';
export const currentConditionsAddress = 'http://dataservice.accuweather.com/currentconditions/v1/';
export const autocompleteAddress = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
export const fiveDayForecastAddress = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
export const geopositionAddress = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search'

export function convertISO8601ToDayOfTheWeek(originalDate) {
    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(originalDate);
    const dayNumber = date.getDay();
    return daysOfTheWeek[dayNumber];
}
export function convertCelsiusToFahrenheit(temperature) {
    return (temperature * (9/5) + 32).toFixed(2);
}