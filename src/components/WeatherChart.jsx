import { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const WeatherChart = ({ forecast }) => {
    console.log(forecast)
    console.log(new Date().toLocaleString());
    const [formattedForecast, setFormattedForecast] = useState({
        labels: [],
        datasets: [{
            label: "Temperature",
            data: [],
            backgroundColor: ["#e5451c"],
            borderColor: "#e5451c",
            borderWidth: 2
        }]
    });
    useEffect(() => {
        // Update the state when the forecast prop changes
        setFormattedForecast({
          labels: forecast?.map((day) => day.date) || [],
          datasets: [
            {
              label: 'Temperature',
              data: forecast?.map((day) => day.minimumTemperature) || [],
              backgroundColor: ['#e5451c'],
              borderColor: '#e5451c',
              borderWidth: 2,
            },
          ],
        });
      }, [forecast]);
    return <Line data={formattedForecast} />;
};
export default WeatherChart;
