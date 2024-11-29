import React, {useState, useEffect, useRef } from 'react';
import { Chart, registerables, } from 'chart.js';
import { Line, Bar }  from 'react-chartjs-2';
import axios from 'axios';
import Modal from '../SideSheet/Modal';
import menu from '../../../assets/images/menu.png'


// Register the required components
Chart.register(...registerables);


// Cpu Usage 
const CpuChart = ({sys_info}) => {
  const {cpu_usage} = sys_info || {};
  const [cpuData, setCpuData] = useState([])
  const [timeStamp, setTimestamp] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const {cpu_name, archs, boot_time, os, uptime, model} = sys_info.System_Info || {};
  // console.log(sys_info)

  const handleModalView = () => {
    setIsModalOpen(true)
  }
      
  useEffect(() => {
    // console.log(sys_info);
  const interval = setInterval(() => {
          if (cpu_usage !== null) {
            setCpuData((prevData) => [...prevData.slice(-30), cpu_usage]); 
            setTimestamp((prevTimes) => [...prevTimes.slice(-30), new Date().toLocaleTimeString(),
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
      <div className='flex justify-between pt-2 px-2'>
      <h2 className="cardTitle ">CPU UTILIZATION </h2>
      <button onClick={handleModalView}><img src={menu} alt="" /></button>
      {/* <button onClick={handleModalView} className="px-[10px]">View</button> */}
      </div>
      <Line data={data} options={options} /> {/* Render the canvas element for the chart */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className='leading-8'>
            <h1 className='border-b-2'>CPU DETAILS</h1>
          <h2 className='pt-4'>Cpu Name : <span className='text-green-600 dark:text-green-400'>{cpu_name}</span></h2>
          <h2>Cpu Usage : <span className='text-green-600 dark:text-green-400'>{cpu_usage} %</span></h2>
          <h2>OS : <span className='text-green-600 dark:text-green-400'>{os}</span></h2>
          <h2>Architecture : <span className='text-green-600 dark:text-green-400'>{archs}</span></h2>
          <h2>System name : <span className='text-green-600 dark:text-green-400'>{model}</span></h2>
          <h2>Boot Time : <span className='text-green-600 dark:text-green-400'>{boot_time}</span></h2>
          <h2>Up Time : <span className='text-green-600 dark:text-green-400'>{uptime}</span></h2>
          </div>
        </Modal>
      )}
    </div>
  );
};

export {CpuChart};







// Ram Usage 
const RamChart = ({sys_info}) => {
  const {mem} = sys_info || {};
  const [ramData, setRamdata] = useState([])
  const [timeStamp, setTimestamp] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState([]);

  const handleModalView = () => {
    setIsModalOpen(true)
    console.log(sys_info);
    const memInGB = mem.map((value, index) => 
      index === 2 ? value : (value / (1024 ** 3)).toFixed(2)
    );
     setModalData(memInGB)
       console.log(memInGB)
    // setCpunum(sys_info.mem[2])
    
  }


  useEffect(() => {
    const ram_usage = mem && mem.length > 2 ? mem[2] : 0;
    // console.log('useffect ', ram_usage);
    const interval = setInterval(() => {
      if (ram_usage !== null) {
        setRamdata((prevData) => [...prevData.slice(-30), ram_usage]); 
        setTimestamp((prevTimes) => [...prevTimes.slice(-30), new Date().toLocaleTimeString(),
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
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192, 1)', 
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
     <div className='flex justify-between pt-2 px-2'>
     <h2 className="cardTitle">RAM UTILIZATION </h2>
      <button  onClick={handleModalView}><img src={menu} alt="" /></button>
      </div>
      <Line data={data} options={options} /> {/* Render the canvas element for the chart */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
           <div className='leading-8'>
            <h1 className='border-b-2'>RAM DETAILS</h1>
          <h2 className='pt-4'>Total Memory : <span className='text-green-600 dark:text-green-400'>{modalData[0]} GB</span></h2>
          <h2>Used Ram : <span className='text-green-600 dark:text-green-400'>{modalData[1]} GB</span></h2>
          <h2>Ram Usage : <span className='text-green-600 dark:text-green-400'>{modalData[2]} %</span></h2>
          <h2>Available Ram : <span className='text-green-600 dark:text-green-400'>{modalData[3]} GB</span></h2>
          <h2>Cached Ram : <span className='text-green-600 dark:text-green-400'>{modalData[4]} GB</span></h2>
          </div>
        </Modal>
      )}
    </div>
  );
};

export {RamChart};





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
              setNetworksent((prevData) => [...prevData.slice(-30), netsent]); 
              setNetworkrec((prevData) => [...prevData.slice(-30), netrec]);
              setTimestamp((prevTimes) => [...prevTimes.slice(-30), new Date().toLocaleTimeString(),
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
        borderWidth: 2, // Line width
        tension: 0.8,
        pointRadius: 0,
      },
      {
        label: 'Bytes Received',
        data: networkrec,
        fill: true,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 2, // Line width
        tension: 0.3,
        pointRadius: 0,
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
      <div className='flex justify-between pt-2 px-2'>
      <h2 className="cardTitle ">NETWORK USAGE </h2>
      <button><img src={menu} alt="" /></button>
      </div>
      <Line data={data} options={options} /> {/* Render the canvas element for the chart */}
    </div>
  );
};

export {NetworkChart};




// Storage Drives 
const BarStorageChart = ({ sys_info }) => {
  const { storage } = sys_info || {};
  const [storageDrive, setStoragedrives] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalView = () => {
    setIsModalOpen(true)
    console.log(sys_info);
    
  }

  useEffect(() => {
    if (storage && Array.isArray(storage)) {
      setStoragedrives(storage);
    }
  }, [storage]);

  // Prepare data for Chart.js Stacked Bar Chart
  const formatDataForChart = () => {
    const labels = [];
    const usedData = [];
    const totalData = [];

    storageDrive.forEach(drive => {
      labels.push(drive.device);  // Device names as labels
      usedData.push(drive.used_gb);  // Used storage for the bar chart
      totalData.push(drive.total_size_gb);  // Total storage for the bar chart
    });

    return {
      labels: labels,
      datasets: [
        {
          label: 'Used Storage (GB)',
          data: usedData,
          backgroundColor: '#2F80ED',  // Blue color for used storage
          borderColor: '#2F80ED',
          borderWidth: 1,
          stack: 'stack1',
        },
        {
          label: 'Total Storage (GB)',
          data: totalData,
          backgroundColor: '#B1D3FF',  // Light blue color for total storage
          borderColor: '#B1D3FF',
          borderWidth: 1,
          stack: 'stack1',
        },
      ],
    };
  };

  const chartData = formatDataForChart();

  const chartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true,  // Enable stacking on the X-axis
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          stacked: true,  // Enable stacking on the Y-axis
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      position: 'top',
    },
  };

  return (
    <>
    <div className="storage-bar-chart">
      <div className='flex justify-between pt-2 px-2'>
      <h2 className="cardTitle ">STORAGE DRIVES </h2>
      <button onClick={handleModalView}><img src={menu} alt="" /></button>
      </div>
      <div className="flex justify-center mt-4">
        <Bar data={chartData} options={chartOptions} />
      {isModalOpen && (
      <Modal onClose={() => setIsModalOpen(false)}>
        <div className="leading-8">
          <h1 className="border-b-2">STORAGE DETAILS</h1>
          <div className='grid grid-cols-2'>
          {storageDrive.map((drive, index) => (
            <div key={index} className="mt-2">
              <h2 className="pt-4"><strong>Drive:</strong> {drive.device}</h2>
              <h2>Total Storage: <span className="text-green-600 dark:text-green-400">{drive.total_size_gb} GB</span></h2>
              <h2>Used Storage: <span className="text-green-600 dark:text-green-400">{drive.used_gb} GB</span></h2>
            </div>
          ))}
          </div>
        </div>
      </Modal>
    )}
      </div>
    </div>
  </>
  );
};

export {BarStorageChart};