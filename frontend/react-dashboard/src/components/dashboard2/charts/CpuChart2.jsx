import React, {useState, useEffect, useRef } from 'react';
import { Chart, registerables, } from 'chart.js';
import { Line, Bar }  from 'react-chartjs-2';
import axios from 'axios';
import Modal from '../SideSheet/Modal';

// Register the required components
Chart.register(...registerables);



const CpuChart = ({sys_info}) => {
  const {cpu_usage} = sys_info || {};
  const [cpuData, setCpuData] = useState([])
  const [timeStamp, setTimestamp] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cpuNum, setCpuNum] = useState(0)
  
  const {cpu_name} = sys_info.System_Info || {};
  // console.log(cpu_name)

  const handleModalView = () => {
    console.log('Modal view,', isModalOpen)
    setIsModalOpen(true)
    setCpuNum(cpu_usage)
  }
      
  useEffect(() => {
    // console.log(sys_info);
  const interval = setInterval(() => {
          if (cpu_usage !== null) {
            setCpuData((prevData) => [...prevData.slice(-40), cpu_usage]); 
            setTimestamp((prevTimes) => [...prevTimes.slice(-40), new Date().toLocaleTimeString(),
            ]);
          }
        }, 1000);
    
    
        return () => clearInterval(interval)
  
  },[cpuData])



  const data = {
    labels: timeStamp.fill(''),
    datasets: [
      {
        label: 'CPU USAGE',
        data: cpuData,
        fill: true, 
        backgroundColor: 'rgba(39, 144, 245, 0.3)',
        borderColor: 'rgba(39, 144, 245, 1)', 
        borderWidth: 2, // Line width
        tension: 0.4, // Smoothing effect
        pointRadius: 0, // Hide data points on the line
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Hide the legend like in the image
      },
      title: {
        display: false,
        // text: '', // Title similar to the image
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
          color: 'rgba(56, 56, 56, 0.3)'
        }
      },
      y: {
        beginAtZero: true, // Start from 8000
        max: 100,
        ticks: {
          font: {
            size: 12,
          },
          color: '#666', // Grey color for y-axis labels
        },
        grid: {
          color: 'rgba(56, 56, 56, 0.3)' // Light grey grid lines
        },
      },
    },
    maintainAspectRatio: false, // To maintain the aspect ratio similar to the image
  };

  return (
    <div className={'w-full h-full 2xl:min-w-full pb-4'}>
      <div className='text-end'>
      <button onClick={handleModalView} className="viewAllBtn px-[10px]">View</button>
      </div>
      <Line data={data} options={options} /> {/* Render the canvas element for the chart */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className='leading-8'>
          <h2>Cpu Name : </h2>
          <h2>Cpu Usage : {cpuNum} %</h2>
          <h2>OS : </h2>
          <h2>Architecture : </h2>
          <h2>System name : </h2>
          <h2>Boot Type : </h2>
          <h2>Up Time : </h2>
          </div>
        </Modal>
      )}
    </div>
  );
};

export {CpuChart};



const RamChart = ({sys_info}) => {
  const {mem} = sys_info || {};
  const [ramData, setRamdata] = useState([])
  const [timeStamp, setTimestamp] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ramNum, setRamNum] = useState(0)

  const handleModalView = () => {
    console.log('Modal view,', isModalOpen)
    setIsModalOpen(true)
    console.log(mem)
    // setCpunum(sys_info.mem[2])
    
  }


  useEffect(() => {
    const ram_usage = mem && mem.length > 2 ? mem[2] : 0;
    // console.log('useffect ', ram_usage);
    const interval = setInterval(() => {
      if (ram_usage !== null) {
        setRamdata((prevData) => [...prevData.slice(-40), ram_usage]); 
        setTimestamp((prevTimes) => [...prevTimes.slice(-40), new Date().toLocaleTimeString(),
        ]);
      }
    }, 1000);

    return () => clearInterval(interval)
    
  }, [ramData])


  const data = {
    labels: timeStamp.fill(''),
    datasets: [
      {
        label: 'RAM USAGE',
        data: ramData,
        fill: true, 
        backgroundColor: 'rgba(39, 144, 245, 0.3)',
        borderColor: 'rgba(39, 144, 245, 1)', 
        borderWidth: 2, // Line width
        tension: 0.4, // Smoothing effect
        pointRadius: 0, // Hide data points on the line
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Hide the legend like in the image
      },
      title: {
        display: false,
        // text: '', // Title similar to the image
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
          color: 'rgba(56, 56, 56, 0.3)'
        }
      },
      y: {
        beginAtZero: true, // Start from 8000
        max: 100,
        ticks: {
          font: {
            size: 12,
          },
          color: '#666', // Grey color for y-axis labels
        },
        grid: {
          color: 'rgba(56, 56, 56, 0.3)' // Light grey grid lines
        },
      },
    },
    maintainAspectRatio: false, // To maintain the aspect ratio similar to the image
  };

  return (
    <div className={'w-full h-full 2xl:min-w-full pb-4'}>
      <div className='text-end '>
      <button  onClick={handleModalView} className="viewAllBtn px-[10px]">View</button>
      </div>
      <Line data={data} options={options} /> {/* Render the canvas element for the chart */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Ram Usage : %</h2>
          <p>Here is the content of the modal.</p>
        </Modal>
      )}
    </div>
  );
};

