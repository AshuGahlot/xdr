import React, {useState, useEffect} from 'react'
import UnderConstruction from "../components/common/UnderConstruction.jsx";
import UserData2 from "../components/dashboard2/UserData2.jsx";
import BarChart2 from "../components/dashboard2/charts/BarChart2.jsx";
// import HistoryTable from "../components/dashboard/HistoryTable.jsx";
import PieDonutChart from "../components/dashboard2/charts/PieDonutChart2.jsx";
import DonutChart2 from "../components/dashboard2/charts/DonutChart2.jsx";
import LineChart2 from "../components/dashboard2/charts/LineChart2.jsx";
import WorldMap from "../components/dashboard2/Map2.jsx";
import {CpuChart, RamChart, StorageChart, NetworkChart} from "../components/dashboard2/charts/CpuChart2.jsx";
import InstalledDrivers, { InstalledApps, BackgroundProcess } from "../components/dashboard2/Tables/Tables.jsx";
import ActiveUsers from "../components/dashboard2/ActiveUsers.jsx";

const Hosts = () => {
  const [data, setData] = useState({});
  const [system_info, setSystem_info] = useState({});

  // 1st useeffect run and fetch interval WebSocket data apps, drivers, logs, username 
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/interval/')

    socket.onopen = () => {
      console.log('Host socket connected');
    }
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      // console.log(data);
      setData(data)
    }
    socket.onclose = () => {
      console.log("host socket closed");
      
    }
  },[])

  // 2nd useEffect run and fetch data from websocket2 data ipaddress, cpu usage, ram usage, storage, network 
  useEffect(() => {
    const socket2 = new WebSocket('ws://localhost:8000/ws/asc/')

    socket2.onopen = () => {
      console.log("Host socket 2 Connected");
    }

    socket2.onmessage = (event) => {
      const sys_info = JSON.parse(event.data)
      // console.log(sys_info);
      setSystem_info(sys_info)
      
    }

    socket2.onclose = () => {
      console.log("host socket 2 Closed");
      
    }
  },[])

  return (
    <div className={"w-full h-auto"}>
       <ActiveUsers />

      <div className={"h-auto w-full mt-[30px] 2xl:mt-[30px]"}>
        <UserData2 data={data} sys_info={system_info}/>
      </div>

      {/* Charts start  */}
      <div className={"h-auto w-auto sm:grid sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-x-[18px] gap-y-[18px] 2xl:gap-x-[25px] mt-[30px] 2xl:mt-[30px]"}>
        <div className={"dashboardCard w-full h-[150px] sm:h-[200px]  lg:h-[250px]  2xl:h-[270px] 2xl:px-1 py-1 2xl:py-1 px-1 "}>
          <CpuChart sys_info={system_info}/>
        </div>
        <div className={"dashboardCard w-full  h-[150px] sm:h-[200px] lg:min-h-[250px] 2xl:min-h-[270px] 2xl:px-1 py-1 2xl:py-1 px-1 "}>
          <RamChart sys_info={system_info}/>
        </div>
        <div className={"dashboardCard w-full  h-[150px] sm:h-[200px] lg:min-h-[250px] 2xl:min-h-[270px] 2xl:px-1 py-1 2xl:py-1 px-1 "}>
        <NetworkChart sys_info={system_info}/>
        </div>
        <div className={"dashboardCard text-center flex justify-center w-full h-[180px] sm:h-[200px] lg:min-h-[270px] 2xl:min-h-[270px] px-2 2xl:px-2 py-4 2xl:py-4 md:col-span-2"}>
        <PieDonutChart sys_info={system_info} /> 
        </div>
        <div className={"dashboardCard w-full  h-[150px] sm:h-[200px] lg:min-h-[250px] 2xl:min-h-[270px] 2xl:px-8 py-2 2xl:py-6 px-2"}>
        <StorageChart />
        </div>
      </div>

      <div className={" h-auto w-auto sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-x-[18px] gap-y-[18px] 2xl:gap-x-[25px] mt-[18px] 2xl:mt-[30px]"}>
        <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[300px] lg:min-h-[400px] 2xl:h-[320px] px-[21px] 2xl:px-7 py-[15px] 2xl:py-5"}>
          <InstalledApps data={data}/>
        </div>
        <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[300px] lg:min-h-[400px] 2xl:h-[320px] px-[21px] 2xl:px-7 py-[15px] 2xl:py-5"}>
          <InstalledDrivers data={data}/>
        </div>
        <div className={"dashboardCard flex justify-center w-full h-[200px] sm:h-[200px] lg:min-h-[400px] 2xl:h-[320px] px-[21px] 2xl:px-7 py-[15px] 2xl:py-5"}>
          <BackgroundProcess sys_info={system_info}/>
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
