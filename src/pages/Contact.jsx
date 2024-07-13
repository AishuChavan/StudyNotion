import ContactUsForm from '../components/common/ContactUsForm';
import Footer from '../components/common/Footer';
import React from 'react';
import { FaMapLocation } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";



function Contact(props) {
    return (
        <div >
            <div className=' flex flex-col items-center'>    
                <div className='  w-9/12 mx-auto flex flex-col lg:flex-row lg:items-start mt-20 items-center justify-center gap-10'>
                    <div className=' lg:w-[40%]'>
                        <div className=' flex flex-col gap-8 h-fit  bg-richblack-800 px-8 py-8 rounded-lg'>
                            <div className=' flex items-start gap-2'>
                                <IoIosChatboxes className=' text-richblack-5 text-xl font-semibold'/>
                                <div className=' flex flex-col'>
                                    <h1 className=' text-richblack-5 text-lg font-semibold'>Chat on us</h1>
                                    <p className=' text-sm text-richblack-200'>Our friendly team is here to help.</p>
                                    <p className=' text-sm text-richblack-200'>@mail address</p>
                
                                </div>
                            </div>
                            <div className=' flex items-start gap-2'>
                                <FaMapLocation className=' text-richblack-5 text-xl font-semibold'/>
                                <div className=' flex flex-col'>
                                    <h1 className=' text-richblack-5 text-lg font-semibold'>Visit Us</h1>
                                    <p className=' text-sm text-richblack-200'>Come and say hello at our office HQ.</p>
                                    <p className=' text-sm text-richblack-200'>Here is the location/ address</p>
                                </div>
                            </div>
                            <div className=' flex items-start gap-2'>
                                <BiSolidPhoneCall className=' text-richblack-5 text-xl font-semibold'/>
                                <div className=' flex flex-col'>
                                    <h1 className=' text-richblack-5 text-lg font-semibold'>Call Us</h1>
                                    <p className=' text-sm text-richblack-200'>Mon - Fri From 8am to 5pm</p>
                                    <p className=' text-sm text-richblack-200'>+123 456 7890</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' lg:w-[60%] flex flex-col border border-richblack-600 gap-8 lg:p-14 p-4 md:p-8 rounded-lg'>
                        <div className=' flex flex-col gap-2'>
                            <h1 className=' text-4xl font-semibold text-richblack-5'>Got a Idea? We've got the skills. Let's team up</h1>
                            <p className=' text-sm text-richblack-300'>Tall us more about yourself and what you're got in mind.</p>
                        </div>
                        <ContactUsForm />
                    </div>
                </div>
                <div className=' mt-20'>
                    
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
