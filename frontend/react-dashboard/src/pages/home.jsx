import React from 'react'
import walletData from "../jsonData/wallet-data.js";
import MarketTable from "../components/dashboard/MarketTable.jsx";
import {useEffect, useState} from "react";
import HistoryTable from "../components/dashboard/HistoryTable.jsx";
import CandleStickChart from "../components/dashboard/charts/CandleStickChart.jsx";
import PieDonutChart from "../components/dashboard/charts/PieDonutChart.jsx";
import BarChart from "../components/dashboard/charts/BarChart.jsx";
import { DoughnutChart } from "../components/dashboard/charts/DonutChart.jsx";
import { LineAreaChart } from "../components/dashboard/charts/LineAreaChart.jsx";
import { LineChart } from "../components/dashboard/charts/LineChart.jsx";
import UserData from "../components/dashboard/UserData.jsx";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import WorldMap from '../components/dashboard/Map.jsx';

const Home = () => {
     // State to track dimensions and order of sections
//   const [layout, setLayout] = useState([
//     { id: 'wallet', content: <UserData />, className: 'wallet-card' },
//     { id: 'candleStickChart', content: <CandleStickChart />, className: 'candlestick-card' },
//     { id: 'marketTable', content: <MarketTable />, className: 'market-table-card' },
//     { id: 'pieDonutChart', content: <PieDonutChart />, className: 'pie-donut-card' },
//     { id: 'historyTable', content: <HistoryTable />, className: 'history-table-card' },
//     { id: 'barChart', content: <BarChart />, className: 'bar-chart-card' },
//     { id: 'lineAreaChart', content: <LineAreaChart />, className: 'line-area-card' },
//     { id: 'lineChart', content: <LineChart />, className: 'line-chart-card' },
//     { id: 'doughnutChart', content: <DoughnutChart />, className: 'doughnut-chart-card' }
//   ]);

//   // Load layout from local storage when the component mounts
//   useEffect(() => {
//     const savedLayout = localStorage.getItem('dashboardLayout');
//     if (savedLayout) {
//       setLayout(JSON.parse(savedLayout));
//     }
//   }, []);

//   // Function to save layout to local storage
//   const saveLayoutToLocalStorage = (newLayout) => {
//     localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
//     console.log('Layout saved:', newLayout);
//   };

//   // Handle onDragEnd event for React Beautiful DnD
//   const onDragEnd = (result) => {
//     const { destination, source } = result;

//     if (!destination) return;
//     if (destination.index === source.index) return;

//     const reorderedLayout = Array.from(layout);
//     const [removed] = reorderedLayout.splice(source.index, 1);
//     reorderedLayout.splice(destination.index, 0, removed);
    
//     setLayout(reorderedLayout);
//     saveLayoutToLocalStorage(reorderedLayout);
//   };

  return (
    <div className={'w-full'}>
    {/*wallet Section*/}
    <div className={''}>
            <UserData data={walletData}/>
    </div>

    {/*Market section*/}
    <div className={'flex justify-between gap-x-[18px] 2xl:gap-x-[25px] mt-[18px] 2xl:mt-[25px]'}>
        <div className={'dashboardCard candlestick-card'}>
            <CandleStickChart/>
        </div>
        <div className={'dashboardCard market-table-card'}>
            <MarketTable/>
        </div>
    </div>
    <div className={'flex justify-between gap-x-[18px] 2xl:gap-x-[25px] mt-[18px] 2xl:mt-[25px]'}>
        <div className={'dashboardCard pie-donut-card'}>
            <PieDonutChart/>
        </div>
        <div className={'dashboardCard history-table-card'}>
            <HistoryTable/>
        </div>
        <div className={'dashboardCard w-full 2xl:min-w-[480px] md:w-[200] h-[226px] 2xl:h-[301px] 2xl:px-8 md:px-4  py-[18px] 2xl:py-0'}>
            <WorldMap/>
        </div>
    </div>
    <div className={'flex justify-between gap-x-[18px] 2xl:gap-x-[25px] mt-[18px] 2xl:mt-[25px]'}>
        <div className={'dashboardCard line-area-card'}>
            <LineAreaChart/>
        </div>
        <div className={'dashboardCard line-chart-card'}>
            <LineChart/>
        </div>
        <div className={'dashboardCard doughnut-chart-card'}>
            <DoughnutChart/>
        </div>
    </div>
</div>
);
};
export default Home;