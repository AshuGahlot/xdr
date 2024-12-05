import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Details = () => {
  const { ip } = useParams(); // Extract the IP from the URL
  const [clientData, setClientData] = useState(null); // Store client data
  const [appsData, setAppsData] = useState(null); // Store apps data
  const [error, setError] = useState(null); // Store any errors

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`http://192.168.68.200:8000/api/dsh/${ip}/`);
        // const apps_response = await fetch(`http://192.168.68.200:8000/api/apps/${ip}/`);
        if (!response.ok) {
          throw new Error(`Error fetching client data: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // const apps = await apps_response.json()
        // console.log(apps);
        
        
        // if (data.client_data.length === 0) {
        //   setError('Client not found');
        //   return;
        // }

        setClientData(data); // Assuming the first client
        setAppsData(data.apps_data); // Set the apps data
      } catch (error) {
        setError('Failed to fetch client details');
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, [ip]); // This will run every time the `ip` parameter changes

  if (error) {
    return <p>{error}</p>;
  }

  if (!clientData) {
    return <p>Loading client data...</p>;
  }

  return (
    <div className="text-white">
      <h1>Client Details</h1>
      <p><strong>User Name:</strong> {clientData.user_name}</p>
      <p><strong>IP Address:</strong> {clientData.ip}</p>
      <p><strong>Hostname:</strong> {clientData.hostname}</p>
      <p><strong>Last Alive:</strong> {clientData.last_alive}</p>
      <p><strong>Public IP:</strong> {clientData.pub_ip}</p>
      <p><strong>Platform:</strong> {clientData.platform || 'N/A'}</p>
      <p><strong>Registration Date:</strong> {clientData.reg_date}</p>

      {/* Display Apps Data */}
      <h2>Apps Installed</h2>
      {appsData && appsData.length > 0 ? (
        <ul>
          {appsData.map((app, index) => (
            <li key={index}>
              <strong>App Name:<span>{app.id}</span></strong> {app.app_name} <br />
              {/* <strong>Version:</strong> {app.ver} <br />
              <strong>Vendor:</strong> {app.vend} */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No apps data found for this client.</p>
      )}
    </div>
  );
};

export default Details;









// const Details = () => {
//   const { ip } = useParams(); // Extract the IP from the URL
//   const [clientData, setClientData] = useState(null); // Store client data
//   const [error, setError] = useState(null); // Store any errors

//   useEffect(() => {
//     const fetchClientData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/clients/${ip}`);
//         if (!response.ok) {
//           throw new Error(`Error fetching client data: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(data[0].hostname);
//         console.log(ip);
        
        
//         if (data.length === 0) {
//           setError('Client not found');
//           return;
//         }
        
//         // Set the first client from the array
//         setClientData(data[0]);
//       } catch (error) {
//         setError('Failed to fetch client details');
//         console.error('Error fetching client data:', error);
//       }
//     };

//     fetchClientData();
//   }, [ip]); // This will run every time the `ip` parameter changes

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!clientData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className={'text-white'}>
//       <h1>Client Details</h1>
//       <p><strong>User Name:</strong> {clientData.user_name}</p>
//       <p><strong>IP Address:</strong> {clientData.ip}</p>
//       <p><strong>Hostname:</strong> {clientData.hostname}</p>
//       <p><strong>Last Alive:</strong> {clientData.last_alive}</p>
//       <p><strong>Public IP:</strong> {clientData.pub_ip}</p>
//       <p><strong>Platform:</strong> {clientData.platform || 'N/A'}</p>
//       <p><strong>Registration Date:</strong> {clientData.reg_date}</p>
//     </div>
//   );
// };

// export default Details;







// const DeviceDetails = () => {
//   const { ip } = useParams(); // Get the IP address from the URL parameter
//   const [clientData, setClientData] = useState(null);
//   const [error, setError] = useState(null); // To capture any errors

//   // Fetch the client data for the specific IP
//   useEffect(() => {
//     console.log(ip);
    
//     const fetchClientData = async (ip) => {
//       try {
//         const response = await fetch(`http://localhost:8000/clients/${ip}`);
//         if (!response.ok) {
//           throw new Error(`Error fetching client data: ${response.status}`);
//         }
//         const data = await response.json();
//         const client = data[0];
//         if (!client || client.length === 0) {
//             return <p>Client not found or data is loading...</p>;
//           }
//           // Since the response is an array, access the first element
//           console.log(data);
//         setClientData(client); // Set the client data to state
//       } catch (error) {
//         setError('Failed to fetch client details');
//         console.error('Error fetching client data:', error);
//       }
//     };

//     fetchClientData();
//   }, [ip]);

  
  

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!clientData) {
//     return <p>Loading device details...</p>;
//   }

//   return (
//     <div>
//       <h2>Client Details for IP: {ip}</h2>
//       {error && <p>{error}</p>}
//       {clientData ? (
//         <div className={'text-white'}>
//           {/* Show detailed data of the selected client */}
//           <p>Username: {clientData.ip}</p>
//           <p>Hostname: {clientData.hostname}</p>
//           <p>Platform: {clientData.platform}</p>
//           <p>Registration Date: {clientData.reg_date}</p>
//           <p>Last Alive: {clientData.last_alive}</p>
//           <p>Public IP: {clientData.pub_ip}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default DeviceDetails;