export {RamChart};







// Storage Usage 
const StorageChart = () => {

  const data = {
    labels:  ['Total Storage', 'Used Storage'],
    datasets: [
      {
        label: 'STORAGE USAGE',
        // data: 
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Total Storage
          'rgba(255, 99, 132, 0.6)', // Used Storage
          'rgba(75, 192, 192, 0.6)'  // Free Storage (Available)
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)', // Total Storage
          'rgba(255, 99, 132, 1)', // Used Storage
          'rgba(75, 192, 192, 1)'  // Free Storage (Available)
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
    <>
          <Bar data={data} options={options} />
    </>
  )
};

export {StorageChart};



// Network Usage 
const NetworkChart = ({sys_info}) => {
  const {network} = sys_info || {};
  const [networksent, setNetworksent] = useState([])
  const [networkrec, setNetworkrec] = useState([])
  const [timeStamp, setTimestamp] = useState([])


  useEffect(() => {
    const netsent = network && network.length > 2 ? network[2] : 0
    const netrec = network && network.length > 3 ? network[3] : 0
    // console.log(netsent, netrec);

    const interval = setInterval(() => {
            if (netsent !== null && netrec !== null) { // Only update if data is available
              setNetworksent((prevData) => [...prevData.slice(-40), netsent]); 
              setNetworkrec((prevData) => [...prevData.slice(-40), netrec]);
              setTimestamp((prevTimes) => [...prevTimes.slice(-40), new Date().toLocaleTimeString(),
              ]);
            }
          }, 1000); 
      
          return () => clearInterval(interval);

  }, [networksent, networkrec]);


  const data = {
    labels: timeStamp.fill(' '),
    datasets: [
      {
        label: 'Bytes Sent',
        data: networksent,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.8,
      },
      {
        label: 'Bytes Received',
        data: networkrec,
        fill: true,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        tension: 0.3,
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#666',
        },
        grid: {
          color: 'rgba(56, 56, 56, 0.3)'
        }
      },
      y: {
        // max: 300000,
        beginAtZero: true,
        ticks: {
          color: '#666',
        },
        grid: {
          color: 'rgba(56, 56, 56, 0.3)'
        },
      },
    }
  };

  return (
    <div className={'w-full h-full 2xl:min-w-full pb-6'}>
      <div className='text-end'>
      <button className="viewAllBtn px-[10px]">View</button>
      </div>
      <Line data={data} options={options} /> {/* Render the canvas element for the chart */}
    </div>
  );
};

export {NetworkChart};









// const StorageBarChart = ({ sys_info }) => {
//   const {storage} = sys_info || {};
//   const [storageDrive, setStorageDrive] = useState([]);
//   // const usedStorage = totalStorage - availableStorage;


//   useEffect(() => {
    
//     if(storage && Array.isArray(storage)){
//       setStorageDrive(storage)
//     }
//     console.log('Bar chart storage useffect',sys_info);
    
// }, [storage]);

//   const data = {
//     labels: ['Storage'],
//     datasets: [
//       {
//         label: 'Used Storage',
//         data: [],
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//       },
//       {
//         label: 'Available Storage',
//         data: [],
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       x: { stacked: true },
//       y: { 
//         stacked: true,
//         beginAtZero: true,
//         // max: totalStorage, // Sets the y-axis max to the total storage value
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

// export {StorageBarChart};