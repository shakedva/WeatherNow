export const apiKey = process.env.REACT_APP_API_KEY;
export const currentConditionsAddress = 'https://dataservice.accuweather.com/currentconditions/v1/';
export const autocompleteAddress = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
export const fiveDayForecastAddress = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
export const geopositionAddress = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search'


export function convertISO8601ToDayOfTheWeek(originalDate) {
    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(originalDate);
    const dayNumber = date.getDay();
    return daysOfTheWeek[dayNumber];
}
export function convertCelsiusToFahrenheit(temperature) {
    return (temperature * (9/5) + 32).toFixed(2);
}
export function clearStorageAfterTtlMinutes(ttlMinutes = 10) {
    const now = new Date().getTime();
    const setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > ttlMinutes*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
    }
}

export function getWeatherIcon (icon) {
    const iconNumberToImg = {
        1: 'clear-day.svg',
        2: 'clear-day.svg',
        3: 'clear-day.svg',
        4: 'clear-day.svg',
        5: 'haze-day.svg',
        6: 'cloudy.svg',
        7: 'cloudy.svg',
        8: 'overcast.svg',
        11: 'fog.svg',
        12: 'rain.svg',
        13: 'partly-cloudy-day-rain.svg',
        14: 'partly-cloudy-day-rain.svg',
        15: 'thunderstorms.svg',
        16: 'thunderstorms.svg',
        17: 'thunderstorms-day.svg',
        18: 'rain.svg',
        20: 'sleet.svg',
        21: 'partly-cloudy-day-sleet.svg',
        22: 'snow.svg',
        23: 'partly-cloudy-day-snow.svg',
        24: 'snow.svg',
        25: 'sleet.svg',
        26: 'rain.svg',
        29: 'sleet.svg',
        30: 'thermometer-mercury.svg',
        31: 'thermometer-mercury-cold.svg',
        32: 'wind.svg',
        33: 'clear-night.svg',
        34: 'clear-night.svg',
        35: 'clear-night.svg',
        36: 'clear-night.svg',
        37: 'haze-night.svg',
        38: 'partly-cloudy-night.svg',
        39: 'partly-cloudy-night-rain.svg',
        40: 'partly-cloudy-night-rain.svg',
        41: 'thunderstorms-rain.svg',
        42: 'thunderstorms-rain.svg',
        43: 'thunderstorms-rain.svg',
        44: 'thunderstorms-snow.svg',
    }
    
    return iconNumberToImg[icon] || 'clear-day.svg';
}