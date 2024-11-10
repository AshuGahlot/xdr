import React,{useState, useEffect} from 'react'
import Chart from "react-apexcharts";
import useThemeMode from '../../../Hooks/useThemeMode'



const PieDonutChart = ({sys_info, data}) => {
    const {storage} = sys_info?.system_info || {};
    const [storageDrive, setStoragedrives] = useState([]);

    useEffect(() => {
        // console.log('pie useffect',storage);
        
        if(storage && Array.isArray(storage)){
            setStoragedrives(storage)
        }
    }, [storage]);
    
      return (
          <>        
          {storageDrive.map((drive, index) => {
        const series = [drive.used_gb, drive.total_size_gb];

        const options = {
            // labels: ["Used Storage", "Total Storage"],
            labels: [`Used Storage: ${drive.used_gb} GB`, `Total Storage: ${drive.total_size_gb} GB`, ],
            colors: ["#2F80ED", "#B1D3FF"],
            strokeWidth: [0, 0, 0, 0],
            dataLabels: {
                enabled: false
            },
            legend: {
                position: 'bottom',
                labels: {
                    colors:  '#778da9'
                },
                markers: {
                    width: 9,
                    height: 8,
                    radius: 0,
                    // strokeWidth: 0,
                    fillColors: ["#2F80ED", "#B1D3FF"], // Set legend item colors
                    offsetY: 0,
                },
            },
            responsive: [
                {
                    breakpoint: 2000,
                    options: {
                        chart: {
                            width: 280
                        },
                    }
                },
                {
                    breakpoint: 1800,
                    options: {
                        chart: {
                            width: 250
                        },
                    }
                },
                {
                    breakpoint: 1500,
                    options: {
                        chart: {
                            width: 250
                        },
                    }
                },
                {
                    breakpoint: 1300,
                    options: {
                        chart: {
                            width: 250
                        },
                    }
                },
                {
                    breakpoint: 1000,
                    options: {
                        chart: {
                            width: 180
                        },
                    }
                }
            ],
        };
      
    return (
        <div key={drive.device || index}>
            <div className={'h-auto w-full'}>
                <h2 className={'cardTitle'}>{`${drive.device} Drive`}</h2>
                {/* <button className={'viewAllBtn border-2 border-blue-500 px-[10px] py-3'}>
                </button> */}
            </div>
            <div className={'flex justify-center mt-4'}>
                <Chart
                    options={options}
                    series={series}
                    type="donut"
                />
            </div>
        </div>
    )
})}
      </>
      ) 
}
export default PieDonutChart;








// const PieDonutChart = () => {
//     const [drives, setDrives] = useState([]);

//     useEffect(() => {
//         const ws = new WebSocket('ws://localhost:8000/ws/asc/'); 
    
//         ws.onopen = () => {
//           console.log('Chart connection established');
//         };
    
//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             const sys = data.system_info
//             // console.log(sys);
        
//         if(sys?.storage && Array.isArray(sys.storage)){
//             setDrives(sys.storage)
//         }
//         };
    
//         ws.onclose = () => {
//           console.log('WebSocket connection closed');
//         };
    
//         // Clean up WebSocket connection on component unmount
//         return () => {
//           ws.close();
//         };
//     }, [drives]);
    
//       return (
//           <>        
//           {drives.map((drive, index) => {
//         const series = [drive.used_gb, drive.total_size_gb];

//         const options = {
//             // labels: ["Used Storage", "Total Storage"],
//             labels: [`Used Storage: ${drive.used_gb} GB`, `Total Storage: ${drive.total_size_gb} GB`, ],
//             colors: ["#2F80ED", "#B1D3FF"],
//             strokeWidth: [0, 0, 0, 0],
//             dataLabels: {
//                 enabled: false
//             },
//             legend: {
//                 position: 'bottom',
//                 labels: {
//                     colors:  '#778da9'
//                 },
//                 markers: {
//                     width: 9,
//                     height: 8,
//                     radius: 0,
//                     // strokeWidth: 0,
//                     fillColors: ["#2F80ED", "#B1D3FF"], // Set legend item colors
//                     offsetY: 0,
//                 },
//             },
//             responsive: [
//                 {
//                     breakpoint: 2000,
//                     options: {
//                         chart: {
//                             width: 280
//                         },
//                     }
//                 },
//                 {
//                     breakpoint: 1800,
//                     options: {
//                         chart: {
//                             width: 250
//                         },
//                     }
//                 },
//                 {
//                     breakpoint: 1500,
//                     options: {
//                         chart: {
//                             width: 250
//                         },
//                     }
//                 },
//                 {
//                     breakpoint: 1300,
//                     options: {
//                         chart: {
//                             width: 250
//                         },
//                     }
//                 },
//                 {
//                     breakpoint: 1000,
//                     options: {
//                         chart: {
//                             width: 180
//                         },
//                     }
//                 }
//             ],
//         };
      
//     return (
//         <div key={drive.device || index}>
//             <div className={'h-auto w-full'}>
//                 <h2 className={'cardTitle'}>{`${drive.device} Drive`}</h2>
//                 {/* <button className={'viewAllBtn border-2 border-blue-500 px-[10px] py-3'}>
//                 </button> */}
//             </div>
//             <div className={'flex justify-center mt-4'}>
//                 <Chart
//                     options={options}
//                     series={series}
//                     type="donut"
//                 />
//             </div>
//         </div>
//     )
// })}
//       </>
//       ) 
// }
// export default PieDonutChart;
