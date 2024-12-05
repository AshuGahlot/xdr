import {React, useState} from "react";
import shieldXDR from '../assets/images/shieldXDR.webp'
import Dlp from "../components/DLP/Dlp";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useAuth } from "./AuthContext.jsx";

import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyname: "",
    username: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyname) newErrors.companyname = "Company Name is required.";
    if (!formData.username) newErrors.username = "User Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid.";
    }
    if (!formData.number) {
      newErrors.number = "Mobile No. is required.";
    } else if (!/^\d+$/.test(formData.number)) {
      newErrors.number = "Mobile No. must be numeric.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.terms) newErrors.terms = "You must accept the Terms and Conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Save user credentials in localStorage
    localStorage.setItem("username", formData.username);
    localStorage.setItem("password", formData.password);

    setAuthData({ username: formData.username, password: formData.password });

     // Show success toast
    toast.success('Successfully Signed Up!');

    // Wait for 2 seconds and then navigate to login page
    setTimeout(() => {
    navigate("/login");
    }, 2000); // 2000ms = 2 seconds
};
  
  return (
    <>
      <div className="w-auto h-auto dashboardCard select-none">
      <div className="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from-gray-900 to-red-800 lg:h-screen p-6">
      <div className="grid md:grid-cols-2 items-center gap-y-8 bg-gray-800 max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from-black-600 to-black-700 w-full h-full">
            <div className='mx-auto'>
                <img src={shieldXDR} alt="" />
            </div>
          <div className="max-w-md space-y-12 mx-auto">
           
            <div>
              <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
              <p className="text-[13px] text-white mt-2">Welcome to our registration page! Get started by creating your account.</p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
              <p className="text-[13px] text-white mt-2">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">Terms and Conditions Agreement</h4>
              <p className="text-[13px] text-white mt-2">Require users to accept the terms and conditions of your service during registration.</p>
            </div>
          </div>
        </div>

        <form className="sm:p-8 p-4 w-full" onSubmit={handleSubmit}>
      <div className="mb-12 grid grid-cols-2 gap-20">
        <h3 className="text-red-500 text-3xl font-extrabold max-md:text-center">Register</h3>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-red-800 hover:bg-red-700 focus:outline-none transition-all"
        >
          Login
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 text-white">
        {/* Companyname input  */}
        <div>
          <label className="text-sm mb-2 block">Company Name</label>
          <input
            name="companyname"
            type="text"
            value={formData.companyname}
            onChange={handleInputChange}
            className="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500"
            placeholder="Enter Company Name"
          />
          {errors.companyname && <p className="text-red-500 text-sm">{errors.companyname}</p>}
        </div>

        {/* Username Input */}
        <div>
          <label className="text-sm mb-2 block">User Name</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            className="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500"
            placeholder="Enter Username"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label className="text-sm mb-2 block">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500"
            placeholder="Enter Email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone number input  */}
        <div>
          <label className="text-sm mb-2 block">Phone Number</label>
          <input
            name="number"
            type="text"
            value={formData.number}
            onChange={handleInputChange}
            className="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500"
            placeholder="Enter Username"
          />
          {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label className="text-sm mb-2 block">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500"
            placeholder="Enter Password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password Input */}
        <div>
          <label className="text-sm mb-2 block">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-center mt-6 text-white">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={formData.terms}  // Using formData.terms to control checkbox state
            onChange={handleInputChange}
            className="h-4 w-4 shrink-0 rounded"
          />
          <label htmlFor="terms" className="ml-3 block text-sm">
            I accept the{" "}
            <a href="#" className="text-blue-500 font-semibold hover:underline ml-1">
              Terms and Conditions
            </a>
          </label>
          {errors.terms && <p className="text-red-500 text-sm ml-4">{errors.terms}</p>}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none transition-all"
        >
          Sign up
        </button>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                transition = {Bounce}
                theme = 'colored'
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthData } = useAuth(); // Assuming useAuth is a custom hook that provides authentication data setter
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Initialize an empty error object
    const newErrors = {};

    // Validate username and password fields for empty values
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Check if credentials are incorrect
    if (username !== storedUsername) {
      newErrors.username = 'Incorrect username';
    }
    if (password !== storedPassword) {
      newErrors.password = 'Incorrect password';
    }

    // If any errors were found, update the errors state and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If credentials are correct, set auth data, show success toast, and navigate to the dashboard
    setAuthData({ username, password });
    toast.success('Successfully Logged In!'); // Show success toast
    setTimeout(() => {
      navigate('/dashboard'); // Redirect after 2 seconds
    }, 2000);
  };

  // Handle changes in input fields and clear errors when user starts typing
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear the error message for the field being updated
    if (errors[name] && value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '', // Reset the error for the specific field
      }));
    }

    // Update the corresponding state (username or password)
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  return (
    <>
    <div className="w-auto h-auto dashboardCard select-none">
    <div className="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from-gray-900 to-red-800 lg:h-screen p-6">
    <div className="grid md:grid-cols-2 items-center gap-y-8 bg-gray-800 max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
      <div className="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from-black-600 to-black-700 w-full h-full">
          <div className='mx-auto'>
              <img src={shieldXDR} alt="" />
          </div>
        <div className="max-w-md space-y-12 mx-auto">
         
          <div>
            <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-white mt-2">Welcome to our registration page! Get started by creating your account.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
            <p className="text-[13px] text-white mt-2">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Terms and Conditions Agreement</h4>
            <p className="text-[13px] text-white mt-2">Require users to accept the terms and conditions of your service during registration.</p>
          </div>
        </div>
      </div>

      <form className="sm:p-8 p-4 w-full" onSubmit={handleSubmit}>
        <div className="mb-12 flex justify-between">
          <h3 className="text-red-500 text-3xl font-extrabold max-md:text-center">Login</h3>
          <h2 className="text-lightBlue4 cursor-pointer " onClick={() => navigate("/")}>Back</h2>
        </div>

        <div className="grid lg:grid-cols-1 gap-6 text-white">
          <div>
            <label className=" text-sm mb-2 block">User Name</label>
            <input
            type="text"
            value={username}
            onChange={handleInputChange} // Use handleInputChange
            name="username" type="text" className="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500" placeholder="Enter last name" />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div>
            <label className=" text-sm mb-2 block">Password</label>
            <input
            type="password"
            value={password}
            onChange={handleInputChange} // Use handleInputChange
            name="password" type="password" className="bg-gray-100 w-full text-gray-800 text-md px-4 py-3 rounded-md outline-red-500" placeholder="Enter password" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
        </div>

        {/* <div className="flex items-center mt-6 text-white">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
          <label for="remember-me" className="ml-3 block text-sm">
            I accept the <a href="javascript:void(0);" className="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
          </label>
        </div> */}

        <div className="mt-6">
          <button type="submit" className="py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none transition-all">
            Log In
          </button>
          <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                transition = {Bounce}
                theme = 'colored'
                />
        </div>
      </form>
    </div>
  </div>
    </div>
  </>
  )
}

export {Login};