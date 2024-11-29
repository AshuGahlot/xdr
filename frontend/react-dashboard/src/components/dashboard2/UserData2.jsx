import React, {useState, useEffect} from 'react'
import usericon from "../../assets/images/usericon.svg";
import appicon from "../../assets/images/appicon.svg";
import huntingicon from "../../assets/images/huntingicon.svg";
import { useParams, Navigate, useNavigate } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const UserData2 = ({sys_info}) => {  
    const navigate = useNavigate()
    const {ip, name} = useParams()
  
    //   const [users, setUsers] = useState(0)
      const [userName, setUserName] = useState('');
      const [ipAddress, setIpAddress] = useState('');
      const [app, setApps] = useState(0);
      const [driver, setDrivers] = useState(0);
    //   redirecting to apps and drivers specific page and sending to that page 
      const [appList, setAppList] = useState([]);
      const [driverList, setDriverList] = useState([]);
      
      useEffect(() => {
        const fetchData = async () => {
            try {
                const responseapps = await fetch(`http://192.168.68.200:8000/api/apps/${ip}`)
                const apps = await responseapps.json()
                // console.log(apps);
                setAppList(apps);
                if(apps && typeof apps === 'object'){
                    const appkeys = Object.keys(apps);
                    setApps(appkeys.length);
                  } else {
                  //   console.log('Apps data is not an object or not found');
                    setApps(0)
                  };

                const responsedrivers = await fetch(`http://192.168.68.200:8000/api/drivers/${ip}`)
                const drivers = await responsedrivers.json()
                setDriverList(drivers);
                // console.log(drivers)
                if(drivers && typeof drivers === 'object'){
                    const driverKeys = Object.keys(drivers)
                    setDrivers(driverKeys.length)
                  } else {
                    setDrivers(0)
                  };

                //   console.log(sys_info);
                setIpAddress(ip)
                setUserName(name)

            } catch (error) {
                console.log('Error fetching client data:', error);
            }
        }
        fetchData()
      },[app, driver])

    //   redirecting app page to specific page with data 
      const handleViewAllApps = () => {
        navigate('/specific-data/', { state: { data: appList, type: 'apps', reset: true } });
      }

      //   redirecting driver page to specific page with data 
      const handleViewAllDrivers = () => {
        navigate('/specific-data/', { state: { data: driverList, type: 'drivers', reset: true } });
      }


    return (
            // <div className={''}>
                <div className={'h-auto w-auto cardTitle sm:grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 sm:gap-y-[18px] gap-x-[18px] gap-y-12 2xl:gap-x-[15px] 2xl:min-h-[150px] '}>
                <div className={'dashboardCard flex justify-start py-2 px-3 w-full sm:gap-y-8 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px] shadow-md '}>
                        {/* <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={usericon} alt="" className={" w-14 2xl:min-w-20"}/>
                        </div> */}
                        <div className={'col-span-3 text-left py-2 '}>
                            <div className={'flex w-full text-sm 2xl:text-lg'}>
                            <p className={'w-full pb-6 2xl:pb-4 '}>Username - <span className={'text-darkBlue2 2xl:text-xl'}>{userName}</span></p>
                            </div>
                            <p>IP Address - <span className={'text-darkBlue2 2xl:text-xl'}>{ipAddress}</span></p>
                            {/* <h1>{users}</h1> */}
                        </div>
                   </div>

                   <div  onClick={handleViewAllApps} className={'cursor-pointer dashboardCard userdataItems lg:grid lg:grid-cols-4 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px] shadow-md '}>
                        <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={appicon}  alt="" className={" w-14 2xl:min-w-14"}/>
                        </div>
                        <div className={'col-span-3 text-center py-3'}>
                            <h3 className={'w-full pb-8'}>Installed Apps</h3>
                            <h1 className={'text-2xl font-semibold text-darkBlue2'}>{app}</h1>
                        </div>
                   </div>

                   <div  onClick={handleViewAllDrivers} className={'cursor-pointer dashboardCard userdataItems lg:grid lg:grid-cols-4 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px] shadow-md '}>
                        <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={appicon} alt="" className={" w-14 2xl:min-w-14"}/>
                        </div>
                        <div className={'col-span-3 text-center py-3'}>
                            <h3 className={'w-full pb-8'}>Installed Drivers</h3>
                            <h1 className={'text-2xl font-semibold text-darkBlue2'}>{driver}</h1>
                        </div>
                   </div>

                   <div className={'dashboardCard userdataItems lg:grid lg:grid-cols-4 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px] shadow-md '}>
                        <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={huntingicon} alt="" className={" w-14 2xl:min-w-14"}/>
                        </div>
                        <div className={'col-span-3 text-center py-3'}>
                            <h3 className={'w-full pb-8'}>Total Hunting</h3>
                            <h1 className={'text-2xl font-semibold text-darkBlue2'}>00</h1>
                        </div>
                   </div>

                   <div className={'dashboardCard userdataItems lg:grid lg:grid-cols-4 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px] shadow-md'}>
                        <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={huntingicon} alt="" className={" w-14 2xl:min-w-14"}/>
                        </div>
                        <div className={'col-span-3 text-center py-3'}>
                            <h3 className={'w-full pb-8'}>Remedies Detections</h3>
                            <h1 className={'text-2xl font-semibold text-darkBlue2'}>00</h1>
                        </div>
                   </div>

                   <div className={'dashboardCard userdataItems lg:grid lg:grid-cols-4 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px] shadow-md '}>
                        <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={huntingicon} alt="" className={" w-14 2xl:min-w-14"}/>
                        </div>
                        <div className={'col-span-3 text-center py-3'}>
                            <h3 className={'w-full pb-8'}><span className={'text-red-500'}>XDR</span> Score</h3>
                            <h1 className={'text-2xl font-semibold text-darkBlue2'}>00</h1>
                        </div>
                   </div>
                </div>
            // </div>
    )
}
export default UserData2;













