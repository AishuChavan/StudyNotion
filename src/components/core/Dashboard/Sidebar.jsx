import React from "react";
import SidebarLinks from "./SidebarLinks";
import {Logout} from "../../../services/operations/authApis";
import {sidebarLinks} from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../ui/alert-dialog";


const Sidebar=()=>
{
    const {user,loading:profileLoading}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();

   




    if(profileLoading || authLoading)
    {
        return(
            <div className='mt-10'>
                Loading...
            </div>
        )
    }


    

    return (
        <div className='flex flex-col w-[15%]  border-r border-r-richblack-700 
         bg-richblack-800 py-10'>
            <div className=' flex flex-col'>
            {
                sidebarLinks.map((link) => {
                    if (link.type && user?.accountType !== link.type) return null
                    return (
                        <SidebarLinks key={link.id} link={link} iconName={link.icon} />
                    )
                })
            }
            </div>

            <div className=' h-[1px] w-[90%] mt-6 mb-6 bg-richblack-600 mx-auto'></div>

            <div className=' flex flex-col'>
                <SidebarLinks
                    link={{name: "Settings", path: "/dashboard/settings"}}
                    iconName="VscSettingsGear"
                />

                <AlertDialog>
                <AlertDialogTrigger className=' text-richblack-5 px-8 py-2 text-sm font-medium border-l-4 bg-opacity-0 border-l-transparent 
                hover:border-l-pink-25 hover:bg-pink-800 transition-all duration-100'>
                    <div className=' flex items-center gap-2'>
                        <LuLogOut className=" text-lg"/>
                        <span>Log Out</span>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent className=" bg-richblack-900">
                    <AlertDialogHeader>
                    <AlertDialogTitle className=" text-richblack-5 text-xl">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className=" text-richblack-300 text-base">
                        You will be logged out of your account.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel 
                        className=" appearance-none	 text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2 
                        bg-richblack-800 text-white hover:scale-95 transition-all duration-200"
                        style={
                            {
                                boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.18) inset"
                            }
                        }
                    >Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className=" appearance-none	 text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2
                        bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                        style={
                            {
                                boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                            }
                        }
                        onClick={ () => dispatch(Logout(navigate))}
                    >Logout</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default Sidebar;

