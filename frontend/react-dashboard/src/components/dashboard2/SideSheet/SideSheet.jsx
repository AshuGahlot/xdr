// RightSidebar.js
import React from 'react';


const SideSheet = ({ isOpen, onClose, selectedData, type }) => {
  if (!isOpen) return null; // Don't render if sidebar is not open

  // console.log(selectedData)
// Dynamically change header based on `type`
  const getTitle = () => {
    switch (type) {
      case 'apps':
        return 'Apps Details';
      case 'drivers':
        return 'Driver Details';
      case 'bgp':
        return 'Background Process Details';
      case 'logs':
        return 'Log Details';
      case 'ips':
        return 'Connected IP Details';
      default:
        return 'Details';
    }
  };

  const title = getTitle();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/3  bg-white dark:bg-gray-800 dark:text-white shadow-2xl dark:shadow-2xl dark:shadow-gray-700 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 pt-16 border-b border-gray-600 dark:border-gray-300">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose} className="text-xl text-gray-600 dark:text-gray-100 hover:text-gray-800">✖</button>
      </div>
      <div className="p-4">
      {selectedData ? (
          <div className="my-5 space-y-4">
             {type === 'apps' && (
              <>
                <p><strong className="py-3">Apps Name :</strong>{selectedData.value.app_name}</p>
                <p><strong className="py-3">Version :</strong>{selectedData.value.ver}</p>
               <p> <strong  className="py-3">Vendor :</strong>{selectedData.value.vend}</p>
                <p><strong  className="py-3">ID :</strong>{selectedData.value.id}</p>
              </>
            )}
             {type === 'drivers' && (
              <>
                <p><strong scope="col" className="py-3">Drivers Name :</strong>{selectedData.value.drv_name}</p>
                <p><strong scope="col" className="py-3">Version :</strong>{selectedData.value.ver}</p>
                <p><strong scope="col" className="py-3">User Name :</strong>{selectedData.value.pc_name}</p>
                <p><strong scope="col" className="py-3">ID :</strong>{selectedData.value.id}</p>
              </>
            )}
             {type === 'bgp' && (
              <>
                <p><strong scope="col" className="py-3">Background Process Name :</strong>{selectedData.value.exe_name}</p>
                <p><strong scope="col" className="py-3">Last Updated :</strong>{selectedData.value.last_update}</p>
                <p><strong scope="col" className="py-3">Procedded By :</strong>{selectedData.value.pcd_by}</p>
                <p><strong scope="col" className="py-3">Process ID :</strong>{selectedData.value.pid}</p>
              </>
            )}
             {type === 'logs' && (
              <>
                <p><strong scope="col" className="py-3">Logs Type :</strong>{selectedData.value.lg_type}</p>
                <p><strong scope="col" className="py-3">Source Name :</strong>{selectedData.value.src_name}</p>
                <p><strong scope="col" className="py-3">Description :</strong>{selectedData.value.desc || 'NO Description Available'}</p>
                <p><strong scope="col" className="py-3">Log Category :</strong>{selectedData.value.lg_cat}</p>
                <p><strong scope="col" className="py-3">Severnity :</strong>{selectedData.value.svt}</p>
              </>
            )}
          </div>
        ) : (
          <p>No data selected</p>
        )}
        {/* Add more sidebar content here */}
      </div>
    </div>
  );
};

export default SideSheet;













// const SideSheet = ({ isOpen, onClose, selectedData, type }) => {
//   if (!isOpen) return null; // Don't render if sidebar is not open

//   // console.log(selectedData)
//   // Dynamically change header based on `type`
//   const getTitle = () => {
//     switch (type) {
//       case 'apps':
//         return 'Apps Details';
//       case 'drivers':
//         return 'Driver Details';
//       case 'bgp':
//         return 'Background Process Details';
//       case 'logs':
//         return 'Log Details';
//       case 'ips':
//         return 'Connected IP Details';
//       default:
//         return 'Details';
//     }
//   };

//   const title = getTitle();
//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-1/3  bg-white dark:bg-gray-800 dark:text-white shadow-2xl dark:shadow-2xl dark:shadow-gray-700 transform transition-transform duration-300 ${
//         isOpen ? 'translate-x-0' : 'translate-x-full'
//       }`}
//     >
//       <div className="flex justify-between items-center p-4 pt-16 border-b">
//         <h2 className="text-lg font-semibold">{title}</h2>
//         <button onClick={onClose} className="text-xl text-gray-600 dark:text-gray-100 hover:text-gray-800">
//           x
//         </button>
//       </div>
//       <div className="p-4">
//       {selectedData ? (
//           <div className="py-5 space-y-4">
//               <p><strong>{type === 'apps' ? 'App Name ' :
//                 type === 'drivers' ? 'Driver Name ' :
//                 type === 'bgp' ? 'Background Process Name ' :
//                 type === 'logs' ? 'Log Name ' :
//                 type === 'ips' ? 'Connected Ip Address ' : 'Name'}:
//                 </strong> {selectedData.value.app_name || selectedData.value.drv_name || selectedData.value.exe_name || selectedData.value.lg_type || selectedData.value.lg_type || 'N/A'}
//               </p> 

//               <p><strong>{type === 'drivers'? 'User Name' : 'Version'}</strong> {selectedData.value.pc_name || selectedData.value.ver}</p>

//               <p><strong>{type === 'bgp'? 'Last Updated' && 'Processed By' : 'Version'}</strong> {selectedData.value.last_update && selectedData.value.pcd_by || selectedData.value.ver }</p>

//               <p><strong>{type === 'logs'? 'Source name' : 'Vendor'}</strong> {selectedData.value.src_name || selectedData.value.vend || 'N/A'}</p>

//             <p><strong>{selectedData.value.id ? 'ID' : 'Process ID'}</strong> {selectedData.value.id || selectedData.value.pid || 'N/A'}</p>
//           </div>
//         ) : (
//           <p>No data selected</p>
//         )}
//         {/* Add more sidebar content here */}
//       </div>
//     </div>
//   );
// };

// export default SideSheet;


// {selectedData ? (
//   <div className='py-5 space-y-4'>
//     <p><strong>App Name:</strong> {selectedData.value.app_name || selectedData.value.drv_name || selectedData.value.exe_name || selectedData.value.lg_type}</p>
//     <p><strong>Version:</strong> {selectedData.value.ver || selectedData.value.last_update || selectedData.value.src_name}</p>
//     <p><strong>Vendor:</strong> {selectedData.value.vend || selectedData.value.venv || selectedData.value.pcd_by || selectedData.value.e_id}</p>
//     <p><strong>ID:</strong> {selectedData.value.id || selectedData.value.pid || selectedData.value.id}</p>
//   </div>
// ) : (
//   <p>No data selected</p>
// )}