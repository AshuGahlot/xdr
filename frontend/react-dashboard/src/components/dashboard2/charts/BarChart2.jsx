
import { Bar }  from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart2 = () => {
  // Dummy data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40, 23, 65, 76, 54,45],
        backgroundColor: [
          // "rgba(75, 192, 192, 0.9)",
          // "rgba(255, 99, 132, 0.8)", // Red
          // "rgba(54, 162, 235, 0.8)", // Blue
          // "rgba(255, 206, 86, 0.8)", // Yellow
          'rgba(51, 129, 255, 0.9)',
          // 'rgba(36, 39, 255, 0.8)',


        ],

        borderColor: [
          // "rgba(75, 192, 192, 1)",
          // "rgba(255, 99, 132, 0.8)", // Red
          // "rgba(54, 162, 235, 0.8)", // Blue
          // "rgba(255, 206, 86, 0.8)", // Yellow
          'rgba(51, 255, 255, 1)',
          // 'rgba(36, 39, 255, 0.8)',
        ],
        borderWidth: 1,
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
        display: false,
        text: 'Monthly Sales Data',
      },
    },
  };

  return (
  <div className={'h-full w-full'}>
        <h2 className={'cardTitle'}>Bar Data</h2>
        <div className="chart-container h-[100px]">
            <Bar data={data} options={options}  type="bar"/>
        </div>
</div>
)
    //   <Bar data={data} options={options} />
};

export default BarChart2;
