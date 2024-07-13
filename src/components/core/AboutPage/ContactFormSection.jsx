import React from "react";
import ContactUsForm from "../../common/ContactUsForm";
const ContactFormSection=()=>
    {
        return(
            <div className=' flex flex-col gap-8 mx-auto'>
            <div className=' flex flex-col text-center gap-2'>
                <h1 className=' text-4xl font-semibold'>Get in Touch</h1>
                <p className=' text-base text-richblack-300'>We'd love to here for you, Please fill out this form.</p>
            </div>
            <div>
                <ContactUsForm />
            </div>
        </div>
        )
    }


export default ContactFormSection