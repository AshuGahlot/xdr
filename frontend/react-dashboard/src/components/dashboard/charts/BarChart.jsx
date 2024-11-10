
import { Bar }  from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  // Dummy data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
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
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };

  return (
  <div className={'flex flex-col h-full'}>
    {/* <div className={'2xl:mb-6 flex justify-between items-center'}> */}
        <h2 className={'cardTitle'}>Bar Data</h2>
        {/* <div className={'flex justify-between gap-x-2'}>
            <button className={'filterBtn'}>1H</button>
            <button className={'filterBtn'}>3H</button>
            <button className={'filterBtn'}>5H</button>
            <button className={'filterBtn'}>1D</button>
            <button className={'filterBtn'}>1W</button>
            <button className={'filterBtn'}>1M</button>
        </div> */}
    {/* </div> */}
    <div className={'h-full'}>
        <div className="chart-container" style={{ height: '200px' }}>
            <Bar data={data} options={options}  type="bar" />
        </div>
    </div>
</div>
)
    //   <Bar data={data} options={options} />
};

export default BarChart;
