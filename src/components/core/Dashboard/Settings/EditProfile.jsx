import { updateProfile } from '../../../../services/operations/settingApis';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const genders = [
    "Male", "Female", "Other"
]

function EditProfile(props) {
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {errors}} = useForm(
        {defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
            about: user?.additionalDetails?.about || "",
            gender: user?.additionalDetails?.gender || "",
            contactNumber: user?.additionalDetails?.contactNumber || "",
        }}
    );

    const onSubmit = async (data) => {
        dispatch(updateProfile(data,token,navigate));
    }
    

    return (
        <div className=' bg-richblack-800 flex justify-between items-start px-6 py-6 rounded-lg'>
            <div className=' flex flex-col justify-start items-start gap-8 w-full'>
                <p className='text-richblack-5 text-xl font-semibold'>Profile Information</p>
                
                <form onSubmit={handleSubmit(onSubmit)}
                    className=' grid grid-cols-1 lg:grid-cols-2 w-full gap-4'
                >

                    <div className=' flex flex-col items-start justify-center gap-1'>
                        <label className=' text-richblack-300 text-base'
                            htmlFor={"firstName"}>
                            First Name
                        </label>
                        <input
                            id='firstName'
                            name="firstName"
                            placeholder="Enter First Name"
                            {...register("firstName", { required: true})}
                            className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
                        {
                            errors.firstName && 
                            <span className='mt-2 text-sm text-destructive' >
                                Please enter First Name
                            </span>
                        }
    
                    </div>

                    <div className=' flex flex-col items-start justify-center gap-1'>
                        <label className=' text-richblack-300 text-base'
                            htmlFor={"lastName"}>
                            Last Name
                        </label>
                        <input
                            id='lastName'
                            name="lastName"
                            placeholder="Enter Last Name"
                            {...register("lastName", { required: true})}
                            className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
                        {
                            errors.lastName && 
                            <span className='mt-2 text-sm text-destructive' >
                                Please enter Last Name
                            </span>
                        }
                    </div>
                   
                    <div className=' flex flex-col items-start justify-center gap-1'>
                        <label className=' text-richblack-300 text-base'
                            htmlFor={"dateOfBirth"}>
                            Date Of Birth
                        </label>
                        <input
                            id='dateOfBirth'
                            name="dateOfBirth"
                            type='date'
                            placeholder="Enter First Name"
                            max={Date.now}
                            {...register("dateOfBirth",
                            {
                                max: {
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of Birth cannot be in the future.",
                                },
                            })}
                            className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
                        {
                            errors.dateOfBirth && 
                            <span className='mt-2 text-sm text-destructive' >
                                {errors.dateOfBirth.message}
                            </span>
                        }
                    </div>
                    
                    <div className=' flex flex-col items-start justify-center gap-1'>
                        <label className=' text-richblack-300 text-base'
                            htmlFor={"gender"}>
                            Gender
                        </label>
                        <select
                            type="text"
                            name="gender"
                            id="gender"
                            placeholder="select gender"
                            {...register("gender")}
                            className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        >
                            {genders.map((ele, i) => {
                                return (
                                    <option key={i} value={ele}>
                                        {ele}
                                    </option>
                                )})
                            }
                        </select>
                    </div>

                    <div className=' flex flex-col items-start justify-center gap-1'>
                        <label className=' text-richblack-300 text-base'
                            htmlFor={"contactNumber"}>
                            Contact Number
                        </label>
                        <input
                            id='contactNumber'
                            name="contactNumber"
                            type='number'
                            placeholder="Enter Contact Number"
                            {...register("contactNumber", 
                                { required: true,
                                    maxLength: {value: 10, message: "Invalid Phone Number"},
                                    minLength: {value: 8, message: "Invalid Phone Number"},
                                }
                            )}
                            className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
                        {
                            errors.contactNumber && 
                            <span className='mt-2 text-sm text-destructive' >
                                {errors.contactNumber.message}
                            </span>
                        }
                    </div>

                    <div className=' flex flex-col items-start justify-center gap-1'>
                        <label className=' text-richblack-300 text-base'
                            htmlFor={"about"}>
                            About
                        </label>
                        <input
                            id='about'
                            name="about"
                            type='text'
                            placeholder="Write something about yourself"
                            {...register("about")}
                            className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
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
                                    Save
                        </button>

                    </div>
                </form>

            </div>
            
        </div>
    );
}

export default EditProfile;