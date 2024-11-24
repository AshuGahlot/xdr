import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import * as route from './routes/Slugs'
import Home from "./pages/home.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
// import Markets from "./pages/transaction.jsx";
import Settings from "./pages/settings.jsx";
import Help from "./pages/help.jsx";
import Auth from "./pages/auth.jsx";
import NotFound from "./pages/not-found.jsx";
import Hosts from "./pages/hosts.jsx";
import BarChart from "./components/dashboard/charts/BarChart";
import HistoryTable from './components/dashboard/HistoryTable';
import AllClients from "./components/dashboard2/AllClients";
import Table from './components/dashboard2/Tables/Table.jsx';
import SpecificDataPage from "./components/dashboard2/Tables/SpecificDataPage";
import Accordian from "./components/dashboard2/SideSheet/Accordian";
import MapComponent from "./components/dashboard2/Globe.jsx";
import Register from "./pages/Register";
import Dlp from "./components/DLP/Dlp";

// import Details from "./pages/Details";


function App() {
    return (
        <>
            <BrowserRouter>
                <div className={'flex justify-start font-inter'}>
                    <div className={' max-w-[231px] 2xl:max-w-[308px]'}>
                        <Sidebar/>
                    </div>
                    <div className={'w-full'}>
                        <Navbar/>
                        <div className={'h-[calc(100vh-98px)] px-[33px] py-[28px] bg-lightSecondaryColor dark:bg-darkSecondaryColor overflow-y-auto'}>
                            <Routes>
                            <Route path="/" element={<Navigate to={route.REGISTER_PATH} />} />
                                <Route path={route.DASHBOARD_PATH} element={<Home/>} />
                                <Route path={route.ALLCLIENTS_PATH} element={<AllClients/>} />
                                <Route path='clients/:name/:ip/' element={<Hosts />} />
                                <Route path='specific-data/' element={<SpecificDataPage />} />
                                <Route path='firewallrules/' element={<Accordian />} />
                                <Route path='globe/' element={<MapComponent />} />
                                {/* <Route path={route.HOSTS_PATH} element={<Hosts/>} /> */}
                                <Route path={route.REGISTER_PATH} element={<Register />} />
                                <Route path={route.DLP_PATH} element={<Dlp />} />
                                <Route path={route.SETTINGS_PATH} element={<Settings/>} />
                                <Route path={route.HELP_PATH} element={<Help/>} />
                                <Route path={route.AUTH_PATH} element={<Auth/>} />
                                <Route path={'*'} element={<NotFound/>} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App
