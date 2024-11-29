import React, {useState} from "react";

import ThemeSwitcher from "../ThemeSwitcher.jsx";
import search from "../../assets/svgIcon/search.svg";
import avatar from "../../assets/images/avatar.png";
import menu from "../../assets/images/menu.png";
import NotificationIcon from "../svg/NotificationIcon.jsx";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
    // for dropdown menu open and close 
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState); // Toggle the dropdown visibility
    };

    // redirect to all apps page 
    const navigate = useNavigate()
    const handleRegisterPage = () => {
        navigate('/register/');
    };




    return (
        <div className={"w-full h-[98px] px-[37px] py-[21px] flex items-center justify-between bg-lightPrimaryColor dark:bg-darkPrimaryColor"}>
            <div className={'w-2/5 flex justify-between items-center px-[26px] py-4 rounded-full border-[1.3px] border-lightGrayColor2 dark:darkGrayColor2'}>
                <input type="text" placeholder="Search..." className={'cursor-text focus:outline-none bg-transparent dark:text-white'}/>
                <img src={search} alt=""/>
            </div>
            <div className={'flex justify-center items-center gap-x-[28px]'}>
                <ThemeSwitcher/>
                <NotificationIcon fill={"fill-lightBlue2 dark:fill-white"}/>
                <div className={'bg-lightBlue3 dark:bg-darkBlue3 rounded-xl px-4 py-[6px] flex justify-between items-center gap-x-[9px] cursor-pointer'}>
                    <img src={avatar} alt=""/>
                    <div>
                        <p className={'text-blackColor dark:text-grayColor text-[13px] font-semibold leading-7'}>Andy Warhol</p>
                        <p className={'text-ashColor2 text-[11px] font-medium leading-7'}>andywarhol@mail.com</p>
                    </div>
                    <div  onClick={toggleDropdown}>
                    <img src={menu} alt="" className={'pl-[33px]'}/>
                    {/* DROPDOWN MENU  */}
                    {isOpen && (
                <div className="absolute right-10 mt-8 w-40 bg-white border rounded shadow-lg z-20">
                    <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
                    </ul>
                </div>
            )}
                    {/* DROPDOWN MENU END */}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Navbar