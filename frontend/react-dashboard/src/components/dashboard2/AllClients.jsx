import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
const AllClients = () => {
    const [hostName, setHostname] = useState([]);
    const [ipAddress, setIpaddress] = useState([]);

    useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/asc/')

    socket.onopen = () => {
      console.log('All Clients socket connected');
    }
    socket.onmessage = (event) => {
      const sys_info = JSON.parse(event.data)
      // console.log(sys_info);

      const hostname = sys_info.system_info.hostname
      const ipaddress = sys_info.system_info.ip_address
      if((hostname)){
        // console.log(sys_info);
        
        setHostname(hostname);
      }
      setIpaddress(ipaddress);
      
    }
    socket.onclose = () => {
      console.log("All Clients socket closed");
      
    }
    },[])
  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Client Name
              </th>
              <th scope="col" class="px-6 py-3">
                IP Address
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Link  to='/hosts'>{hostName}</Link>
              </th>
              <td class="px-6 py-4">{ipAddress}</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllClients;
