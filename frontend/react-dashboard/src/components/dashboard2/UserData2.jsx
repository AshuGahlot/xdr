import React, {useState, useEffect} from 'react'
import usericon from "../../assets/images/usericon.svg";
import appicon from "../../assets/images/appicon.svg";
import huntingicon from "../../assets/images/huntingicon.svg";


const UserData2 = ({data, sys_info}) => {  
    const {user, apps, drivers} = data || {}
    const {ip_address, hostname} = sys_info.system_info || {};
  
      const [users, setUsers] = useState(0)
      const [userName, setUserName] = useState('')
      const [ipAddress, setIpAddress] = useState('')
      const [app, setApps] = useState(0);
      const [driver, setDrivers] = useState(0);
      
      
      useEffect(() => {
        // getting username from data and setting it to userName variable
        // const username = user?.[0]?.[0];
        setUserName(hostname);
        
        // count user and set it to users 
        if(Array.isArray(user)){
            setUsers(user.length)
        };
        // Getting Ip address from sys_info and setting it to ip address variable 

        setIpAddress(ip_address);
  
        // Check if apps array exists, then set the count 
        if(apps && typeof apps === 'object'){
          const appkeys = Object.keys(apps);
          setApps(appkeys.length);
        } else {
        //   console.log('Apps data is not an object or not found');
          setApps(0)
        };
  
        // Drivers Count 
        if(drivers && typeof drivers === 'object'){
          const driverKeys = Object.keys(drivers)
          setDrivers(driverKeys.length)
        } else {
          setDrivers(0)
        };
  
      },[user,ip_address, hostname, apps, drivers])
   

    return (
            // <div className={''}>
                <div className={'h-auto w-auto cardTitle sm:grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 sm:gap-y-[18px] gap-x-[18px] gap-y-12 2xl:gap-x-[15px] 2xl:min-h-[150px] '}>
                <div className={'dashboardCard flex justify-start py-2 px-3 w-full sm:gap-y-8 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px]'}>
                        {/* <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={usericon} alt="" className={" w-14 2xl:min-w-20"}/>
                        </div> */}
                        <div className={'col-span-3 text-left py-2'}>
                            <div className={'flex w-full text-sm 2xl:text-lg'}>
                            <p className={'w-full pb-6 2xl:pb-3 '}>Username - <span className={'text-darkBlue2 2xl:text-2xl'}>{userName}</span></p>
                            </div>
                            <p>IP Address - <span className={'text-darkBlue2 2xl:text-2xl'}>{ipAddress}</span></p>
                            {/* <h1>{users}</h1> */}
                        </div>
                   </div>

                   <div className={'dashboardCard userdataItems lg:grid lg:grid-cols-4 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px]'}>
                        <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={appicon} alt="" className={" w-14 2xl:min-w-20"}/>
                        </div>
                        <div className={'col-span-3 text-center py-3'}>
                            <h3 className={'w-full pb-8'}>Installed Apps</h3>
                            <h1 className={'text-2xl font-semibold text-darkBlue2'}>{app}</h1>
                        </div>
                   </div>

                   <div className={'dashboardCard userdataItems lg:grid lg:grid-cols-4 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px]'}>
                        <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={appicon} alt="" className={" w-14 2xl:min-w-20"}/>
                        </div>
                        <div className={'col-span-3 text-center py-3'}>
                            <h3 className={'w-full pb-8'}>Installed Drivers</h3>
                            <h1 className={'text-2xl font-semibold text-darkBlue2'}>{driver}</h1>
                        </div>
                   </div>

                   <div className={'dashboardCard userdataItems lg:grid lg:grid-cols-4 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px]'}>
                        <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={huntingicon} alt="" className={" w-14 2xl:min-w-20"}/>
                        </div>
                        <div className={'col-span-3 text-center py-3'}>
                            <h3 className={'w-full pb-8'}>Total Hunting</h3>
                            <h1 className={'text-2xl font-semibold text-darkBlue2'}>00</h1>
                        </div>
                   </div>

                   <div className={'dashboardCard userdataItems lg:grid lg:grid-cols-4 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px]'}>
                        <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={huntingicon} alt="" className={" w-14 2xl:min-w-20"}/>
                        </div>
                        <div className={'col-span-3 text-center py-3'}>
                            <h3 className={'w-full pb-8'}>Remedies Detections</h3>
                            <h1 className={'text-2xl font-semibold text-darkBlue2'}>00</h1>
                        </div>
                   </div>

                   <div className={'dashboardCard userdataItems lg:grid lg:grid-cols-4 lg:w-full 2xl:min-w-[200px] h-32 2xl:min-h-[150px]'}>
                        <div className={'w-auto h-auto col-span-1 2xl:min-w-10 py-2 px-2'}>
                            <img src={huntingicon} alt="" className={" w-14 2xl:min-w-20"}/>
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

