import React from 'react'
import {getUserEnrolledCourses} from "../../../../services/operations/profileApis"
import { useEffect,useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from 'react-redux';
import CourseTable from './CourseTable';
import { useDispatch } from 'react-redux';
function EnrolledCourses(props) {
    const {token} = useSelector( state => state.auth);
    const { loading } = useSelector( state => state.profile);
    const [enrolledCourses,setEnrolledCourses] = useState([]);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getUserEnrolledCourses(token,setEnrolledCourses));
    },[]);

    
    return (
        <div>
            {
                loading ? 
                <p className=' text-4xl text-richblack-5 flex justify-center items-center'> Loading....</p> :
                (
                    <div>
                        <h1 className=' text-richblack-5 text-4xl border-b border-b-richblack-700 py-4'>Enrolled Courses</h1>
                        {
                            enrolledCourses.length === 0 ? 
                            <div className=' flex w-full h-full justify-center items-center text-xl text-richblack-5 mt-10'>
                                You have not enrolled in any course yet.
                            </div> : 
                            (
                                <div>
                                    <CourseTable enrolledCourses={enrolledCourses}/>
                                </div>
                            )
                        }

                    </div>
                )
            }
        </div>
    );
}

export default EnrolledCourses;