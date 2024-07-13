import React from "react";
import { Link } from "react-router-dom";

const CTAButton=({children,active,linkto})=>
{
    return(
        <Link to="./signup">
            <div className={`text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2
                ${active ? ` bg-yellow-50 text-black` : ` bg-richblack-800 text-white`}
                hover:scale-95 transition-all duration-200
            `}
                style={
                    {
                        boxShadow: `${active ? "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset" : "-2px -2px 0px 0px rgba(255, 255, 255, 0.18) inset"}`
                    }
                }
            >
                {children}
            </div>
        </Link>
    )
}



export default CTAButton;