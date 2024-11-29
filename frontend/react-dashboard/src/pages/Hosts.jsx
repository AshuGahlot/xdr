import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import UnderConstruction from "../components/common/UnderConstruction.jsx";
import UserData2 from "../components/dashboard2/UserData2.jsx";
import BarChart2 from "../components/dashboard2/charts/BarChart2.jsx";
// import HistoryTable from "../components/dashboard/HistoryTable.jsx";
import PieDonutChart from "../components/dashboard2/charts/PieDonutChart2.jsx";
import DonutChart2 from "../components/dashboard2/charts/DonutChart2.jsx";
import LineChart2 from "../components/dashboard2/charts/LineChart2.jsx";
import WorldMap from "../components/dashboard2/Map2.jsx";
import {CpuChart, RamChart, NetworkChart, BarStorageChart} from "../components/dashboard2/charts/CpuChart2.jsx";
import InstalledApps , { InstalledDrivers, BackgroundProcess, Logs, ConnectedIps, FireWallRules } from "../components/dashboard2/Tables/Table.jsx";
import MapComponent from '../components/dashboard2/Globe.jsx';

const Hosts = () => {
  const { ip, name } = useParams();
  const [data, setData] = useState({});
  // const [system_info, setSystem_info] = useState({});

  // const formattedName = name.replace(" ", "_");
  // const formattedIp = ip.replaceAll(".", "_");
  // 1st useeffect run and fetch interval WebSocket data apps, drivers, logs, username 
  useEffect(() => {
    // const socket = new WebSocket(`ws://192.168.68.200:8000/ws/user/${formattedName}/${formattedIp}/`);
    const socket = new WebSocket('ws://192.168.68.200:8000/ws/user/');

    socket.onopen = () => {
      console.log('Host socket connected', ip, name );
    }
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      // Ensure the data corresponds to the current client's IP
      if (data.ip_address === ip) {
        setData(data)
        // console.log(data);
      }
        
    }
    socket.onclose = () => {
      console.log("host socket closed");
      
    }
  },[ip, name])


  return (
    <div className={"w-full h-auto"}>
      <div className={"h-auto w-full mt-[30px] 2xl:mt-[30px]"}>
        <UserData2 sys_info={data}/>
      </div>

      {/* Charts start  */}
      <div className={"h-auto w-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-[18px] gap-y-[18px] 2xl:gap-x-[25px] mt-[30px] 2xl:mt-[30px]"}>
        <div className={"dashboardCard w-full h-[150px] sm:h-[200px]  lg:h-[250px]  2xl:h-[320px] 2xl:px-1 py-1 2xl:py-1 px-1 shadow-md"}>
          <CpuChart sys_info={data}/>
        </div>
        <div className={"dashboardCard w-full  h-[150px] sm:h-[200px] lg:min-h-[250px] 2xl:min-h-[320px] 2xl:px-1 py-1 2xl:py-1 px-1 shadow-md"}>
          <RamChart sys_info={data}/>
        </div>
        <div className={"dashboardCard w-full  h-[150px] sm:h-[200px] lg:min-h-[250px] 2xl:min-h-[320px] 2xl:px-1 py-1 2xl:py-1 px-1 shadow-md"}>
        <NetworkChart sys_info={data}/>
        </div>
        <div className={"dashboardCard w-full  h-[150px] sm:h-[200px] lg:min-h-[250px] 2xl:min-h-[320px] 2xl:px-1 py-1 2xl:py-1 px-1 shadow-md"}>
        <BarStorageChart sys_info={data}/>
        </div>
        {/* <div className={"dashboardCard text-center flex justify-center w-full h-[180px] sm:h-[200px] lg:min-h-[270px] 2xl:min-h-[270px] px-2 2xl:px-2 py-4 2xl:py-4 md:col-span-2 shadow-md"}>
        <PieDonutChart sys_info={data} /> 
        </div> */}
      </div>

      <div className={" h-auto w-auto sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-x-[18px] gap-y-[18px] 2xl:gap-x-[25px] mt-[18px] 2xl:mt-[30px]"}>
        <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[300px] lg:min-h-[400px] 2xl:h-[320px] px-[21px] 2xl:px-7 py-[15px] 2xl:py-5 shadow-md"}>
          <InstalledApps />
        </div>
        <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[300px] lg:min-h-[400px] 2xl:h-[320px] px-[21px] 2xl:px-7 py-[15px] 2xl:py-5 shadow-md"}>
          <InstalledDrivers />
        </div>
        <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[200px] lg:min-h-[400px] 2xl:h-[320px] px-[21px] 2xl:px-7 py-[15px] 2xl:py-5 shadow-md"}>
          <BackgroundProcess />
        </div>
        <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[200px] lg:min-h-[400px] 2xl:h-[320px] px-[21px] 2xl:px-7 py-[15px] 2xl:py-5 shadow-md"}>
          <Logs />
        </div>
        <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[200px] lg:min-h-[400px] 2xl:h-[320px] px-[21px] 2xl:px-7 py-[15px] 2xl:py-5 shadow-md"}>
          <ConnectedIps sys_info={data}/>
        </div>
        <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[200px] lg:min-h-[400px] 2xl:h-[320px] px-[21px] 2xl:px-7 py-[15px] 2xl:py-5 shadow-md"}>
          <FireWallRules />
        </div>
        </div>

        <div className={"h-auto w-auto sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-x-[18px] gap-y-[18px] 2xl:gap-x-[25px] mt-[18px] 2xl:mt-[25px]"}>
          {/* 1st piechart  */}
          {/* <div className={"dashboardCard text-center flex justify-center w-full h-[200px] sm:h-[200px] lg:min-h-[350px] 2xl:min-h-[360px] px-4 2xl:px-[10px] py-[40px] 2xl:py-[35px md:col-span-2"}>
            <PieDonutChart2 />
          </div> */}
          {/* 2nd piechart  */}
          {/* <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[200px] lg:min-h-[350px] 2xl:min-h-[360px] px-4 2xl:px-[10px] py-[40px] 2xl:py-[35px"}>
            <PieDonutChart2 />
          </div> */}
          {/* 3rd piechart  */}
          {/* <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[200px] lg:min-h-[350px] 2xl:min-h-[360px] px-4 2xl:px-[10px] py-[40px] 2xl:py-[35px"}>
            <PieDonutChart2 />
          </div> */}

          {/* <div className={"dashboardCard col-span-2 flex justify-center w-full h-[200px] sm:h-[200px] lg:min-h-[350px] 2xl:min-h-[360px] px-4 2xl:px-[10px] py-[40px] 2xl:py-[35px"}>
            <BarChart2 />
          </div> */}
        </div>
    </div>
  );
};
export default Hosts;
