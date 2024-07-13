import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {COURSE_STATUS} from "../../../../utilis/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsApis";
import { setCourse } from "../../../../slices/courseSlice";
import {Table,Tbody,Thead,Tr,Td,Th} from "react-super-responsive-table"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from 'react-icons/fa6';
import { FiEdit2 } from 'react-icons/fi';
import { HiClock } from 'react-icons/hi2';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { formatDate } from "../../../../utilis/dateFormater";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../../ui/alert-dialog"
export default function CoursesTable({courses,setCourses})
{
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const [confirmationModal,setConfirmationModal]=useState(null);
    const {course}=useSelector((state)=>state.course)
   // console.log("coures is there ",courses);
    const TRUNCATE_LENGTH = 30;
    const handleCourseDelete=async(courseId)=>
        {
            setLoading(true);
            await deleteCourse({ courseId: courseId },token);
            const result=await fetchInstructorCourses(token);
            if(result)
                {
                    setCourses(result);
                }
            setConfirmationModal(null);
            setLoading(false);

        }
        //console.log("confirmation modal ",confirmationModal);

    return(
        <div className=' text-richblack-5'>
            <table className="rounded-xl border border-richblack-800 ">
                <thead>
                    <tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Courses
                        </th>
                        <th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Duration
                        </th>
                        <th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Price
                        </th>
                        <th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? 
                        <p>Loading</p> : 
                    (
                        courses.length === 0 ?
                            <div className=' flex w-full h-full justify-center items-center text-xl text-richblack-5 mt-10'>
                                You have not created any course yet.
                            </div> :

                            (
                                courses.map((course) => (
                                    <tr key={course._id}
                                        className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                                    >
                                        <td className=' flex flex-1 gap-x-4'>
                                            <img
                                                src={course?.thumbnail}
                                                alt={course?.courseName}
                                                className="h-[148px] w-[220px] rounded-lg object-cover"
                                                loading='lazy'
                                            />
                                            <div className="flex flex-col justify-between">
                                                <p className="text-lg font-semibold text-richblack-5">
                                                    {course.courseName}
                                                </p>
                                                <p className="text-xs text-richblack-300">
                                                    {course.courseDescription.split(" ").length >
                                                        TRUNCATE_LENGTH
                                                        ? course.courseDescription
                                                            .split(" ")
                                                            .slice(0, TRUNCATE_LENGTH)
                                                            .join(" ") + "..."
                                                        : course.courseDescription}
                                                </p>
                                                <p className="text-[12px] text-white">
                                                    Created: {formatDate(course.createdAt)}
                                                </p>
                                                {course.status === COURSE_STATUS.DRAFT ? (
                                                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                        <HiClock size={14} />
                                                        Drafted
                                                    </p>
                                                ) : (
                                                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                            <FaCheck size={8} />
                                                        </div>
                                                        Published
                                                    </p>
                                                )}
                                            </div>
                                        </td>

                                        <td className="text-sm font-medium text-richblack-100">
                                            2hr 30min
                                        </td>
                                        <td className="text-sm font-medium text-richblack-100">
                                            ₹{course.price}
                                        </td>

                                        <td className=" flex items-start text-sm font-medium text-richblack-100 ">
                                            <button
                                                onClick={() => {
                                                    navigate(`/dashboard/edit-course/${course._id}`)
                                                }}
                                                title="Edit"
                                                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                            >
                                                <FiEdit2 size={20} />
                                            </button>

                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <span className=" flex items-start px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]">
                                                        <RiDeleteBin6Line size={20} />
                                                    </span>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className=" bg-richblack-900">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className=" text-richblack-5 text-xl">Do you want to delete this course?</AlertDialogTitle>
                                                        <AlertDialogDescription className=" text-richblack-300 text-base">
                                                            All the data related to this course will be deleted.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel
                                                            className=" appearance-none	 text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2 
                                                            bg-richblack-800 text-white hover:scale-95 transition-all duration-200"
                                                            style={
                                                                {
                                                                    boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                                                }
                                                            }
                                                        >Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                                                            bg-destructive text-black hover:scale-95 transition-all duration-200"
                                                            style={
                                                                {
                                                                    boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                                                                }
                                                            }
                                                            onClick={() => dispatch(handleCourseDelete(course._id))}
                                                        >Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </td>
                                    </tr>
                                ))
                            )

                    )
                }
                </tbody>
            </table>
        </div>
    )
}


