
import react,{Fragment, useState, useEffect} from "react";
import usericon from "../../assets/images/usericon.svg";
import appicon from "../../assets/images/appicon.svg";
import huntingicon from "../../assets/images/huntingicon.svg";

const UserData = () => {

    return (
        <>
             <div className={'userdata'}>
                <div className={'cardTitle flex justify-between gap-x-[18px] 2xl:gap-x-[25px] h-[100px] 2xl:min-h-[150px]'}>
                   <div className={'dashboardCard userdataItems block w-[300px] 2xl:min-w-[340px] '}>
                        <div className={'w-auto 2xl:min-w-10 h-10 py-2 px-2'}>
                            <img src={usericon} alt="" className={"w-14 2xl:min-w-20"}/>
                        </div>
                   <h3 className={'py-4 w-full text-center'}>User</h3>
                   </div>

                   <div className={'dashboardCard userdataItems w-[300px] 2xl:min-w-[340px] '}>
                        <div className={'w-auto 2xl:min-w-10 h-10 py-2 px-2'}>
                            <img src={appicon} alt="" className={"w-14 2xl:min-w-20"}  />
                        </div>
                   <h3 className={' py-4 w-full text-center'}>Total Apps</h3>
                   </div>

                   <div className={'dashboardCard userdataItems w-[300px] 2xl:min-w-[340px] '}>
                        <div className={'w-auto 2xl:min-w-10 h-10 py-2 px-2'}>
                            <img src={huntingicon} alt="" className={"w-14 2xl:min-w-20"}  />
                        </div>
                   <h3 className={' py-4 w-full text-center'}>Total Hunting</h3>
                   </div>

                   <div className={'dashboardCard userdataItems w-[300px] 2xl:min-w-[340px] '}>
                        <div className={'w-auto 2xl:min-w-10 h-10 py-2 px-2'}>
                            <img src={huntingicon} alt="" className={"w-14 2xl:min-w-20"}  />
                        </div>
                   <h3 className={' py-4 w-full text-center'}>XDR Score</h3>
                   </div>
                </div>
            </div> 
        </>
    )
}
export default UserData;
