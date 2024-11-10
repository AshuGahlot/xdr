import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler} from 'chart.js';


// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend,
  PointElement,
  LineElement,
  Filler);


const DoughnutChart = () => {
    // Define the data for the doughnut chart
    const data = {
      labels: ["Red", "Blue", "Yellow",  ],
      datasets: [
        {
          label: "Votes",
          data: [12, 17, 10],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)", // Red
            "rgba(54, 162, 235, 0.8)", // Blue
            "rgba(255, 206, 86, 0.8)", // Yellow
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)", // Red
            "rgba(54, 162, 235, 1)", // Blue
            "rgba(255, 206, 86, 1)", // Yellow
          ],
          borderWidth: 1,
        },
      ],
    };
  
    // Define the options for the doughnut chart
    const options = {
      responsive: true,
      cutout: '60%',
      radius:'70%',
      plugins: {
        legend: {
          position: 'top', // Position of the legend
        },
        tooltip: {
          enabled: true, // Enable tooltips
        },
        title: {
          display: true,
          text: 'Doughnut Data 1'
        }
      },
    };
  
    return (
      <div className={'w-full flex justify-center'}>
            <Doughnut data={data} options={options} />
      </div>
    );
  };
  
  export {DoughnutChart};