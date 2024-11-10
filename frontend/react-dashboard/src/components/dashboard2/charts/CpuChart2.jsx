import React, {useState, useEffect, useRef } from 'react';
import { Chart, registerables, } from 'chart.js';
import { Line, Bar }  from 'react-chartjs-2';
import axios from 'axios';

// Register the required components
Chart.register(...registerables);



const CpuChart = ({sys_info}) => {
  const {cpu_usage} = sys_info?.system_info?.board || {};
  const [cpuData, setCpuData] = useState([])
  const [timeStamp, setTimestamp] = useState([])
      
  useEffect(() => {
    // console.log(cpuData);
  const interval = setInterval(() => {
          if (cpu_usage !== null) {
            setCpuData((prevData) => [...prevData.slice(-7), cpu_usage]); 
            setTimestamp((prevTimes) => [...prevTimes.slice(-7), new Date().toLocaleTimeString(),
            ]);
          }
        }, 3000);
    
    
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
        tension: 0.3, // Smoothing effect
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
          color: 'rgba(56, 56, 56, 0.3)'
        }
      },
      y: {
        beginAtZero: true, // Start from 8000
        // max: 10,
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
    <div className={'w-full h-full 2xl:min-w-full'}>
      <Line data={data} options={options} /> {/* Render the canvas element for the chart */}
    </div>
  );
};

export {CpuChart};



const RamChart = ({sys_info}) => {
  const {mem} = sys_info?.system_info?.board || {};
  const [ramData, setRamdata] = useState([])
  const [timeStamp, setTimestamp] = useState([])



  useEffect(() => {
    const ram_usage = mem && mem.length > 2 ? mem[2] : 0;
    // console.log('useffect ', ram_usage);
    const interval = setInterval(() => {
      if (ram_usage !== null) {
        setRamdata((prevData) => [...prevData.slice(-7), ram_usage]); 
        setTimestamp((prevTimes) => [...prevTimes.slice(-7), new Date().toLocaleTimeString(),
        ]);
      }
    }, 3000);

    return () => clearInterval(interval)
    
  }, [ramData])


  const data = {
    labels: timeStamp,
    datasets: [
      {
        label: 'RAM USAGE',
        data: ramData,
        fill: true, 
        backgroundColor: 'rgba(39, 144, 245, 0.3)',
        borderColor: 'rgba(39, 144, 245, 1)', 
        borderWidth: 2, // Line width
        tension: 0.3, // Smoothing effect
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
        display: true,
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

  return <Line data={data} options={options} />
};

export {RamChart};







// Storage Usage 
const StorageChart = () => {

  const data = {
    labels:  ['Total Storage', 'Used Storage', 'Available Storage'],
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
  const {network} = sys_info?.system_info || {};
  const [networksent, setNetworksent] = useState([])
  const [networkrec, setNetworkrec] = useState([])
  const [timeStamp, setTimestamp] = useState([])


  useEffect(() => {
    const netsent = network && network.length > 2 ? network[2] : 0
    const netrec = network && network.length > 3 ? network[3] : 0
    // console.log(netsent, netrec);

    const interval = setInterval(() => {
            if (netsent !== null && netrec !== null) { // Only update if data is available
              setNetworksent((prevData) => [...prevData.slice(-7), netsent]); 
              setNetworkrec((prevData) => [...prevData.slice(-7), netrec]);
              setTimestamp((prevTimes) => [...prevTimes.slice(-7), new Date().toLocaleTimeString(),
              ]);
            }
          }, 1000); 
      
          return () => clearInterval(interval);

  }, [networksent, networkrec]);


  const data = {
    labels: timeStamp,
    datasets: [
      {
        label: 'Bytes Sent',
        data: networksent,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.3,
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
    // <div>
      <Line data={data} options={options} />
    // </div>
  );
};

export {NetworkChart};

