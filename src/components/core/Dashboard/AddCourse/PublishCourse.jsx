import { editCourseDetails } from '../../../../services/operations/courseDetailsApis';
import { resetCourseState, setStep } from '../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../utilis/constants';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PublishCourse(props) {
    const { course, editCourse } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();


    useEffect( () => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true);
        }
    },[]);

    function goToCourses() {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async() => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
            course?.status === COURSE_STATUS.DRAFT && getValues("public") === false){
                // no updation so go to course 
                goToCourses();
                return;
            }
        
        // publish course
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);
        
       // console.log(getValues("public"));
        const result = await editCourseDetails(formData,token);

        if(result){
            goToCourses();
        }

    }

    const onSubmit = (data) => {
        handleCoursePublish();
    }  

    return (
        <div className=' flex flex-col gap-4 bg-richblack-800 border-2 border-richblack-700 rounded-md p-4'
        >
            <h1 className='text-2xl font-semibold text-richblack-5'
            >Publish Course</h1>
            <form onSubmit={handleSubmit(onSubmit)}
            className=' flex flex-col px-6 gap-6'
                >
                <div className=' flex items-center justify-start gap-2'>
                    <input type="checkbox" name="public" id="public" 
                        {...register("public")}
                    />
                    <label htmlFor="public"
                        className=' text-richblack-5'
                    >
                        Make this Course as Public
                    </label>
                </div>
                <div className=' flex items-center gap-2 justify-end'>
                    <button
                        className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                        bg-richblack-300 text-black hover:scale-95 transition-all duration-200"
                        style={
                            {
                                boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                            }
                        }
                        onClick={ () => dispatch(setStep(2))}
                    >
                        Back 
                    </button>

                    <button
                    type='submit'
                        className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                        bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                        style={
                            {
                                boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                            }
                        }
                    >
                        Next 
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PublishCourse;