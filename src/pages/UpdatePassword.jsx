import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/operations/authApis";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const UpdatePassword=()=>
{
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:"",

    })
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const {loading}=useSelector((state)=>state.auth);
    const location=useLocation();
    const {password,confirmPassword}=formData;
    const dispatch=useDispatch();
    const handlerOnChange=(e)=>
        {
            setFormData((prevData)=>(
                {
                    ...prevData,
                    [e.target.name] : e.target.value,
                }
            ))
        }
    
    const handleOnSubmit=(e)=>
        {
            e.preventDefault();
            const token=location.pathname.split('/').at(-1);
            dispatch(resetPassword(password,confirmPassword,token));
        }
    return(
        <div className=' flex justify-center items-center my-auto'>
            {
              loading ? 
              (
                <div className="flex justify-center items-center">
                    Loading....
                </div>
              )
              :
              (
                <div className=' flex flex-col w-9/12 sm:w-6/12 lg:w-4/12 mx-auto gap-7 lg:px-8'>
                    <h1 className=' flex text-3xl text-richblack-5 font-semibold text-center mx-auto'>Choose new Password</h1>
                    <p className=' text-richblack-100 text-base'>Almost done.Enter your new password and your are all set</p>
                    <form onSubmit={handleOnSubmit}
                         className=' flex flex-col items-start justify-center gap-6 w-full'>
                        <label className=' text-richblack-300 text-base '
                             htmlFor={"password"}>
                            New Password {" "}<sup className='text-[red]'>*</sup>
                            <input
                            
                                required
                                type={
                                    showPassword ? "text" : "password"
                                }
                                name='password'
                                value={password}
                                onChange={handlerOnChange}
                                placeholder="Password"
                                className=' px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                                style={
                                    {
                                        boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                    }
                                }
                            />
                            <span
                                onClick={()=> setShowPassword((prev)=>!prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    showPassword ? <AiFillEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiFillEye fontSize={24} fill="#AFB2BF"/>
                                }
                            </span>
                        </label>

                        <label className=' text-richblack-300 text-base'>
                            Confirm Password {" "}<sup className='text-[red]'>*</sup>
                            <input
                            
                                required
                                type={
                                    showConfirmPassword ? "text" : "password"
                                }
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handlerOnChange}
                                placeholder="Confirm Password"
                                className=' px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                                style={
                                    {
                                        boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                    }
                                }
                            />
                            <span
                                onClick={()=> setShowConfirmPassword((prev)=>!prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    showConfirmPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>
                                }
                            </span>
                        </label>

                        <button type='submit'
                            className='w-full text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2
                            hover:scale-95 transition-all duration-200 bg-yellow-50 text-black'
                        >
                            Reset Password
                        </button>
                    </form>
                    <div>
                            <Link to="/login" className=' flex text-richblack-5 text-base items-center gap-2'>
                                    <p>Back to Login</p>
                            </Link>
                    </div>
                </div>
              )
            }
        </div>
    )
}

export default UpdatePassword