import React from "react";
import { useSelector } from "react-redux";
import {FaCheck} from "react-icons/fa"
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
const RenderSteps=()=>
{
        const {step}=useSelector((state)=>state.course);
        const steps=[
            {
                id:1,
                title:"Course Information",
            },
            {
                id:2,
                title:"Course Builder",
            }
            ,
            {
                id:3,
                title:"Publish"
            },
        ]
        return (
            <div className='  flex flex-col gap-4'>
                <div className=' grid grid-cols-3'>
                    {
                        steps.map( (item) => (
                            <div key={item.id}
                                className=' flex flex-col items-center justify-center gap-2 relative'
                            >
                                <div 
                                    className={
                                    ` flex justify-center items-center font-medium text-lg py-2 px-4 rounded-full border-2 text-richblack-300 bg-richblack-800 border-richblack-700
                                    ${step === item.id && "bg-yellow-900 border-yellow-50 text-yellow-50"}
                                    ${step > item.id && "bg-yellow-50 text-richblack-900 border-yellow-900"}`}
                                >
                                    {
                                        step > item.id ? <FaCheck /> : item.id
                                    }
                                </div>
    
                                <p
                                    className={
                                        ` text-richblack-300 text-center
                                        ${step >= item.id && " text-richblack-5"}`}
                                >
                                    {item.title}
                                </p>
    
                                {
                                    item.id !== 3 && 
                                    <p className={`absolute top-5 left-[60%] w-full font-semibold  border border-dashed
                                    ${step > item.id ? " border-yellow-50" : "border-richblack-600"}`}>
                                        
                                    </p>
                                }
                            </div>
                        ))
                    }
                </div>
                    {step === 1 && <CourseInformationForm />}
                    {step === 2 && <CourseBuilderForm /> }
                    {step === 3 && <PublishCourse /> }
            </div>
        );
}

export default RenderSteps;