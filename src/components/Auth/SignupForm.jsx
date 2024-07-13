import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ConutryCode from "../../data/countrycode.json";
import { apiConnector } from '../../services/apiconnector';
import toast from 'react-hot-toast';
import Input from '../common/input';
import { ACCOUNT_TYPE } from '../../utilis/constants';
import Tab from '../common/Tab';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { sendOTP } from '../../services/operations/authApis';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData } from '../../slices/authSlice';

const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
]

function SignupForm(props) {
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();
    
    const submitHandler = async(data) => {
       // console.log(data);
        data = {
            ...data,
            accountType: accountType
        }

        dispatch(setSignupData(data));
        if(data.password === data.confirmPassword)
            dispatch(sendOTP(data,navigate));
        else
            toast.error("Password Doesn't Match.");
    }

    

    return (
        <div className=' flex flex-col'>
            <Tab tabData={tabData} field={accountType} setField={setAccountType} 
            />
            <form onSubmit={handleSubmit(submitHandler)}
                className=' flex flex-col gap-6'
            >
                <div className=' flex gap-4 flex-col lg:flex-row'>
                    <div className=' flex flex-col w-full'>
                        <Input 
                            label="First Name"
                            type="text"
                            placeholder="Enter first name"
                            {...register("firstName", { required: true})}
                        />
                        {
                            errors.firstName && 
                            <span className='mt-2 text-sm text-destructive'>
                                Please enter first name
                            </span>
                        }
                    </div>
                    <div className=' flex flex-col w-full'>
                        <Input 
                            label="Last Name"
                            type="text"
                            placeholder="Enter last name"
                            {...register("lastName")}
                        />
                    </div>
                </div>
                <div className=' flex flex-col'>
                    <Input 
                        label="Email"
                        type="text"
                        placeholder="Enter email address"
                        {...register("email", { required: true})}
                    />
                    {
                        errors.email && 
                        <span className='mt-2 text-sm text-destructive' >
                            Please enter valid email address
                        </span>
                    }
                </div>                    
                <div className=' flex gap-2 w-full'>
                    <div className=' flex flex-col  justify-center gap-1 w-full'>
                        <label className=' text-richblack-300 text-base relative'
                            htmlFor={"password"}>
                            Password
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    showPassword ? 
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
                            type={`${showPassword ? "text" : "password"}`}
                            id='password'
                            placeholder="Enter Password"
                            {...register("password", { required: true})}
                            className=' px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        >
                        </input>
                    
                        {
                            errors.password && 
                            <span className='mt-2 text-sm text-destructive' >
                                Please enter password
                            </span>
                        }
                    </div>
                    <div className=' flex flex-col  justify-center gap-1 w-full'>
                        <label className=' text-richblack-300 text-base relative'
                            htmlFor={"ConfirmPassword"}>
                            Confirm Password
                            <span
                                onClick={() => setConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    showConfirmPassword ? 
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
                            type={`${showConfirmPassword ? "text" : "password"}`}
                            id='ConfirmPassword'
                            placeholder="Enter Password"
                            {...register("confirmPassword", { required: true})}
                            className=' px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        >
                        </input>
                        {
                            errors.password && 
                            <span className='mt-2 text-sm text-destructive' >
                                Please enter confirm password
                            </span>
                        }
                    </div>
                </div>

                <button
                    className=' text-center text-[14px] px-6 py-3 rounded-md font-bold flex 
                    justify-center items-center gap-2 bg-yellow-50 text-black
                    hover:scale-95 transition-all duration-200'
                    type='submit'
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupForm;