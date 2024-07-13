import React from 'react'

const HighlightText=({text})=>
{
    return(
        <span 
        style={
            {
                background: "var(--Gradient-10, linear-gradient(118deg, #5433FF -4%, #20BDFF 51.26%, #A5FECB 106.52%))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",                    
            }
        }
        >
            {" "}
            {text}
            {" "}
        </span>
    )
}

export default HighlightText;