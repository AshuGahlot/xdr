import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const AllClients = () => {
  const [data, setData] = useState([]); // Holds all client data from API
  const [online, setOnline] = useState({}); // Holds online status by IP address
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.68.200:8000/api/clients/');
        if (!response.ok) {
          throw new Error(`Error fetching clients: ${response.status}`);
        }
        const clientsData = await response.json();
        setData(clientsData); // Set the fetched clients to the state
        

        // Open a WebSocket for each client
        clientsData.forEach((client) => {
          const { ip, user_name } = client;
          // const formattedName = user_name.replace(" ", "_");
          // const formattedIp = ip.replaceAll(".", "_");
          let socket;
          let reconnectInterval;
          
          function connectWebSocket() { 
          // const Websocket = new WebSocket(`ws://192.168.68.200:8000/ws/asc/${formattedName}/${formattedIp}/`);
          const Websocket = new WebSocket('ws://192.168.68.200:8000/ws/user/');

          Websocket.onopen = () => {
            console.log('Connected:', ip, user_name);
            setOnline(prevOnline => ({
              ...prevOnline,
              [ip]: { isOnline: true }
            }));

              // Clear reconnect interval on successful connection
              if (reconnectInterval) {
                clearInterval(reconnectInterval);
                reconnectInterval = null;
              }
          };

          Websocket.onmessage = (event) => {
          const systemInfo = JSON.parse(event.data);
          const ipAddress = systemInfo.ip_address;

          console.log(systemInfo);
          
          // Check if the IP address from WebSocket message exists in the data list
          if (clientsData.some(client => client.ip === ipAddress)) {
            // Update online status by setting IP to true
            setOnline(prevOnline => ({
              ...prevOnline,
              [ipAddress]: { isOnline: true},
            }));

              // Move the online client to the top of the `data` list only if not already at the top
            setData(prevData => {
              const updatedData = [...prevData];
              const clientIndex = updatedData.findIndex(client => client.ip === ipAddress);

              // Only move if the client is found and not already at the top
              if (clientIndex > 0) {
                const [client] = updatedData.splice(clientIndex, 1); // Remove the client from its current position
                updatedData.unshift(client); // Place the client at the top of the list
              }
              return updatedData;
            });

            // Set a new 30-second timeout to mark as offline if no message is received
            if (online[ipAddress]?.timeout) clearTimeout(online[ipAddress].timeout);

            const timeout = setTimeout(() => {
              setOnline(prevOnline => ({
                ...prevOnline,
                [ipAddress]: { isOnline: false }, // Set IP as offline if no data within 30 seconds
              }));
            }, 2000);

            // Add the timeout reference to `online` state
            setOnline(prevOnline => ({
              ...prevOnline,
              [ipAddress]: { isOnline: true, timeout },
            }));
          }
        };

        Websocket.onclose = () => {
          console.log("All Clients socket closed");
          setOnline(prevOnline => ({ ...prevOnline, [ip]: { isOnline: false } }));

          reconnectInterval = setInterval(() => {
          console.log(`Attempting reconnection for ${ip} (${user_name})`);
          
          connectWebSocket(); // Attempt reconnection          

        }, 30000);
        };
      }
      // Initial call to establish WebSocket connection
      connectWebSocket();

        // Cleanup function to close WebSocket and clear timeouts on unmount
        return () => {
          if (socket) socket.close();
          if (reconnectInterval) clearInterval(reconnectInterval);
          if (online[ip]?.timeout) clearTimeout(online[ip].timeout);
        };
      })

      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };
 
    fetchData();
  }, []); // Run once on mount

  const handleIpClick = (name,ip) => {
    navigate(`/clients/${name.replace(' ','_')}/${ip}/`);
  };
    

  return (
    <>
      <div className={"relative overflow-x-auto shadow-md sm:rounded-lg"}>
        <table className={"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"}>
          <thead className={"text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
            <tr>
              <th scope="col" className={"px-6 py-3"}>
                Client Name
              </th>
              <th scope="col" className={"px-6 py-3"}>
                IP Address
              </th>
              <th scope="col" className={"px-6 py-3"}>
                Public IP
              </th>
              <th scope="col" className={"px-6 py-3"}>
                Register Date
              </th>
              <th scope="col" className={"px-6 py-3"}>
                Last Alive
              </th>
              <th scope="col" className={"px-6 py-3"}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
                {data && data.map((d) => (
            <tr key={d.id}
              onClick={() => handleIpClick(d.user_name, d.ip)}
              className={"odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center cursor-pointer"}>
              {/* <th scope="row" className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>
              </th> */}
              {/* <td className={" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}><Link  to='/hosts'>{d.hostname}</Link></td> */}
              <td className={"px-6 py-4"}>{d.user_name}</td>
              <td className={"px-6 py-4"}>{d.ip}</td>
              <td className={"px-6 py-4"}>{d.pub_ip}</td>
              <td className={"px-6 py-4"}>{d.reg_date}</td>
              <td className={"px-6 py-4"}>{d.last_alive}</td>
              <td style={{
              cursor: 'pointer',
              color: online[d.ip] ?. isOnline ? 'red' : 'green', // Green for online, red for offline
            }}
              >
                {online[d.ip] ?.isOnline ? 'Offline' : 'Online'}
              </td>

              <ToastContainer
                position="bottom-right"
                autoClose={8000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                
                />

              {/* <td className={'px-6 py-4 '}>
              {online.includes(d.ipaddress) ? (
              <span className={'text-green-500'}> Online</span>
            ) : (
              <span className={'text-red-500'}> Offline</span>
            )}
            </td> */}

              {/* <td className={"px-6 py-4"}>
                <a
                  href="#"
                  className={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}
                  >
                  Edit
                </a>
              </td> */}
            </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllClients;
