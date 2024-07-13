import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from"../../../assets/Images/TimelineImage.png";
const timeline=[
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority",
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skills",
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution",
    },
]

const TimelineSection=()=>
{
    return(
        <div>
            <div className="flex flex-row gap-x-15 items-center">
                <div className="w-[45%] flex flex-col gap-12">
                {
                    timeline.map((element,index)=>{
                        return(
                            <div className="flex relative flex-row gap-6" key={index}>
                                <div className=" flex justify-center items-center bg-white rounded-full w-[50px] h-[50px]">
                                    <img src={element.Logo} alt="" />
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                    <p className="text-base">{element.Description}</p>
                                </div>
                                
                               {
                                    timeline.length-1 !== index && 
                                    <div className=' absolute h-[2.625rem] w-[0.0625rem] bg-[#AFB2BF]
                                    translate-y-[110%] left-[5.5%] 
                                    '> </div>
                               }
                            </div>
                        )
                    })
                }
                </div>
                <div className="relative shadow-blue-200">
                    <img src={timelineImage} 
                    alt="timelineImage"
                    className="shadow-[-5px_-5px_20px_0px_#118AB2] object-cover h-fit"
                    />

                    <div className="absolute bg-caribbeangreen-700 flex text-white uppercase py-8
                    left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300
                        px-7">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-caribbeangreen-300 text-sm">Years of Experience</p>
                        </div>

                        <div className="flex gap-5 items-center px-7">
                            <p className="text-3xl font-bold">250</p>
                            <p className="text-caribbeangreen-300 text-sm">Type of Courses</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TimelineSection;