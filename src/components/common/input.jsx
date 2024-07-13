import React, { useId } from 'react';

const Input = React.forwardRef( 

function Input({
    label,
    type = 'text',
    className = "",
    ...props
},ref){
    
    const id = useId();

    return(
        <div className=' flex flex-col items-start justify-center gap-1'>
            {
                label &&
                <label
                className=' text-richblack-300 text-base'
                htmlFor={id}
                >{label}</label>
            }
            <input 
            className={` px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full  ${className} `}
            type={type}
            id={id}
            ref={ref}
            {...props}
            style={
                {
                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                }
            }
            />

        </div>
    )
})

export default Input;