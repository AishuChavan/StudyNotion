import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Tab from '../common/Tab';
import {ACCOUNT_TYPE} from "../../utilis/constants"
import Input from '../common/input';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {login} from "../../services/operations/authApis"
import { useDispatch } from 'react-redux';

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

function LoginForm(props) {
    const [showPassword,setShowPassword] = useState(false);
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset, 
        formState:{errors,isSubmitSuccessful}
    } = useForm();


    const submitHandler = async(data) => {
        dispatch(login(data,navigate));   
    }

    return (
        <div>
            <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
            <form onSubmit={handleSubmit(submitHandler)}
                className=' flex flex-col gap-4'    
            >
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
                <div className=' flex flex-col  justify-center gap-1'>
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
                    <Link to="/forgot-password">
                        <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                            Forgot Password
                        </p>
                    </Link>
                </div>
                <button
                    className=' text-center text-[14px] px-6 py-3 rounded-md font-bold flex 
                    justify-center items-center gap-2 bg-yellow-50 text-black
                    hover:scale-95 transition-all duration-200'
                    type='submit'
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default LoginForm;