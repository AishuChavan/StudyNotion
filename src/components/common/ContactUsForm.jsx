import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {apiConnector} from "../../services/apiconnector";
import {contactUsEndpoint} from "../../services/apis";
import { useState } from "react";
import CountryCode from "../../data/countrycode.json"
import Input from "./input";
import toast from "react-hot-toast";
const ContactUsForm=()=>
    {
        const [loading,setLoading]=useState(false);
        const{
            register,
            handleSubmit,
            reset,
            formState:{errors,isSubmitSuccessful}
        }=useForm();

        useEffect(()=>
            {
                if(isSubmitSuccessful)
                    {
                        reset({
                            email:"",
                            firstname:"",
                            lastname:"",
                            message:"",
                            phoneNo:"",
                        })
                    }
            },[reset,isSubmitSuccessful]);

        const submitContactForm=async(data)=>
            {
                console.log("Logging Data",data);
                try{
                    setLoading(true);
                    const response=await apiConnector("POST",contactUsEndpoint.CONTACT_US_API,data);
                    console.log("Logging response",response);
                    setLoading(false);
                    toast.success("Form Submitted Successfully");
                }
                catch(error)
                {
                    console.log("Error ",error.message);
                    toast.dismiss("error.message");
                }
            }
        return(
           <form onSubmit={handleSubmit(submitContactForm)}
                className=' flex flex-col gap-6'
           >
                
                    {/* FirstName */}
                    <div className=' flex gap-4 flex-col lg:flex-row'>
                        <div className=' flex flex-col w-full'>
                            <label htmlFor="firstname" className=' text-richblack-300 text-base'>First Name</label>
                            <Input
                                type="text"
                                name="firstname"
                                id='firstname'
                                placeholder='Enter first name'
                                {...register("firstname",{required:true})}
                            />
                            {
                                errors.firstname && (
                                    <span className='mt-2 text-sm text-destructive'>Please enter your name</span>
                                )
                            }
                        </div>

                        {/* lastName */}
                        <div className=' flex flex-col w-full'>
                            <label htmlFor="lastname" className=' text-richblack-300 text-base'>Last Name</label>
                            <Input
                                type="text"
                                name="lasttname"
                                id='lastname'
                                placeholder='Enter Last name'
                                {...register("lastname")}
                            />
                            
                        </div>
                    </div>
                    {/* email */}
                    <div className=' flex flex-col'>
                        <label htmlFor="email" className=' text-richblack-300 text-base'>Email Address</label>
                        <Input
                            type='email'
                            name='email'
                            id='email'
                            placeholder="Enter email Address"
                            {...register("email",{required:true})}
                        />
                        {
                            errors.email && (
                                <span className='mt-2 text-sm text-destructive'>Please enter your email address</span>
                            )
                        }
                    </div>


                    {/* phone no */}
                  
                    <div className=' flex flex-col items-start justify-center gap-1 w-full'>
                        <label htmlFor='phonenumber' className=' text-richblack-300 text-base'>Phone Number</label>

                        <div className=' flex gap-2 w-full'>
                            {/* dropdown */}
                            
                                <select
                                    name='dropdown'
                                    id='dropdown'
                                    {...register("countrycode",{required:true})}
                                    className=' w-[12%] rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200'
                                    style={
                                        {
                                            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                        }
                                    }
                                >
                                {
                                    CountryCode.map((element,index)=>
                                    {
                                        return(
                                            <option key={index} value={element.code}>
                                                {element.code}-{element.country}
                                            </option>
                                        )
                                    })
                                }
                                </select>
                            

                            
                                <input
                                    type='number'
                                    name='phonenumber'
                                    id='phonenumber'
                                    placeholder="Enter Phone No"
                                    
                                    {...register("phoneNo",
                                        {
                                            required:{value:true,message:'Please enter Phone Number'},
                                            maxLength:{value:10 ,message:'Incalid Phone Number'},
                                            minLength:{value:8,message:'Invalid Phone Number'}

                                        })
                                    }
                                    className='w-full px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200'
                                    style={
                                        {
                                            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                        }
                                    }
                                />
                            
                        </div>
                        {
                            errors.phoneNo && 
                                <span className='mt-2 text-sm text-destructive'>
                                    {
                                    `${errors.phoneNo.message || "Please enter phone no"}`
                                    }
                                </span>
                            
                        }
                    </div>

                    


                    {/* message */}
                    <div className=' flex flex-col items-start justify-center gap-1'>
                        <label className=' text-richblack-300 text-base'
                        htmlFor='message'>Message</label>
                        <textarea
                            name='message'
                            id='message'
                            cols='30'
                            rows='7'
                            placeholder="Enter Your message here"
                            {...register("message",{required:true})}
                            className=' px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
                        {
                            errors.message && (
                                <span  className='mt-2 text-sm text-destructive'>Please enter message</span>
                            )
                        }
                    </div>

                
                <button
                    className=' text-center text-[14px] px-6 py-3 rounded-md font-bold flex 
                    justify-center items-center gap-2 bg-yellow-50 text-black
                    hover:scale-95 transition-all duration-200'
                    type="submit">
                        Send Message
                </button>
           </form>
        )
    }

export default ContactUsForm