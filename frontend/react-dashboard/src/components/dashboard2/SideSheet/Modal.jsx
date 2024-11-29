import React from 'react';



const Modal = ({ onClose, children }) => {
    return (
      <div className="w-1/3 h-72 fixed top-1/3 left-1/3 rounded-2xl flex justify-center align-center z-10" onClick={onClose}>
        <div className="bg-gray-200 dark:bg-gray-700 border-gray-50 text-black dark:text-white m-2 p-2 rounded-lg w-[100%] relative shadow-md " onClick={(e) => e.stopPropagation()}>
          <div className='text-end'>
          <button className=" cursor-pointer" onClick={onClose}>✖</button>
          </div>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;