import RenderSteps from "./RenderSteps"
import React from "react"


const AddCourse=()=>
{
    return (
        <div>
            <div className=' flex gap-4 flex-col-reverse lg:flex-row justify-center items-center lg:items-start'>
                <div className='w-full lg:w-[75%]'>
                    <h1>Add Course</h1>
                    <div>
                        <RenderSteps />
                    </div>
                </div>
                <div className=' rounded-md border border-richblack-600 bg-richblack-800 h-fit p-4 w-fit'>
                    <p className=' mb-8 text-lg text-richblack-5'>⚡Course Upload Tips⚡</p>
                    <ul className=' ml-5 list-item list-disc space-y-4 text-sm text-richblack-5'>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AddCourse