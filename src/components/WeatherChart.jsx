import { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { ThemeContext } from '../contexts/ThemeContext.jsx';

const WeatherChart = ({ forecast }) => {
  const { theme } = useContext(ThemeContext);
  const [formattedForecast, setFormattedForecast] = useState({
    labels: [],
    datasets: [{
      label: "",
      data: [],
      backgroundColor: [],
      borderColor: "",
      borderWidth: 2
    }]
  });
  const ticksColor = theme === 'light' ? 'black' : 'white';
  const chartOptions= {
    scales: {
      x: {
        ticks: {
          color: ticksColor,
        },
      },
      y: {
        ticks: {
          color: ticksColor,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: ticksColor,
        },
      },
    },
  };

  useEffect(() => {
    const maximumBgColor = theme === 'light' ? '#e5451c' :  '#0077FF';
    const minimumBgColor = theme === 'light' ? '#F29E38' :  '#37CAEC';
    setFormattedForecast({
      labels: forecast?.map((day) => day.date) || [],
      datasets: [
        {
          label: 'Minimum Temperature',
          data: forecast?.map((day) => day.minimumTemperature) || [],
          backgroundColor: [minimumBgColor],
          borderColor: minimumBgColor,
          tension: 0.5,
          borderWidth: 2,
        },
        {
          label: 'Maximum Temperature',
          data: forecast?.map((day) => day.maximumTemperature) || [],
          backgroundColor: [maximumBgColor],
          borderColor: maximumBgColor,
          tension: 0.5,
          borderWidth: 2,
        },
      ],
    });
  }, [forecast, theme]);
  return <Line data={formattedForecast} options={chartOptions}/>;
};
export default WeatherChart;
