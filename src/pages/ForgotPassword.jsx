import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getResetPasswordToken } from "../services/operations/authApis";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
const ForgotPassword=()=>
    {
        const [emailSent,setEmailSent] = useState(false);
        const [email,setEmail]=useState("");
        const {loading}=useSelector((state)=>state.auth);
        const dispatch=useDispatch();
        const handleOnSubmit=(e)=>
            {
                e.preventDefault();
                dispatch(getResetPasswordToken(email,setEmailSent));
            }

        return(
            <div className=' flex items-center justify-center my-auto'>
                {
                    loading ? (
                        <div>
                            Loading ...
                        </div>
                    ) :
                    (
                        <div className=' flex flex-col w-9/12 sm:w-6/12 lg:w-4/12 mx-auto gap-7 lg:px-8'>
                            <h1 className=' flex text-3xl text-richblack-5 font-semibold text-center mx-auto'>
                                {
                                    !emailSent ? "Reset your Password":"Check Your Email"
                                }
                            </h1>
                            <p className=' text-richblack-100 text-base'>
                                {
                                    !emailSent ? "Have no fear. We'll email you instructions to reset your password.If you don't have access to your email we can try account recovery "
                                    : `We have sent the reset email to ${email}`
                                }
                            </p>
                            <form onSubmit={handleOnSubmit}
                                className=' flex flex-col items-start justify-center gap-6 w-full'
                            >
                                {
                                    !emailSent && (
                                        <div className=' flex flex-col items-start justify-center gap-1 w-full'>
                                            <label className=' text-richblack-300 text-base'
                                                htmlFor={"email"}>
                                                Email Address {" "} <sup className=' text-destructive text-[red]'>*</sup>
                                            </label>
                                            <input
                                                id='email'
                                                placeholder="Enter Your Email Address"
                                                type='email'
                                                name="email"
                                                value={email}
                                                onChange={ (e) => setEmail(e.target.value)}
                                                className=' px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                                                style={
                                                    {
                                                        boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                                    }
                                                }
                                            />
                                        </div>
                                    )
                                }
                                <button type="submit"
                                    className='w-full text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2
                                        hover:scale-95 transition-all duration-200 bg-yellow-50 text-black'
                                >
                                    {
                                        !emailSent ? 'Reset Password' : "Resend Email"
                                    }
                                </button>
                            </form>
                            <div>
                                <Link to="/login"
                                    className=' flex text-richblack-5 text-base items-center gap-2'
                                >
                                    <FaArrowLeftLong />
                                    <p>Back to Login</p>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

export default ForgotPassword;