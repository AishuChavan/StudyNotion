import React from "react";
import HighlightText from "../HomePage/HighlightText";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
const Quote=()=>
    {
        return(
            <div className=' text-4xl text-center w-10/12 mx-auto leading-10 tracking-wide relative py-2'>
                We are passionate about revolutionizing the 
                way we learn. Our innovative platform 
                <HighlightText text={"combines technology"}/>
                , <span
                    style={
                        {
                            background: "var(--Gradient-06, linear-gradient(118deg, #FF512F -4.8%, #F09819 107.46%))",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",                    
                        }
                    } 
                  >
                    {" "}
                    expertise
                    {" "}
                </span>
                and community to create an
                <span
                    style={
                        {
                            background: "var(--Gradient-08, linear-gradient(118deg, #E65C00 -6.05%, #F9D423 106.11%))",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",                    
                        }
                    }
                >
                    {" "}
                    unparalleled educational experience.
                </span>
                <FaQuoteLeft className=' absolute top-1 -left-4 text-base text-richblack-600'/>
                <FaQuoteRight className=' absolute bottom-8 right-1 text-base text-richblack-600'/>
            </div>
        )
    }


export default Quote;