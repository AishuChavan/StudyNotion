import React from "react";
import CTAButton from "./Button";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";


const CodeBlocks =({
    position,heading,subheading,ctabtn1,ctabtn2,codeblock,bgGradient,codeColor
})=>
{
    return(
        <div className={`flex ${position} my-20 px-28 py-20  justify-between gap-12 bg-transparent`}>
            {/* Section 1 */}
            <div className="w-[50%] flex flex-col gap-8">
                {heading}
            
                <div className="text-richblack-300 font-bold mx-auto">
                    {subheading}
                </div>

                <div className='flex gap-7 mt-7'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                            {ctabtn2.btnText}
                    </CTAButton>
                </div>

            </div>

            {/* Section 2 */}
            <div className=' h-fit flex w-[100%] justify-center lg:w-[500px] py-4 relative'
                style={
                    {
                        border: "1px solid rgba(255, 255, 255, 0.22)",
                        background: "linear-gradient(112deg, rgba(14, 26, 45, 0.24) -1.4%, rgba(17, 30, 50, 0.38) 104.96%)",
                        backdropFilter: "blur(126px)"
                    }
                }
            >
                {/* Bg gradient */}
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>

                <div className= {`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor}`}>
                    <TypeAnimation
                        sequence={[codeblock,3000,""]}
                        repeat={Infinity}
                        cursor={true}
                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block",
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>
                <div className=' absolute -left-1 -right-4 w-80 h-64'
                    style={
                        {
                            borderRadius: "23.30931rem",
                            opacity: "0.2",
                            background: `${bgGradient}`,
                            filter: "blur(34px)"

                        }
                    }
                >
                </div>
            </div>


        </div>
    )
}

export default CodeBlocks