import {BrowserRouter, Route, Routes, Navigate, useLocation} from "react-router-dom";
import * as route from './routes/Slugs'
import Home from "./pages/home.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
// import Markets from "./pages/transaction.jsx";
import Settings from "./pages/settings.jsx";
import Help from "./pages/help.jsx";
import NotFound from "./pages/not-found.jsx";
import Hosts from "./pages/hosts.jsx";
import BarChart from "./components/dashboard/charts/BarChart";
import HistoryTable from './components/dashboard/HistoryTable';
import AllClients from "./components/dashboard2/AllClients";
import Table from './components/dashboard2/Tables/Table.jsx';
import SpecificDataPage from "./components/dashboard2/Tables/SpecificDataPage";
import Accordian from "./components/dashboard2/SideSheet/Accordian";
import MapComponent from "./components/dashboard2/Globe.jsx";
import Register, { Login } from "./pages/Register";
import Dlp from "./components/DLP/Dlp";
import { FullChartCpu, FullChartNetwork, FullChartRam } from "./components/dashboard2/charts/FullCharts";
import { useAuth, AuthProvider } from "./pages/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute";
// import Details from "./pages/Details";



function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    )
}


function AppContent() {
    const { isLoggedIn } = useAuth(); // Access login status
    const location = useLocation(); // Get the current location object

     // If not logged in or on Register/Login pages, only show Register/Login routes
     if (!isLoggedIn || location.pathname === route.ROOT_PATH || location.pathname === route.LOGIN_PATH) {
        return (
            <Routes>
                <Route path={route.ROOT_PATH} element={<Register />} />
                <Route path={route.LOGIN_PATH} element={<Login />} />
                <Route path="*" element={<Navigate to={route.ROOT_PATH} />} />
            </Routes>
        );
    }
    const shouldRenderSidebar = location.pathname !== route.ROOT_PATH && location.pathname !== route.LOGIN_PATH;

    return (
        <div className={'flex justify-start font-inter'}>
            {shouldRenderSidebar && (
            <div className={'max-w-[231px] 2xl:max-w-[308px]'}>
                <ProtectedRoute>
                    <Sidebar />
                </ProtectedRoute>
            </div>
            )}
            <div className={'w-full'}>
                <ProtectedRoute>
                    <Navbar />
                </ProtectedRoute>
                <div className={'h-[calc(100vh-98px)] px-[33px] py-[28px] bg-lightSecondaryColor dark:bg-darkSecondaryColor overflow-y-auto'}>
                    <Routes>
                        <Route path="/" element={<Navigate to={route.ROOT_PATH} />} />
                        <Route path={route.DASHBOARD_PATH} element={<ProtectedRoute><Home /></ProtectedRoute>} />

                        <Route path={route.ALLCLIENTS_PATH} element={<ProtectedRoute><AllClients /></ProtectedRoute>} />

                        <Route path={route.HOSTS_PATH} element={<ProtectedRoute><Hosts /></ProtectedRoute>} />

                        <Route path={route.SPECIFIC_PAGE_PATH} element={<ProtectedRoute><SpecificDataPage /></ProtectedRoute>} />

                        <Route path={route.FIREWALLRULES_PATH} element={<ProtectedRoute><Accordian /></ProtectedRoute>} />

                        <Route path={route.GLOBE_PATH} element={<ProtectedRoute><MapComponent /></ProtectedRoute>} />

                        <Route path={route.CPU_CHART_PATH} element={<ProtectedRoute><FullChartCpu /></ProtectedRoute>} />

                        <Route path={route.RAM_CHART_PATH} element={<ProtectedRoute><FullChartRam /></ProtectedRoute>} />

                        <Route path={route.NETWORK_CHART_PATH} element={<ProtectedRoute><FullChartNetwork /></ProtectedRoute>} />

                        <Route path={route.DLP_PATH} element={<ProtectedRoute><Dlp /></ProtectedRoute>} />
                        

                        <Route path={route.LOGIN_PATH} element={<ProtectedRoute><Login /></ProtectedRoute>} />
                        

                        {/* <Route path={route.REGISTER_PATH} element={<ProtectedRoute><Register /></ProtectedRoute>} /> */}
                        <Route path={route.SETTINGS_PATH} element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                        <Route path={route.HELP_PATH} element={<Help />} />
                        {/* <Route path={route.AUTH_PATH} element={<Auth />} /> */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;


// function App() {
//     return (
//         <>
//             <BrowserRouter>
//                 <div className={'flex justify-start font-inter'}>
//                     <div className={' max-w-[231px] 2xl:max-w-[308px]'}>
//                         <Sidebar/>
//                     </div>
//                     <div className={'w-full'}>
//                         <Navbar/>
//                         <div className={'h-[calc(100vh-98px)] px-[33px] py-[28px] bg-lightSecondaryColor     dark:bg-darkSecondaryColor overflow-y-auto'}>
//                             <Routes>
//                             <Route path="/" element={<Navigate to={route.REGISTER_PATH} />} />
//                                 <Route path={route.DASHBOARD_PATH} element={<Home/>} />
//                                 <Route path={route.ALLCLIENTS_PATH} element={<AllClients/>} />
//                                 <Route path='clients/:name/:ip/' element={<Hosts />} />
//                                 <Route path='specific-data/' element={<SpecificDataPage />} />
//                                 <Route path='firewallrules/' element={<Accordian />} />
//                                 <Route path='globe/' element={<MapComponent />} />
//                                 <Route path='cpuchart/' element={<FullChartCpu />} />
//                                 <Route path='ramchart/' element={<FullChartRam />} />
//                                 <Route path='networkchart/' element={<FullChartNetwork />} />

//                                 {/* <Route path={route.HOSTS_PATH} element={<Hosts/>} /> */}
//                                 <Route path={route.REGISTER_PATH} element={<Register />} />
//                                 <Route path={route.LOGIN_PATH} element={<Login />} />
//                                 <Route path={route.DLP_PATH} element={<Dlp />} />
//                                 <Route path={route.SETTINGS_PATH} element={<Settings/>} />
//                                 <Route path={route.HELP_PATH} element={<Help/>} />
//                                 <Route path={route.AUTH_PATH} element={<Auth/>} />
//                                 <Route path={'*'} element={<NotFound/>} />
//                             </Routes>
//                         </div>
//                     </div>
//                 </div>
//             </BrowserRouter>
//         </>
//     )
// }

// export default App
