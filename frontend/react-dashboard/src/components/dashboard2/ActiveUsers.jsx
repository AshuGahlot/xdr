import React from 'react'
import Circle from 'react-circle'

function ActiveUsers() {
  return (
    <div className={"h-auto w-auto dark:text-white text-black sm:grid sm:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4 gap-x-[18px] gap-y-[18px] 2xl:gap-x-[25px]"}>

        <div className={'dashboardCard col-span-1'}>
            <div className={'h-auto w-full flex justify-center flex-wrap py-6'}>
                <Circle progress={78} size={150} progressColor={'red'} textColor="grey" lineWidth={30}/>
            </div>
            <div className={'py-4 px-2 lg:px-6'}>
                <h3 className={'pb-4'}>Active Users : </h3>
                <h3>Disconnected Users : </h3>
            </div>
        </div>

        <div className={'dashboardCard col-span-3 '}>
            <div className={'flex justify-center'}>
                <div className={'h-auto w-full text-center flex items-center flex-col py-6 px-4 '}>
                    <Circle progress={35} size={100} progressColor={'blue'} textColor="grey" lineWidth={20}/>
                    <div className={'w-full pt-8'}>
                        <h3 className={'pb-4'}>vulnarabilities</h3>
                        <h1>-</h1>
                    </div>
                </div>

                <div className={'h-auto w-full text-center flex items-center flex-col py-6 px-4'}>
                    <Circle progress={65} size={100} progressColor={'skyblue'} textColor="grey" lineWidth={20}/>
                    <div className={'w-full pt-8'}>
                        <h3 className={'pb-4'}>Attacks</h3>
                        <h1>-</h1>
                    </div>
                </div>

                <div className={'h-auto w-full text-center flex items-center flex-col py-6 px-4'}>
                    <Circle progress={89} size={100} progressColor={'green'} textColor="grey" lineWidth={20}/>
                    <div className={'w-full pt-8'}>
                        <h3 className={'pb-4'}>Critical</h3>
                        <h1>-</h1>
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default ActiveUsers;