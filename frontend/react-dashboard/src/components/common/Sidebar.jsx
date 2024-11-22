import {Link, useLocation} from "react-router-dom";
import * as route from "../../routes/Slugs.jsx"
import logo from "../../assets/images/logo.svg";
import DashboardIcon from "../svg/DashboardIcon.jsx";
import MarketsIcon from "../svg/HostsIcon.jsx";
import TransactionIcon from "../svg/TransactionIcon.jsx";
import ProfileIcon from "../svg/ProfileIcon.jsx";
import SettingsIcon from "../svg/SettingsIcon.jsx";
import HelpIcon from "../svg/helpIcon.jsx";
import LogoutIcon from "../svg/LogoutIcon.jsx";
import pcicon from '../../assets/images/pcicon.svg';

const Sidebar = () => {
    let location = useLocation();
    return (
        <div className={'w-full h-screen py-[31px] 2xl:py-[42px] bg-lightPrimaryColor dark:bg-darkPrimaryColor border-r border-lightGrayColor dark:darkGrayColor'}>
            <div className={'mx-auto flex justify-start items-center gap-x-[3px]'}>
                {/* <img src={logo} alt="" className={'w-[53px] 2xl:w-[71px]'}/> */}
                <p className={'text-base 2xl:text-[22px] leading-[27px] px-[20px] 2xl:px-[20px]'}>
                    <span className={'text-red-600 text-2xl font-semibold'}>CRAW</span>
                    <span className={'text-black dark:text-white mx-[10px] 2xl:mx-[10px] text-xs'}>Security</span>
                </p>
            </div>

            {/* Menu Section start */}
            <div className={"mt-[52px] 2xl:mt-[70px]"}>
                <ul>
                    <li className={"mb-[18px] 2xl:mb-6"}>
                        <Link to={route.DASHBOARD_PATH} className={"group sideBarNavItem " + (location.pathname === route.DASHBOARD_PATH ? 'bg-lightBlue1 dark:bg-darkBlue1' : 'hover:bg-lightBlue1 dark:hover:bg-darkBlue1')}>
                            <DashboardIcon fill={"fill-black dark:fill-white " + (location.pathname === route.DASHBOARD_PATH ? 'fill-lightBlue2 dark:fill-darkBlue2' : 'group-hover:fill-lightBlue2 dark:group-hover:fill-darkBlue2')}/>
                            <span className={"dark:text-white " + (location.pathname === route.DASHBOARD_PATH ? 'text-lightBlue2 dark:text-darkBlue2': 'group-hover:text-lightBlue2 dark:group-hover:text-darkBlue2')}>Dashboard</span>
                        </Link>
                    </li>
                    <li className={"mb-[18px] 2xl:mb-6"}>
                        <Link to={route.ALLCLIENTS_PATH} className={"group sideBarNavItem " + (location.pathname === route.ALLCLIENTS_PATH ? 'bg-lightBlue1 dark:bg-darkBlue1' : 'hover:bg-lightBlue1 dark:hover:bg-darkBlue1')}>
                            <MarketsIcon fill={"fill-black dark:fill-white " + (location.pathname === route.ALLCLIENTS_PATH ? 'fill-lightBlue2 dark:fill-darkBlue2' : 'group-hover:fill-lightBlue2 dark:group-hover:fill-darkBlue2')}/>
                            <span className={"dark:text-white " + (location.pathname === route.ALLCLIENTS_PATH ? 'text-lightBlue2 dark:text-darkBlue2': 'group-hover:text-lightBlue2 dark:group-hover:text-darkBlue2')}>Clients</span>
                        </Link>
                    </li>
                    <li className={"mb-[18px] 2xl:mb-6"}>
                        <Link to={route.REGISTER_PATH} className={"group sideBarNavItem " + (location.pathname === route.REGISTER_PATH ? 'bg-lightBlue1 dark:bg-darkBlue1' : 'hover:bg-lightBlue1 dark:hover:bg-darkBlue1')}>
                            <TransactionIcon fill={"fill-black dark:fill-white " + (location.pathname === route.REGISTER_PATH ? 'fill-lightBlue2 dark:fill-darkBlue2' : 'group-hover:fill-lightBlue2 dark:group-hover:fill-darkBlue2')}/>
                            <span className={"dark:text-white " + (location.pathname === route.REGISTER_PATH ? 'text-lightBlue2 dark:text-darkBlue2': 'group-hover:text-lightBlue2 dark:group-hover:text-darkBlue2')}>Transactions</span>
                        </Link>
                    </li>
                    <li className={"mb-[18px] 2xl:mb-6"}>
                        <Link to={route.PROFILE_PATH} className={"group sideBarNavItem " + (location.pathname === route.PROFILE_PATH ? 'bg-lightBlue1 dark:bg-darkBlue1' : 'hover:bg-lightBlue1 dark:hover:bg-darkBlue1')}>
                            <ProfileIcon fill={"fill-black dark:fill-white " + (location.pathname === route.PROFILE_PATH ? 'fill-lightBlue2 dark:fill-darkBlue2' : 'group-hover:fill-lightBlue2 dark:group-hover:fill-darkBlue2')}/>
                            <span className={"dark:text-white " + (location.pathname === route.PROFILE_PATH ? 'text-lightBlue2 dark:text-darkBlue2': 'group-hover:text-lightBlue2 dark:group-hover:text-darkBlue2')}>Profile</span>
                        </Link>
                    </li>
                    <li className={"mb-[18px] 2xl:mb-6"}>
                        <Link to={route.SETTINGS_PATH} className={"group sideBarNavItem " + (location.pathname === route.SETTINGS_PATH ? 'bg-lightBlue1 dark:bg-darkBlue1' : 'hover:bg-lightBlue1 dark:hover:bg-darkBlue1')}>
                            <SettingsIcon fill={"fill-black dark:fill-white " + (location.pathname === route.SETTINGS_PATH ? 'fill-lightBlue2 dark:fill-darkBlue2' : 'group-hover:fill-lightBlue2 dark:group-hover:fill-darkBlue2')}/>
                            <span className={"dark:text-white " + (location.pathname === route.SETTINGS_PATH ? 'text-lightBlue2 dark:text-darkBlue2': 'group-hover:text-lightBlue2 dark:group-hover:text-darkBlue2')}>Setting</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <hr/>
            <div className={"mt-[22px] 2xl:mt-[30px]"}>
                <ul>
                    <li className={"mb-[18px] 2xl:mb-6"}>
                        <Link to={route.HELP_PATH} className={"group sideBarNavItem " + (location.pathname === route.HELP_PATH ? 'bg-lightBlue1 dark:bg-darkBlue1' : 'hover:bg-lightBlue1 dark:hover:bg-darkBlue1')}>
                            <HelpIcon fill={"fill-black dark:fill-white " + (location.pathname === route.HELP_PATH ? 'fill-lightBlue2 dark:fill-darkBlue2' : 'group-hover:fill-lightBlue2 dark:group-hover:fill-darkBlue2')}/>
                            <span className={"dark:text-white " + (location.pathname === route.HELP_PATH ? 'text-lightBlue2 dark:text-darkBlue2': 'group-hover:text-lightBlue2 dark:group-hover:text-darkBlue2')}>Help</span>
                        </Link>
                    </li>
                    <li className={""}>
                        <Link to={route.AUTH_PATH} className={"group sideBarNavItem " + (location.pathname === route.AUTH_PATH ? 'bg-lightBlue1 dark:bg-darkBlue1' : 'hover:bg-lightBlue1 dark:hover:bg-darkBlue1')}>
                            <LogoutIcon fill={"fill-black dark:fill-white " + (location.pathname === route.AUTH_PATH ? 'fill-lightBlue2 dark:fill-darkBlue2' : 'group-hover:fill-lightBlue2 dark:group-hover:fill-darkBlue2')}/>
                            <span className={"dark:text-white " + (location.pathname === route.AUTH_PATH ? 'text-lightBlue2 dark:text-darkBlue2': 'group-hover:text-lightBlue2 dark:group-hover:text-darkBlue2')}>Log Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar
