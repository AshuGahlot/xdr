import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as route from './routes/Slugs'
import Home from "./pages/home.jsx";
import Profile from "./pages/profile.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
import Markets from "./pages/transaction.jsx";
import Transaction from "./pages/hosts.jsx";
import Settings from "./pages/settings.jsx";
import Help from "./pages/help.jsx";
import Auth from "./pages/auth.jsx";
import NotFound from "./pages/not-found.jsx";
import Hosts from "./pages/hosts.jsx";
import BarChart from "./components/dashboard/charts/BarChart";
import HistoryTable from './components/dashboard/HistoryTable';
import AllClients from "./components/dashboard2/AllClients";



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
                                <Route path={route.ROOT_PATH} element={<Home/>} />
                                <Route path={route.ALLCLIENTS} element={<AllClients/>} />
                                <Route path={route.HOSTS_PATH} element={<Hosts/>} />
                                <Route path={route.TRANSACTION_PATH} element={<Transaction/>} />
                                <Route path={route.PROFILE_PATH} element={<Profile/>} />
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
