import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import IconBtn from "../../common/IconBtn";
import { MdEditSquare } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { formatDate } from "../../../utilis/dateFormater";
function MyProfile(props)
{
    const {user}=useSelector(state=> state.profile);
    const navigate = useNavigate();

    return(
        <div className=' flex flex-col gap-8'>
            <h1 className=' text-richblack-5 text-4xl font-semibold'>
                My Profile
            </h1>
            {/* section 1 */}
            <div  className=' bg-richblack-800 flex justify-between items-start px-6 py-6 rounded-lg'>
                <div className=' flex justify-start items-center gap-2 w-full'>
                            <Avatar>
                                <AvatarImage src={user?.image} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className=' flex flex-col items-start justify-center'>
                                <p className=' text-richblack-5 text-xl font-semibold'>{user?.firstName} {" "} { user?.lastName}</p>
                                <p className=' text-base text-richblack-300'>{user?.email}</p>
                            </div>
                </div>
                <div>
                            <button
                                className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                                bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                                style={
                                    {
                                        boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                                    }
                                }
                                onClick={ () => navigate("/dashboard/settings")}
                            >
                                Edit <MdEditSquare />
                            </button>
                </div>
            </div>
            
            {/* section 2 */}
            <div className=' bg-richblack-800 flex justify-between items-start px-6 py-6 rounded-lg'>
                        <div className=' flex flex-col justify-start items-start gap-8 w-full'>
                            <p className='text-richblack-5 text-xl font-semibold'>About</p>
                            <p className=' text-richblack-300'>
                                {
                                    user?.additionalDetails?.about ?? "Write something about yourself..."
                                }
                            </p>
                        </div>
                        <div>
                            <button
                                className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                                bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                                style={
                                    {
                                        boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                                    }
                                }
                                onClick={ () => navigate("/dashboard/settings")}
                            >
                                Edit <MdEditSquare />
                            </button>
                        </div>
                    </div>


            {/* section 3 */}
            <div className=' bg-richblack-800 flex justify-between items-start px-6 py-6 rounded-lg'>
                        <div className=' flex flex-col justify-start items-start gap-8 w-full'>
                            <p className='text-richblack-5 text-xl font-semibold'>Personal Details</p>
                            <div className=' grid lg:grid-cols-2 grid-cols-1 w-full gap-6'>
                                <div>
                                    <p className=' text-richblack-600 text-sm'>First Name</p>
                                    <p className=' text-richblack-5 text-base'>{user?.firstName ?? "-"}</p>
                                </div>
                                <div>
                                    <p className=' text-richblack-600 text-sm'>Last Name</p>
                                    <p className=' text-richblack-5 text-base'>{user?.lastName ?? "-"}</p>
                                </div>
                                <div>
                                    <p className=' text-richblack-600 text-sm'>Email</p>
                                    <p className=' text-richblack-5 text-base'>{user?.email ?? "-"}</p>
                                </div>
                                <div>
                                    <p className=' text-richblack-600 text-sm'>Contact Number</p>
                                    <p className=' text-richblack-5 text-base'>{user?.additionalDetails?.contactNumber ?? "Add Contct Number"}</p>
                                </div>
                                <div>
                                    <p className=' text-richblack-600 text-sm'>Gender</p>
                                    <p className=' text-richblack-5 text-base'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                                </div>
                                <div>
                                    <p className=' text-richblack-600 text-sm'>Date Of Birth</p>
                                    <p className=' text-richblack-5 text-base'>{user?.additionalDetails?.dateOfBirth ? (formatDate(user?.additionalDetails?.dateOfBirth).split("|").at(0)) : "Add Date Of Birth"}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                                bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                                style={
                                    {
                                        boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                                    }
                                }
                                onClick={ () => navigate("/dashboard/settings")}
                            >
                                Edit <MdEditSquare />
                            </button>
                        </div>
                    
            </div>
            
        </div>
    )

}

export default MyProfile;