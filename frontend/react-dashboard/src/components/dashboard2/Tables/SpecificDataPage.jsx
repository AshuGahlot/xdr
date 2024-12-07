import React, {useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import SideSheet from '../SideSheet/SideSheet';




const SpecificDataPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null); // State to store the selected row data
  const [searchQueries, setSearchQueries] = useState({}); // State for search queries
  const [searchTerms, setSearchTerms] = useState({}); // Store search inputs for each field


  const location = useLocation();
  const {data, type} = location.state || {}; // Accessing passed data
  
  // console.log(data);
  
  const openSidebar = (value, field) => {
    setSelectedData({ value, field }); // Store specific field value and name
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSelectedData(null); // Reset selected data when closing the sidebar
  };

    // Update search terms dynamically
  const handleSearchChange = (field, value) => {
    setSearchTerms((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
    
  // Filter data based on search terms
  const filteredData =
  data?.filter((item) => {
    // Check for matching fields
    return Object.keys(searchTerms).every((key) => {
      const searchValue = searchTerms[key]?.toLowerCase();
      const fieldValue = item[key];

      // Handle integer comparison for e_id
      if (key === "e_id" && searchValue) {
        return fieldValue?.toString().includes(searchValue); // Convert int to string for comparison
      }

      // Handle string fields (case-insensitive)
      if (typeof fieldValue === "string" && searchValue) {
        return fieldValue.toLowerCase().includes(searchValue);
      }
      // Default: include all items if no search
      return true;
    });
  }) || [];

    
  return (
    <>
    <div className={"relative top-0 left-0 overflow-x-auto overflow-y-auto scroll-smooth shadow-md sm:rounded-lg"}>
      <table className={"w-full text-sm text-left text-gray-500 dark:text-gray-400"}>
        <thead className={"text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border-b-2"}>
          <tr>
          {type === 'apps' && (
              <>
                <th scope="col" className="px-2 py-3">Apps Name</th>
                <th scope="col" className="px-2 py-3">Version</th>
                <th scope="col" className="px-2 py-3">New Version</th>
                <th scope="col" className="px-2 py-3">Publisher</th>
                {/* <th scope="col" className="px-2 py-3">ID</th> */}
              </>
            )}
             {type === 'drivers' && (
              <>
                <th scope="col" className="px-2 py-3">Drivers Name</th>
                <th scope="col" className="px-2 py-3">Version</th>
                {/* <th scope="col" className="px-2 py-3">User Name</th>
                <th scope="col" className="px-2 py-3">ID</th> */}
              </>
            )}
             {type === 'bgp' && (
              <>
                <th scope="col" className="px-2 py-3">Background Process Name</th>
                <th scope="col" className="px-2 py-3">Last Updated</th>
                <th scope="col" className="px-2 py-3">Procedded By</th>
                <th scope="col" className="px-2 py-3">Process ID</th>
              </>
            )}
             {type === 'logs' && (
              <>
                <th scope="col" className="px-2 py-3">Logs Type</th>
                <th scope="col" className="px-2 py-3">Source Name</th>
                <th scope="col" className="px-2 py-3">Description</th>
                <th scope="col" className="px-2 py-3">Time Generated</th>
                <th scope="col" className="px-2 py-3">Event ID</th>
                <th scope="col" className="px-2 py-3">Severnity</th>
              </>
            )}
          </tr>
          {/* FOR SEARCHING INPUT FIELD  */}
          <tr>
      {type === 'apps' && (
        <>
        <th><input 
              onChange={(e) => handleSearchChange("app_name", e.target.value)} 
              type="text" 
              className="w-full px-2 py-1 my-2 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Apps Name" /></th>

        <th><input
              onChange={(e) => handleSearchChange("ver", e.target.value)}
              type="text" 
              className="w-full px-2 py-1 my-2 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Version" /></th>

        <th><input 
              onChange={(e) => handleSearchChange("ver", e.target.value)}
              type="text" 
              className="w-full px-2 py-1 my-2 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search New Version" /></th>
        <th><input 
              onChange={(e) => handleSearchChange("vend", e.target.value)}
              type="text" 
              className="w-full px-2 py-1 my-2 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Publisher" /></th>
        </>
      )}
      {type === 'drivers' && (
        <>
        <th><input
              onChange={(e) => handleSearchChange("drv_name", e.target.value)}  
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Drivers Name" /></th>
        <th><input
              onChange={(e) => handleSearchChange("ver", e.target.value)}  
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Version" /></th>
        </>
      )}
      {type === 'bgp' && (
        <>
        <th><input 
              onChange={(e) => handleSearchChange("exe_name", e.target.value)}
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Background Process Name" /></th>
        <th><input 
              onChange={(e) => handleSearchChange("last_update", e.target.value)}
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Last Updated" /></th>
        <th><input 
              onChange={(e) => handleSearchChange("pcd_by", e.target.value)}
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Procedded By" /></th>
        <th><input 
              onChange={(e) => handleSearchChange("pid", e.target.value)}
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Process ID" /></th>
        </>
      )}
      {type === 'logs' && (
        <>
        <th><input
              onChange={(e) => handleSearchChange("lg_type", e.target.value)}  
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Logs Type" /></th>
        <th><input
              onChange={(e) => handleSearchChange("src_name", e.target.value)}  
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Source Name" /></th>
        <th><input
              onChange={(e) => handleSearchChange("desc", e.target.value)}  
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Description" /></th>
        <th><input
              onChange={(e) => handleSearchChange("time", e.target.value)}  
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Time Generated" /></th>
        <th><input
              onChange={(e) => handleSearchChange("e_id", e.target.value)}  
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Event ID" /></th>
        <th><input
              onChange={(e) => handleSearchChange("svt", e.target.value)}  
              type="text" 
              className="w-full px-2 py-1 border rounded dark:bg-gray-700 text-gray-600 dark:text-white" placeholder="Search Severity" /></th>
        </>
      )}
    </tr>
        </thead>
        <tbody>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item, index) => (
            <tr key={index}
            onClick={() => openSidebar(item)}
            className={"odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center cursor-pointer"}>
            {type === 'apps' && (
              <>
                <td scope="col" className="px-2 py-3">{item.app_name}</td>
                <td scope="col" className="px-2 py-3">{item.ver}</td>
                <td scope="col" className="px-2 py-3">{item.ver || 'No Vendor '}</td>
                <td scope="col" className="px-2 py-3">{item.vend}</td>
              </>
            )}
            {type === 'drivers' && (
              <>
                <td scope="col" className="px-2 py-3">{item.drv_name}</td>
                <td scope="col" className="px-2 py-3">{item.ver}</td>
                {/* <td scope="col" className="px-2 py-3">{item.pc_name}</td>
                <td scope="col" className="px-2 py-3">{item.id}</td> */}
              </>
            )}
            {type === 'bgp' && (
              <>
                <td scope="col" className="px-2 py-3">{item.exe_name}</td>
                <td scope="col" className="px-2 py-3">{item.last_update}</td>
                <td scope="col" className="px-2 py-3">{item.pcd_by}</td>
                <td scope="col" className="px-2 py-3">{item.pid}</td>
              </>
            )}
           {type === 'logs' && (
              <>
                <td scope="col" className="px-2 py-3">{item.lg_type}</td>
                <td scope="col" className="px-2 py-3">{item.src_name}</td>
                <td scope="col" className="px-2 py-3">{item.desc || 'Description not available'}</td>
                <td scope="col" className="px-2 py-3">{item.time}</td>
                <td scope="col" className="px-2 py-3">{item.e_id}</td>
                <td scope="col" className= {`px-2 py-3badgee ${
                                                    item.svt === "Low"
                                                    ? "text-green-600 dark:text-green-500 font-bold text-md"
                                                    : item.svt === "High"
                                                    ? "text-red-600 dark:text-red-500 font-bold text-md" 
                                                    : item.svt === 'Medium'
                                                    ? 'text-yellow-400 dark:text-yellow-600 font-bold text-md'
                                                    : "text-gray-600 dark:text-gray-300" 
                                                    }`}>{item.svt}</td>
              </>
            )}
            </tr>
        ))
    ): (
        <p>no data found</p>
    )}
        </tbody>
      </table>
      <SideSheet isOpen={isSidebarOpen} onClose={closeSidebar} selectedData={selectedData} type={type}/>

    </div>
  </>
  )
}

export default SpecificDataPage






