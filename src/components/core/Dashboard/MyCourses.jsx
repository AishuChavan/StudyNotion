import React from "react";
import { useNavigate } from "react-router-dom";
import {fetchInstructorCourses} from "../../../services/operations/courseDetailsApis"
import IconBtn from "../../common/IconBtn";
import { useState } from "react";
import { useSelector } from "react-redux";
import CoursesTable from "./InstructorCourses/CoursesTable";
import { useEffect } from "react";
const MyCourses=()=>
{
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [courses,setCourses]=useState([]);

    useEffect(()=>
    {
        const fetchCourses=async()=>
        {
            const result=await fetchInstructorCourses(token);
            if(result)
            {
                setCourses(result);
                
            }
        }
        fetchCourses();
    },[]);
    return(
        <div>
            <div>
                <h1>My Courses</h1>
                <IconBtn
                    text="Add Course"
                    onclick={()=>navigate("/dashboard/add-course")}
                    //ADD ICOn
                />
            </div>
            {
                courses && <CoursesTable courses={courses} setCourses={setCourses}  />
            } 
        </div>
    )
}

export default MyCourses