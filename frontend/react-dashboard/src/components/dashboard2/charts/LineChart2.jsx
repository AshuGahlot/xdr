// Line Chart 
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement} from 'chart.js';


// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend,
  LineElement);

const LineChart2 = () => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Sales 2023',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderWidth: 2,
          tension: 0.4, // to smooth the line
        },
        {
          label: 'Sales 2024',
          data: [70, 50, 90, 60, 75, 85, 50],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderWidth: 2,
          tension: 0.4, // smooth the line
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Sales Performance (2023 vs 2024)',
        },
      },
      scales: {
        x:{
          grid: {
            color: '#2C2B2B'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#2C2B2B'
          }
        },
      },
    };
  
    return <Line data={data} options={options} />;
  };
  
  export default LineChart2;