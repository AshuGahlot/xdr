// Line Area Chart 
import { Line }  from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';


// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend);


const LineAreaChart = () => {
    const data = {
      labels: ['16 Nov', '19 Nov', '22 Nov', '25 Nov', '28 Nov', 'Dec 17', '04 Dec', '07 Dec'],
      datasets: [
        {
          label: 'Price Movements',
          data: [1000, 4820, 2350, 7000, 2800, 4900, 4000, 8000],
          fill: true, // To create the area effect
          backgroundColor: 'rgba(51, 255, 255, 0.3)', // Background color for the area
          borderColor: '#33ffff', // Line color matching the image
          borderWidth: 3, // Line width
          tension: 0.3, // Smoothing effect
          pointRadius: 0, // Hide data points on the line
        }
      ]
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hide the legend like in the image
        },
        title: {
          display: true,
        //   text: , // Title similar to the image
          align: 'center', // Align the title to the left
          font: {
            size: 18,
          },
          color: '#ffff'
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
            },
            color: '#666', // Grey color for x-axis labels
          },
          grid: {
            color: '#302B2B'
          }
        },
        y: {
          beginAtZero: false, // Start from 8000
          ticks: {
            font: {
              size: 12,
            },
            color: '#666', // Grey color for y-axis labels
          },
          grid: {
            color: '#302B2B', // Light grey grid lines
          },
        },
      },
      maintainAspectRatio: false, // To maintain the aspect ratio similar to the image
    };
  
    return <Line data={data} options={options} />
  };
  
  export {LineAreaChart};