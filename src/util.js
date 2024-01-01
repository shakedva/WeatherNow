export const apiKey = 'aID1uGelP7d2tREmiHtpwKlPUNty1Be6';
export const currentConditionsAddress = 'http://dataservice.accuweather.com/currentconditions/v1/';
export const autocompleteAddress = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
export const fiveDayForecastAddress = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
 
export function convertISO8601ToDayOfTheWeek(originalDate) {
    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(originalDate);
    const dayNumber = date.getDay();
    return daysOfTheWeek[dayNumber];
}
export function convertCelsiusToFahrenheit(temperature) {
    return (temperature * (9/5) + 32).toFixed(2);
}