import React from "react";
import shieldXDR from '../assets/images/shieldXDR.webp'
import Dlp from "../components/DLP/Dlp";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const handleRedirectLogin = () => {
    navigate('/login/')
    toast("Wow so easy !");

  }
  const notify = () => toast.success('Successfully Signed Up!');
  return (
    <>
      <div className="w-auto h-auto dashboardCard select-none">
      <div class="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from-gray-900 to-red-800 lg:h-screen p-6">
      <div class="grid md:grid-cols-2 items-center gap-y-8 bg-gray-800 max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
        <div class="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from-black-600 to-black-700 w-full h-full">
            <div className='mx-auto'>
                <img src={shieldXDR} alt="" />
            </div>
          <div class="max-w-md space-y-12 mx-auto">
           
            <div>
              <h4 class="text-white text-lg font-semibold">Create Your Account</h4>
              <p class="text-[13px] text-white mt-2">Welcome to our registration page! Get started by creating your account.</p>
            </div>
            <div>
              <h4 class="text-white text-lg font-semibold">Simple & Secure Registration</h4>
              <p class="text-[13px] text-white mt-2">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
            </div>
            <div>
              <h4 class="text-white text-lg font-semibold">Terms and Conditions Agreement</h4>
              <p class="text-[13px] text-white mt-2">Require users to accept the terms and conditions of your service during registration.</p>
            </div>
          </div>
        </div>

        <form class="sm:p-8 p-4 w-full ">
          <div class="mb-12 grid grid-cols-2 gap-20">
            <h3 class="text-red-500 text-3xl font-extrabold max-md:text-center">Register</h3>
            <button onClick={handleRedirectLogin} type="button" class="py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-red-800 hover:bg-red-700 focus:outline-none transition-all">
               Login 
            </button>
          </div>

          <div class="grid lg:grid-cols-2 gap-6 text-white">
            <div>
              <label class="text-white text-sm mb-2 block">Company Name</label>
              <input name="name" type="text" class="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500" placeholder="Enter name" />
            </div>
            <div>
              <label class=" text-sm mb-2 block">User Name</label>
              <input name="lname" type="text" class="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500" placeholder="Enter last name" />
            </div>
            <div>
              <label class=" text-sm mb-2 block">Email Id</label>
              <input name="email" type="text" class="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500" placeholder="Enter email" />
            </div>
            <div>
              <label class="text-sm mb-2 block">Mobile No.</label>
              <input name="number" type="text" class="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500" placeholder="Enter mobile number" />
            </div>
            <div>
              <label class=" text-sm mb-2 block">Password</label>
              <input name="password" type="password" class="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500" placeholder="Enter password" />
            </div>
            <div>
              <label class=" text-sm mb-2 block">Confirm Password</label>
              <input name="cpassword" type="password" class="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500" placeholder="Enter confirm password" />
            </div>
          </div>

          <div class="flex items-center mt-6 text-white">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 rounded" />
            <label for="remember-me" class="ml-3 block text-sm">
              I accept the <a href="javascript:void(0);" class="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
            </label>
          </div>

          <div class="mt-6">
            <button onClick={notify} type="button" class="py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none transition-all">
              Sign up
            </button>
            <ToastContainer
                position="top-center"
                autoClose={8000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                
                />

          </div>
        </form>
      </div>
    </div>
      </div>
      {/* Dlp Start  */}
      {/* <div className='bg-slate-500 mt-6 py-4 px-4 rounded-lg'>
      <Dlp />
      </div> */}
    </>
  );
};
export default Register;







// Login Page 
const Login = () => {
  const navigate = useNavigate();
  const handlebackbtn = () => {
    navigate('/register/')
  }
  return (
    <>
    <div className="w-auto h-auto dashboardCard select-none">
    <div class="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from-gray-900 to-red-800 lg:h-screen p-6">
    <div class="grid md:grid-cols-2 items-center gap-y-8 bg-gray-800 max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
      <div class="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from-black-600 to-black-700 w-full h-full">
          <div className='mx-auto'>
              <img src={shieldXDR} alt="" />
          </div>
        <div class="max-w-md space-y-12 mx-auto">
         
          <div>
            <h4 class="text-white text-lg font-semibold">Create Your Account</h4>
            <p class="text-[13px] text-white mt-2">Welcome to our registration page! Get started by creating your account.</p>
          </div>
          <div>
            <h4 class="text-white text-lg font-semibold">Simple & Secure Registration</h4>
            <p class="text-[13px] text-white mt-2">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
          </div>
          <div>
            <h4 class="text-white text-lg font-semibold">Terms and Conditions Agreement</h4>
            <p class="text-[13px] text-white mt-2">Require users to accept the terms and conditions of your service during registration.</p>
          </div>
        </div>
      </div>

      <form class="sm:p-8 p-4 w-full ">
        <div class="mb-12 flex justify-between">
          <h3 class="text-red-500 text-3xl font-extrabold max-md:text-center">Login</h3>
          <h2 className="text-lightBlue4 cursor-pointer " onClick={handlebackbtn}>Back</h2>
        </div>

        <div class="grid lg:grid-cols-1 gap-6 text-white">
          <div>
            <label class=" text-sm mb-2 block">User Name</label>
            <input name="lname" type="text" class="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500" placeholder="Enter last name" />
          </div>
          <div>
            <label class=" text-sm mb-2 block">Password</label>
            <input name="password" type="password" class="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500" placeholder="Enter password" />
          </div>
        </div>

        <div class="flex items-center mt-6 text-white">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 rounded" />
          <label for="remember-me" class="ml-3 block text-sm">
            I accept the <a href="javascript:void(0);" class="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
          </label>
        </div>

        <div class="mt-6">
          <button type="button" class="py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none transition-all">
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
    </div>
  </>
  )
}

export {Login};