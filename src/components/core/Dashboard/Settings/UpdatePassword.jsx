import { changePassword, updateProfile } from '../../../../services/operations/settingApis';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const genders = [
    "Male", "Female", "Other"
]

function UpdatePassword(props) {
    const [passwordStates, setPasswordStates] = useState( {
        old: false,
        new: false,
        confirmNew: false
    })
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
       // console.log(data);
        
        if(data.newPassword !== data.confirmNewPassword)
            toast.error("Passwords Not Matching")
        else
            dispatch(changePassword(data,token,navigate));
    }
    
    // oldPassword, newPassword, confirmNewPassword
    return (
        <div className=' bg-richblack-800 flex justify-between items-start px-6 py-6 rounded-lg'>
            <div className=' flex flex-col justify-start items-start gap-8 w-full'>
                <p className='text-richblack-5 text-xl font-semibold'>Profile Information</p>
                
                <form onSubmit={handleSubmit(onSubmit)}
                    className=' grid grid-cols-1 lg:grid-cols-2 w-full gap-4'
                >

                    <div className=' relative flex flex-col items-start justify-center gap-1 lg:col-span-2 lg:w-[49%]'>
                        <label className=' text-richblack-300 text-base '
                            htmlFor={"oldPassword"}>
                            Old Password <sup className=' text-destructive'>*</sup>
                            <span
                            onClick={() => setPasswordStates({...passwordStates, old: !passwordStates.old})}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                passwordStates.old ? 
                                (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : 
                                (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )
                            }
                        </span>
                        </label>
                        <input
                            type={`${!passwordStates.old ? "password" : "text"}`}
                            id='oldPassword'
                            name="oldPassword"
                            placeholder="Enter Old Password"
                            {...register("oldPassword", { required: true})}
                            className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
                        {
                            errors.oldPassword && 
                            <span className='mt-2 text-sm text-destructive' >
                                Please fill this field
                            </span>
                        }
    
                    </div>

                    <div className=' flex flex-col items-start justify-center gap-1 relative'>
                        <label className=' text-richblack-300 text-base'
                            htmlFor={"newPassword"}>
                            New Password <sup className=' text-destructive'>*</sup>
                            <span
                            onClick={() => setPasswordStates({...passwordStates, new: !passwordStates.new})}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                passwordStates.new ? 
                                (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : 
                                (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )
                            }
                        </span>
                        </label>
                        <input
                            id='newPassword'
                            name="newPassword"
                            type={`${!passwordStates.new ? "password" : "text"}`}
                            placeholder="Enter New Password"
                            {...register("newPassword", { required: true})}
                            className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
                        {
                            errors.newPassword && 
                            <span className='mt-2 text-sm text-destructive' >
                               Please fill this field
                            </span>
                        }
    
                    </div>

                    <div className=' flex flex-col items-start justify-center gap-1 relative'>
                        <label className=' text-richblack-300 text-base'
                            htmlFor={"confirmNewPassword"}>
                            Confirm New Password <sup className=' text-destructive'>*</sup>
                            <span
                                onClick={() => setPasswordStates({...passwordStates, confirmNew: !passwordStates.confirmNew})}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    passwordStates.confirmNew ? 
                                    (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : 
                                    (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )
                                }
                            </span>
                        </label>
                        <input
                            type={`${!passwordStates.confirmNew ? "password" : "text"}`}
                            id='confirmNewPassword'
                            name="confirmNewPassword"
                            placeholder="Confirm New password"
                            {...register("confirmNewPassword", { required: true})}
                            className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
                        {
                            errors.confirmNewPassword && 
                            <span className='mt-2 text-sm text-destructive' >
                                Please fill this field
                            </span>
                        }
                    </div>
                   
                    <div className=' flex justify-end items-start lg:col-span-2 gap-4'>
                        <button
                            onClick={ () => navigate("/dashboard/my-profile")}
                            className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                            bg-richblack-700 text-white hover:scale-95 transition-all duration-200"
                            style={
                                {
                                    boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                            
                        >
                                    Cancel
                        </button>

                        <button
                                type='submit'
                                className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                                bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                                style={
                                    {
                                        boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                                    }
                                }
                            >
                                    Update
                        </button>

                    </div>
                </form>

            </div>
            
        </div>
    );
}

export default UpdatePassword;