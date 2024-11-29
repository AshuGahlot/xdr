// for testing 
import {useEffect, useState, useMemo} from "react";
import upArrow from "../../../assets/svgIcon/arrowUp.svg";
import downArrow from "../../../assets/svgIcon/arrowDown.svg";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import menu from '../../../assets/images/menu.png'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


// TABLE TO DISPLAY INSTALLED APPS
const InstalledApps = () => {
    const navigate = useNavigate();
    const { ip } = useParams();
    const [appsData, setAppsData] = useState(null);
    const [rawData, setRawData] = useState(null);
    const [error, setError] = useState(null);

    const handleViewAllApps = () => {
        navigate('/specific-data/', { state: { data: rawData, type: 'apps', reset: true } });
    };

    const truncateAppName = (name) => (name.length > 35 ? `${name.slice(0, 30)}...` : name);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch(`http://192.168.68.200:8000/api/apps/${ip}`);
                if (!response.ok) throw new Error(`Error fetching client data: ${response.status}`);

                const data = await response.json();
                setRawData(data);

                const truncatedData = data.map((app) => ({
                    ...app,
                    app_name: truncateAppName(app.app_name),
                }));
                setAppsData(truncatedData);
            } catch (err) {
                setError('Failed to fetch client details');
                console.error('Error fetching client data:', err);
            }
        };

        fetchClientData();
    }, [ip]);

    if (error) return <p>{error}</p>;
    if (!appsData) {
        return (
          <div className={'w-full flex flex-col h-full'}>
            <Skeleton count={0.4} baseColor={'#d9d9d9'}/>
            <Skeleton height={30} count={8} baseColor={'#d9d9d9'} enableAnimation={true} duration={1.3} direction={'ltr'} className="mb-2" />
          </div>
        );
    }

    return (
        <div className="w-full flex flex-col h-full">
            <div className="mb-[18px] flex justify-between items-center">
                <h2 className="font-bold  dark:text-[#eee2df] text-[#161a1d]">Installed Apps</h2>
                <button className="py-[2px]" onClick={handleViewAllApps}><img src={menu} alt="" /></button>
            </div>
            <div className="h-full overflow-y-scroll scroll-smooth">
                <table className="w-full">
                    <tbody>
                        <tr className="tableRow">
                            <td className="text-black dark:text-white font-medium">
                                <ul>
                                    {appsData ? (
                                        appsData.map((app, index) => (
                                            <li key={index} className="flex justify-between my-2 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 pl-1 rounded-md">
                                                {app.app_name} <span className="badgee">V : {app.ver}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No apps data found for this client.</p>
                                    )}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstalledApps;






// TABLE TO DISPLAY INSTALLED DRIVERS
const InstalledDrivers = () => {
    const navigate = useNavigate();
    const { ip } = useParams();
    const [driversData, setDriversData] = useState([]);
    const [error, setError] = useState(null);

    const handleViewAllDrivers = () => {
        navigate('/specific-data/', { state: { data: driversData, type: 'drivers' } });
    };

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch(`http://192.168.68.200:8000/api/drivers/${ip}`);
                if (!response.ok) throw new Error(`Error fetching client data: ${response.status}`);
                
                const data = await response.json();
                setDriversData(data);
            } catch (err) {
                setError('Failed to fetch client details');
                console.error('Error fetching client data:', err);
            }
        };

        fetchClientData();
    }, [ip]);

    if (error) return <p>{error}</p>;
    if (!driversData.length) {
        return (
          <div className={'w-full flex flex-col h-full'}>
            <Skeleton count={0.4} baseColor={'#d9d9d9'}/>
            <Skeleton height={30} count={8} baseColor={'#d9d9d9'} enableAnimation={true} duration={1.3} direction={'ltr'} className="mb-2" />
          </div>
        );
    }

    return (
        <div className="w-full flex flex-col h-full">
            <div className="mb-[18px] flex justify-between items-center">
                <h2 className="font-bold dark:text-[#eee2df] text-[#161a1d]">Installed Drivers</h2>
                <button className="py-[2px] " onClick={handleViewAllDrivers}><img src={menu} alt="" /></button>
            </div>
            <div className="h-full overflow-y-scroll">
                <table className="w-full">
                    <tbody>
                        <tr className="tableRow">
                            <td className="text-black dark:text-white font-medium">
                                <ul>
                                    {driversData.length > 0 ? (
                                        driversData.map((driver, index) => (
                                            <li key={index} className="flex justify-between my-2 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 pl-1 rounded-md">
                                                {driver.drv_name} <span className="badgee">V : {driver.ver}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No Drivers data found for this client.</p>
                                    )}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export {InstalledDrivers};





// TABLE TO DISPLAY INSTALLED BACKGROUND PROCESSES
const BackgroundProcess = () => {
    const navigate = useNavigate();
    const { ip } = useParams();
    const [backgroundProcessData, setBackgroundProcessData] = useState([]);
    const [error, setError] = useState(null);

    const handleViewAllBgp = () => {
        navigate('/specific-data/', { state: { data: backgroundProcessData, type: 'bgp' } });
    };

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch('http://192.168.68.200:8000/api/bgp/');
                if (!response.ok) throw new Error(`Error fetching client data: ${response.status}`);
                
                const data = await response.json();
                // console.log(data);
                
                
                setBackgroundProcessData(data);
            } catch (err) {
                setError('Failed to fetch client details');
                console.error('Error fetching client data:', err);
            }
        };

        fetchClientData();
    }, [ip]);

    if (error) return <p>{error}</p>;
    if (!backgroundProcessData.length) {
        return (
          <div className={'w-full flex flex-col h-full'}>
            <Skeleton count={0.4} baseColor={'#d9d9d9'}/>
            <Skeleton height={30} count={8} baseColor={'#d9d9d9'} enableAnimation={true} duration={1.3} direction={'ltr'} className="mb-2" />
          </div>
        );
    }
    return (
        <div className="w-full flex flex-col h-full">
            <div className="mb-[18px] flex justify-between items-center">
                <h2 className="font-bold dark:text-[#eee2df] text-[#161a1d]">Background Process</h2>
                <button className="py-[2px]" onClick={handleViewAllBgp}><img src={menu} alt="" /></button>
            </div>
            <div className="h-full overflow-y-scroll">
                <table className="w-full">
                    <tbody>
                        <tr className="tableRow">
                            <td className="text-black dark:text-white font-medium">
                                <ul>
                                    {backgroundProcessData.length > 0 ? (
                                        backgroundProcessData.map((bgp, index) => (
                                            <li key={index} className="flex justify-between my-2 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 pl-1 rounded-md">
                                                {bgp.exe_name} <span className="badgee">ID : {bgp.id}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No background process data found for this client.</p>
                                    )}
                                </ul>
                                {/* <ul>
                                    {backgroundProcessData.map((bgp, index) => (
                                            <li key={index}>
                                              <ul className={'flex justify-between my-2'}>
                                                {bgp.name || `${index + 1}`}
                                                {pro.status == 'running'?
                                                <img src={upArrow} alt="" className={'ml-auto text-lightGreen dark:text-darkGreen bg-lightGreen1 dark:bg-darkGreen1'}/>
                                                 : <img src={downArrow} alt="" className={'ml-auto text-lightRed dark:text-darkRed bg-lightRed1 dark:bg-darkRed1'}></img>
                                                }
                                                <span className={'items-center rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-blue-50 mx-2'}>V: {pro.pid || 'N/A'}</span>
                                              </ul>
                                            </li>
                                        ))}
                                </ul> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export {BackgroundProcess};






// TABLE TO DISPLAY INSTALLED LOGS
const Logs = () => {
    const navigate = useNavigate();
    const { ip } = useParams();
    const [logsData, setLogsData] = useState([]);
    const [error, setError] = useState(null);

    const handleViewAllLogs = () => {
        navigate('/specific-data/', { state: { data: logsData, type: 'logs' } });
    };

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch(`http://192.168.68.200:8000/api/logs/${ip}`);
                if (!response.ok) throw new Error(`Error fetching client data: ${response.status}`);
                
                const data = await response.json();
                if (Array.isArray(data)) {
                    setLogsData(data);
                }
            } catch (err) {
                setError('Failed to fetch Logs details');
                console.error('Error fetching client data:', err);
            }
        };

        fetchClientData();
    }, [ip]);

    if (error) return <p>{error}</p>;
    if (!logsData.length) {
        return (
          <div className={'w-full flex flex-col h-full'}>
            <Skeleton count={0.4} baseColor={'#d9d9d9'}/>
            <Skeleton height={30} count={8} baseColor={'#d9d9d9'} enableAnimation={true} duration={2} direction={'ltr'} className="mb-2" />
          </div>
        );
    }
    return (
        <div className="w-full flex flex-col h-full">
            <div className="mb-[18px] flex justify-between items-center">
                <h2 className="font-bold dark:text-[#eee2df] text-[#161a1d]">Logs</h2>
                <button className="py-[2px]" onClick={handleViewAllLogs}><img src={menu} alt="" /></button>
            </div>
            <div className="h-full overflow-y-scroll">
                <table className="w-full">
                    <tbody>
                        <tr className="tableRow">
                            <td className="text-black dark:text-white font-medium">
                                <ul>
                                    {logsData.length > 0 ? (
                                        logsData.map((log, index) => (
                                            <li key={index} className={'flex justify-between my-2 py-2 bg-gray-100 dark:bg-gray-800  pl-1 rounded-md'}>
                                                {log.src_name} 
                                                <span className={`badgelog ${
                                                    log.svt === "Low"
                                                    ? "bg-green-400 dark:bg-green-600"
                                                    : log.svt === "High"
                                                    ? "bg-red-500 dark:bg-red-700" 
                                                    : "bg-gray-200 dark:bg-gray-600" 
                                                    }`}>{log.svt}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No Logs data found for this client.</p>
                                    )}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export {Logs};






// TABLE TO DISPLAY INSTALLED CONNECTED IPS
const ConnectedIps = ({ sys_info }) => {
    const ports = sys_info?.ports || [];
    const navigate = useNavigate();
    const { ip } = useParams();
    const [ipData, setIpData] = useState([]);
    const [error, setError] = useState(null);

    const handleViewAllips = () => {
        navigate('/globe/', { state: { data: ipData, type: 'ips', sys_info  } });
    };
    
    // Memoize ipData to avoid recalculations
    const processedData = useMemo(() => {
        if (Array.isArray(ports)) {
            return ports;
        } else {
            setError("Invalid ports data.");
            return [];
        }
    }, [ports,ip]);
    
    useEffect(() => {
        // Only update if processedData is different
        if (JSON.stringify(ipData) !== JSON.stringify(processedData)) {
            setIpData(processedData);
        }
    }, [processedData]);

    if (error) return <p>{error}</p>;
    // if (!ports.length) {
    //     return (
    //       <div className={'w-full flex justify-center items-center text-lg text-gray-400 h-full '}>
    //         <h1>Fetching Connectd IP Data .......</h1>
    //       </div>
    //     );
    // }
    return (
        <div className="w-full flex flex-col h-full">
            <div className="mb-[18px] flex justify-between items-center">
                <h2 className="font-bold dark:text-[#eee2df] text-[#161a1d]">Connectd IPs</h2>
                <button className="py-[2px]" onClick={handleViewAllips}><img src={menu} alt="" /></button>
            </div>
            <div className="h-full overflow-y-scroll">
                <table className="w-full">
                    <tbody>
                        <tr className="tableRow">
                            <td className="text-black dark:text-white font-medium">
                                <ul>
                                    {ipData.length > 0 ? (
                                        ipData.map((ip, index) => (
                                            <li key={index} className="flex justify-between my-2 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 pl-1 rounded-md">
                                                {ip.process_name} <span className="badgee">IP : {ip.local_addr}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No Connected IP data found for this client.</p>
                                    )}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export {ConnectedIps};







// TABLE TO DISPLAY FIREWALL RULES
const FireWallRules = () => {
    const navigate = useNavigate();
    const { ip } = useParams();
    const [logsData, setLogsData] = useState([]);
    const [error, setError] = useState(null);

    const handleViewAllFirewallRules = () => {
        navigate('/firewallrules/', { state: { data: logsData, type: 'firewallrules' } });
    };

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch(`http://192.168.68.200:8000/api/logs/${ip}`);
                if (!response.ok) throw new Error(`Error fetching client data: ${response.status}`);
                
                const data = await response.json();
                if (Array.isArray(data)) {
                    setLogsData(data);
                }
            } catch (err) {
                setError('Failed to fetch Logs details');
                console.error('Error fetching client data:', err);
            }
        };

        fetchClientData();
    }, [ip]);

    if (error) return <p>{error}</p>;
    if (!logsData.length) {
        return (
          <div className={'w-full flex flex-col h-full'}>
            <Skeleton count={0.4} baseColor={'#d9d9d9'}/> 
            <Skeleton height={30} count={8} baseColor={'#d9d9d9'} enableAnimation={true} duration={1}  className="mb-2" />
          </div>
        );
    }
    return (
        <div className="w-full flex flex-col h-full">
            <div className="mb-[18px] flex justify-between items-center">
                <h2 className="font-bold dark:text-[#eee2df] text-[#161a1d]">Firewall Rules</h2>
                <button className="py-[2px]" onClick={handleViewAllFirewallRules}><img src={menu} alt="" /></button>
            </div>
            <div className="h-full overflow-y-scroll">
                <table className="w-full">
                    <tbody>
                        <tr className="tableRow">
                            <td className="text-black dark:text-white font-medium">
                                <ul>
                                    {logsData.length > 0 ? (
                                        logsData.map((log, index) => (
                                            <li key={index} className="flex justify-between my-2 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 pl-1 rounded-md">
                                                {log.src_name} <span className="badgee">ID : {log.id}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No Logs data found for this client.</p>
                                    )}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export {FireWallRules};