import {useEffect, useState} from "react";
import upArrow from "../../../assets/svgIcon/arrowUp.svg";
import downArrow from "../../../assets/svgIcon/arrowDown.svg";



const InstalledApps = ({data}) => {
    const {apps} = data || {}

    const [appsName, setAppsName] = useState([]);

     // Helper function to truncate app names
    const truncateAppName = (name) => {
    return name.length > 35 ? name.slice(0, 30) + ".." : name;
    };

    // console.log(data);

    useEffect(() => {
        if(apps){
                const appNames = Object.entries(apps).map(([appname, appversion]) => ({
                name: truncateAppName(appname),
                version : appversion.Version || 'N/A',
                }));
            setAppsName(appNames);
            }
    },[apps])
    

    return (
        <div className={'w-full flex flex-col h-full'}>
            <div className={'mb-[18px] flex justify-between items-center'}>
                <h2 className={'cardTitle'}>Installed Apps</h2>
                <button className={'viewAllBtn px-[10px] py-[2px]'}>View All</button>
            </div>
            {/* <div className={'mb-[14px] dark:text-white'}>
                <h3>Apps Name</h3>
            </div> */}
            <div className={'h-full overflow-y-scroll'}>
                <table className={'w-full'}>
                    <tbody>
                            <tr className={'tableRow'}>
                                <td className={'text-black dark:text-white font-medium'}>
                                    <ul>
                                        {appsName.map((app, index) => (
                                            <li key={index}>
                                              <ul className={'flex justify-between my-2'}>
                                                {app.name}<span className={'text-end inline-flex items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-blue-50 mr-2'}>V: {app.version}</span>
                                              </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export {InstalledApps};


const InstalledDrivers = ({data}) => {
    const {drivers} = data || []
    const [driversName, setDriversName] = useState([]);
    
    // console.log(drivers);
    
    useEffect(() => {
        if(Array.isArray(drivers)){
            setDriversName(drivers)
        }
    },[drivers])

    return (
        <div className={'w-full flex flex-col h-full'}>
            <div className={'mb-[18px] flex justify-between items-center'}>
                <h2 className={'cardTitle'}>Installed Drivers</h2>
                <button className={'viewAllBtn px-[10px] py-[2px]'}>View All</button>
            </div>
            {/* <div className={'mb-[14px] dark:text-white'}>
                <h3>Drivers Name</h3>
            </div> */}
            <div className={'h-full overflow-y-scroll'}>
                <table className={'w-full'}>
                    <tbody>
                            <tr className={'tableRow'}>
                                <td className={'text-black dark:text-white font-medium'}>
                                    <ul>
                                        {driversName.map((driver, index) => (
                                            Array.isArray(driver)&& driver.length > 0 ?(
                                            <li key={index}>
                                              <ul className={'flex justify-between my-2'}>
                                                {driver[0] || `${index + 1}`}<span className={'text-end inline-flex items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-blue-50 mr-2'}>V: {driver[1] || 'N/A'}</span>
                                              </ul>
                                            </li>
                                            ) : (<li key={index} className={'text-red-500'}>Driver data not avaliable</li>)
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default InstalledDrivers;





const BackgroundProcess = ({sys_info}) => {
    const {Process} = sys_info.system_info  || {}
    const [backgroundProcess, setBackgroundprocess] = useState([])

    useEffect(()=>{
        // console.log(sys_info);
            if(Array.isArray(Process)){
                setBackgroundprocess(Process)
            }
    },[Process])

    return (
        <div className={'w-full flex flex-col h-full'}>
            <div className={'mb-[18px] flex justify-between items-center'}>
                <h2 className={'cardTitle'}>Background Process</h2>
                <button className={'viewAllBtn px-[10px] py-[2px]'}>View All</button>
            </div>
            <div className={'h-full overflow-y-scroll'}>
                <table className={'w-full'}>
                <tbody>
                            <tr className={'tableRow'}>
                                <td className={'text-black dark:text-white font-medium'}>
                                    <ul>
                                    {backgroundProcess.map((pro, index) => (
                                            <li key={index}>
                                              <ul className={'flex justify-between my-2'}>
                                                {pro.name || `${index + 1}`}
                                                {pro.status == 'running'?
                                                <img src={upArrow} alt="" className={'ml-auto text-lightGreen dark:text-darkGreen bg-lightGreen1 dark:bg-darkGreen1'}/>
                                                 : <img src={downArrow} alt="" className={'ml-auto text-lightRed dark:text-darkRed bg-lightRed1 dark:bg-darkRed1'}></img>
                                                }
                                                <span className={'items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-blue-50 mx-2'}>V: {pro.pid || 'N/A'}</span>
                                              </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export {BackgroundProcess};











// Background Processed 
// const BackgroundProcess = () => {
//     const [Bpn, setBpn] = useState([])

//     useEffect(()=>{
//         const socket = new WebSocket('ws://localhost:8000/ws/asc/')
        
//         socket.onopen = () => {
//             console.log('bgp Are coming')
//         }
//         socket.onmessage = (event) => {
//             const sys_info = JSON.parse(event.data);
//             const process = sys_info.system_info.Process;
//             // console.log(process)

//             if(Array.isArray(process)){
//                 setBpn(process)
//             }
//         }

//         socket.onclose = () => {
//             console.log('bgp socket closed');
//         }

//         socket.onerror = (error) => {
//             console.error("bgp Socket error: " + error)
//         }

//         return () => socket.close()
//     },[Bpn])

//     return (
//         <div className={'w-full flex flex-col h-full'}>
//             <div className={'mb-[18px] flex justify-between items-center'}>
//                 <h2 className={'cardTitle'}>Background Process</h2>
//                 <button className={'viewAllBtn px-[10px] py-[2px]'}>View All</button>
//             </div>
//             <div className={'h-full overflow-y-scroll'}>
//                 <table className={'w-full'}>
//                 <tbody>
//                             <tr className={'tableRow'}>
//                                 <td className={'text-black dark:text-white font-medium'}>
//                                     <ul>
//                                     {Bpn.map((pro, index) => (
//                                             <li key={index}>
//                                               <ul className={'flex justify-between my-2'}>
//                                                 {pro.name || `${index + 1}`}
//                                                 {pro.status == 'running'?
//                                                 <img src={upArrow} alt="" className={'ml-auto text-lightGreen dark:text-darkGreen bg-lightGreen1 dark:bg-darkGreen1'}/>
//                                                  : <img src={downArrow} alt="" className={'ml-auto text-lightRed dark:text-darkRed bg-lightRed1 dark:bg-darkRed1'}></img>
//                                                 }
//                                                 <span className={'items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-blue-50 mx-2'}>V: {pro.pid || 'N/A'}</span>
//                                               </ul>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </td>
//                             </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }
// export {BackgroundProcess};