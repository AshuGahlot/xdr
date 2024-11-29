import React from 'react'


  const Dlp =  () => {

  return (
    <> 
    <div className='dashboardCard text-center bg-white text-2xl mb-2 rounded-md dark:text-gray-50'>
        <h1>DLP</h1>
    </div>
    <div className='dashboardCard w-auto h-auto flex bg-white px-3 py-3 mb-4 rounded-md dark:text-gray-50 leading-10'>
        <div className='w-2/4'>
            <h1>User Summary : </h1>
            <h1>Computer Name : </h1>
            <h1>Operating System : </h1>
            <h1>Service Pack : </h1>
            <h1>IP Address : </h1>
            <h1>Domain : </h1>
        </div>
        <div className='w-2/4'>
            <h1>Logged User :</h1>
            <h1>Policy Last Deployed Time :</h1>
            <h1>Last Boot Time :</h1>
            <h1>Remote Office :</h1>
            <h1>Custom Group Associated :</h1>
        </div>
    </div>

    <div className='flex justify-around my-6'>
<div
  className="cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-44 bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-purple-200 dashboardCard dark:text-gray-50">
  <svg
    className="stroke-purple-200 shrink-0"
    height="50"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 100 100"
    width="50"
    x="0"
    xmlns="http://www.w3.org/2000/svg"
    y="0"
  >
    <path
      d="M17.9,60.7A14.3,14.3,0,0,0,32.2,75H64.3a17.9,17.9,0,0,0,0-35.7h-.4a17.8,17.8,0,0,0-35.3,3.6,17.2,17.2,0,0,0,.4,3.9A14.3,14.3,0,0,0,17.9,60.7Z"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
    ></path>
  </svg>
  <div>
    <span className="font-bold text-center pb-4">File Access</span>
    <p className="line-clamp-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </div>
</div>

{/* Second Card  */}
<div
  className="cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-44 bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-purple-200 dashboardCard dark:text-gray-50"
>
  <svg
    className="stroke-purple-200 shrink-0"
    height="50"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 100 100"
    width="50"
    x="0"
    xmlns="http://www.w3.org/2000/svg"
    y="0"
  >
    <path
      d="M17.9,60.7A14.3,14.3,0,0,0,32.2,75H64.3a17.9,17.9,0,0,0,0-35.7h-.4a17.8,17.8,0,0,0-35.3,3.6,17.2,17.2,0,0,0,.4,3.9A14.3,14.3,0,0,0,17.9,60.7Z"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
    ></path>
  </svg>
  <div>
    <span className="font-bold">Email Access</span>
    <p className="line-clamp-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </div>
</div>

{/* Third Card  */}
<div
  className="cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-44 bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-purple-200 dashboardCard dark:text-gray-50"
>
  <svg
    className="stroke-purple-200 shrink-0"
    height="50"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 100 100"
    width="50"
    x="0"
    xmlns="http://www.w3.org/2000/svg"
    y="0"
  >
    <path
      d="M17.9,60.7A14.3,14.3,0,0,0,32.2,75H64.3a17.9,17.9,0,0,0,0-35.7h-.4a17.8,17.8,0,0,0-35.3,3.6,17.2,17.2,0,0,0,.4,3.9A14.3,14.3,0,0,0,17.9,60.7Z"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
    ></path>
  </svg>
  <div>
    <span className="font-bold">Card title</span>
    <p className="line-clamp-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </div>
</div>

{/* Fourth card  */}
<div
  className="cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-44 bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-purple-200 dashboardCard dark:text-gray-50"
>
  <svg
    className="stroke-purple-200 shrink-0"
    height="50"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 100 100"
    width="50"
    x="0"
    xmlns="http://www.w3.org/2000/svg"
    y="0"
  >
    <path
      d="M17.9,60.7A14.3,14.3,0,0,0,32.2,75H64.3a17.9,17.9,0,0,0,0-35.7h-.4a17.8,17.8,0,0,0-35.3,3.6,17.2,17.2,0,0,0,.4,3.9A14.3,14.3,0,0,0,17.9,60.7Z"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
    ></path>
  </svg>
  <div>
    <span className="font-bold">Card title</span>
    <p className="line-clamp-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </div>
</div>


</div>
    </>
  )
}

export default Dlp;