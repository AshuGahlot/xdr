import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler} from 'chart.js';


// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend,
  PointElement,
  LineElement,
  Filler);


const DonutChart2 = () => {
    // Define the data for the doughnut chart
    const data = {
      labels: ["Red", "Blue", "Yellow",  ],
      datasets: [
        {
          label: "Votes",
          data: [12, 17, 10],
          backgroundColor: [
            "rgba(13, 71, 161, 0.8)", 
            "rgba(100, 181, 246, 0.8)", 
            "rgba(144, 202, 249, 0.8)", 
          ],
          borderColor: [
            "rgba(255, 255, 255, 1)", // Red
            "rgba(255, 255, 255, 1)", // Blue
            "rgba(255, 255, 255, 1)", // Yellow
          ],
          borderWidth: 2,
        },
      ],
    };
  
    // Define the options for the doughnut chart
    const options = {
      responsive: true,
      cutout: '60%',
      radius:'80%',
      plugins: {
        legend: {
          position: 'bottom', // Position of the legend
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
      // <div className={'w-full h-full flex justify-center'}>
            <Doughnut data={data} options={options} />
      // </div>
    );
  };
  
  export default DonutChart2;