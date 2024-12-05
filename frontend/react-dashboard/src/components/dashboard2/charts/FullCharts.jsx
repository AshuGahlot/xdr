import React, {useState, useEffect, useRef } from 'react';
import { Chart, registerables, } from 'chart.js';
import { Line, Bar }  from 'react-chartjs-2';
import axios from 'axios';
import Modal from '../SideSheet/Modal';
import menu from '../../../assets/images/menu.png'
import {useLocation} from 'react-router-dom'

// Register the required components
Chart.register(...registerables);


// CPU USAGE FULL PAGE CHART
const FullChartCpu = () => {
    const [cpuData, setCpuData] = useState([])
    const [timeStamp, setTimestamp] = useState([])
    // const [isModalOpen, setIsModalOpen] = useState(false)
    
    const location = useLocation();
    const {sys_info, type} = location.state || {};

    const {cpu_name, archs, boot_time, os, uptime, model} = sys_info?.System_Info || {};
    const {cpu_usage} = sys_info || {};

    useEffect(() => {
      console.log(sys_info);
      
         // Set initial data
    setCpuData((prev) => (Array.isArray(prev) ? prev : []));
    const interval = setInterval(() => {
      if (cpu_usage !== null) {
        setCpuData((prevData) =>
          Array.isArray(prevData)
            ? [...prevData.slice(-30), cpu_usage]
            : [cpu_usage] // Fallback if prevData is not an array
        );

        setTimestamp((prevTimes) =>
          Array.isArray(prevTimes)
            ? [...prevTimes.slice(-30), new Date().toLocaleTimeString()]
            : [new Date().toLocaleTimeString()]
        );
      }
    }, 1000);
      
      
          return () => clearInterval(interval)
    
    },[cpuData])
  
  
  
    const data = {
      labels: timeStamp,
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
      <div className={'w-full h-full 2xl:min-w-full pb-10'}>
        <h2 className="cardTitle ">CPU UTILIZATION </h2>
        <Line data={data} options={options} /> {/* Render the canvas element for the chart */}
        <div className='cardTitle pt-4 pb-8 px-8 leading-8'>
        <h2>Cpu Name : <span className='text-blue-600 dark:text-blue-300'>{cpu_name}</span></h2>
          <h2>Cpu Usage : <span className='text-blue-600 dark:text-blue-300'>{cpu_usage} %</span></h2>
          <h2>OS : <span className='text-blue-600 dark:text-blue-300'>{os}</span></h2>
          <h2>Architecture : <span className='text-blue-600 dark:text-blue-300'>{archs}</span></h2>
          <h2>System name : <span className='text-blue-600 dark:text-blue-300'>{model}</span></h2>
          <h2>Boot Time : <span className='text-blue-600 dark:text-blue-300'>{boot_time}</span></h2>
          <h2>Up Time : <span className='text-blue-600 dark:text-blue-300'>{uptime}</span></h2>
        </div>
      </div>
    );
  };
  
  export {FullChartCpu};






//   RAM USAGE FULL PAGE CHART 
const FullChartRam = () => {
    const [ramData, setRamData] = useState([])
    const [timeStamp, setTimestamp] = useState([])

    const location = useLocation();
    const {sys_info, type} = location.state || {};
    const { mem } = sys_info || {};

    useEffect(() => {
        if (!mem || mem.length < 4) {
          console.warn("Memory data (mem[3]) is not available");
          return;
        }
    
        const interval = setInterval(() => {
          const memValue = mem[2]; // Get mem[2] value directly
          console.log(memValue);
          
    
          setRamData((prevData) =>
            Array.isArray(prevData)
              ? [...prevData.slice(-30), memValue]
              : [memValue]
          );
    
          setTimestamp((prevTimes) =>
            Array.isArray(prevTimes)
              ? [...prevTimes.slice(-30), new Date().toLocaleTimeString()]
              : [new Date().toLocaleTimeString()]
          );
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup interval on unmount
      }, [mem]);

      // TO RENDER IN UI <H2> TAG 
      const latestRamUsage = ramData.length > 0 ? ramData[ramData.length - 1] : "N/A";
  
    const data = {
      labels: timeStamp,
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
      <div className={'w-full h-full 2xl:min-w-full pb-10'}>
        <h2 className="cardTitle ">RAM UTILIZATION </h2>
        <Line data={data} options={options} /> {/* Render the canvas element for the chart */}
        <div className='cardTitle pt-4 pb-8 px-8 leading-8'>
          <h2>Ram Usage : <span className='text-green-600 dark:text-green-400'>{latestRamUsage}%</span></h2>
        </div>
      </div>
    );
  };
  
  export {FullChartRam};





  // NETWORK USAGE FULL PAGE CHART 

  const FullChartNetwork = () => {
    const [networksent, setNetworksent] = useState([])
    const [networkrec, setNetworkrec] = useState([])
    const [timeStamp, setTimestamp] = useState([])
    const [sentMB, setSentMB] = useState(0); // State for sent bytes in MB
    const [recMB, setRecMB] = useState(0);  // State for received bytes in MB

    const location = useLocation();
    const {sys_info, type} = location.state || {};
    const {network} = sys_info || {};
  
    useEffect(() => {
      const netsent = network && network.length > 2 ? network[2] : 0
      const netrec = network && network.length > 3 ? network[3] : 0

      const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2); // Conversion function
  
      const interval = setInterval(() => {
              if (netsent !== null && netrec !== null) { // Only update if data is available
                 // Convert bytes to MB and update state
                setSentMB(bytesToMB(netsent));
                setRecMB(bytesToMB(netrec));
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
          // max: 200,
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
      <div className={'w-full h-full 2xl:min-w-full pb-10'}>
        <h2 className="cardTitle">NETWORK UTILIZATION</h2>
        <Line data={data} options={options} /> {/* Render the canvas element for the chart */}
        <div className='cardTitle pt-4 pb-8 px-8 leading-8'>
          <h2>Network Bytes Sent : <span className='text-blue-600 dark:text-blue-300'>{sentMB} MB</span></h2>
          <h2>Network Bytes Received : <span className='text-blue-600 dark:text-blue-300'>{recMB} MB</span></h2>
        </div>
      </div>
    );
  };
  
  export {FullChartNetwork};