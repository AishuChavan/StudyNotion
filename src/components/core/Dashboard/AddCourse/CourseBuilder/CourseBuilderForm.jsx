import { createSection, updateSection } from '../../../../../services/operations/courseDetailsApis';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';

function CourseBuilderForm(props) {
    const { course, editCourse } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [editSection, setEditSection] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        let result;
        if(editSection){
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSection,
                courseId: course?._id
            },token);
        }else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course?._id
            },token)
            //console.log("result of the csection create ",result);
            
        }
        if(result)
        {
            dispatch(setCourse(result));
            setValue("sectionName","");
            setEditSection(null);
        }
    }

    const handleChangeEditSectionName = (sectionId,sectionName) => {
        if(editSection === sectionId){
            setEditSection(null);
            setValue("sectionName", "");
            return ;
        }
        setEditSection(sectionId);
        setValue("sectionName", sectionName);

    }

    const goNext = () => {
        if(course?.coursesContent?.length === 0){
            toast.error("Please add atleast one Section");
            return ;
        }
        if(course?.coursesContent?.some( (section) => section.subSection.length === 0)){
            toast.error("Every subsection should contain atleast one Lecture");
            return ;    
        }
        dispatch(setStep(3));

    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}
                className=' flex flex-col gap-4 bg-richblack-800 border-2 border-richblack-700 rounded-md p-4'
            >
                <div className=' flex flex-col items-start justify-center gap-1'>
                    <label className=' text-richblack-300 text-base'
                        htmlFor={"sectionName"}>
                        Section Name <sup className=' text-destructive'>*</sup>
                    </label>
                    <input
                        id='sectionName'
                        name="sectionName"
                        placeholder="Enter Section Name"
                        {...register("sectionName", { required: true })}
                        className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                        style={
                            {
                                boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                            }
                        }
                    />
                    {
                        errors.sectionName &&
                        <span className='mt-2 text-sm text-destructive' >
                            Please enter section name
                        </span>
                    }
                </div>

                <div className=' flex items-center gap-2 justify-start'> 
                    <button
                        type='submit'
                        className=" text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                        border border-yellow-50 text-yellow-50 hover:scale-95 transition-all duration-200 w-fit"
                    
                    >
                        {editSection ? "Edit Section Name" : "Create Section"} <IoIosAddCircleOutline className=' flex justify-center items-center text-lg' /> 
                    </button>
                    {
                        editSection &&
                        <button
                            onClick={() => {
                                setEditSection(false);
                                setValue("sectionName", "");
                            }}
                            className=" text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                            text-richblack-300 hover:scale-95 transition-all duration-200 underline"
                        >
                            Cancel Edit
                        </button>
                    }
                </div>
                
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
                
                <div className=' flex items-center gap-2 justify-end'>
                    <button
                        onClick={() => {
                            dispatch(setStep(1));
                            dispatch(setEditCourse(true));
                        }}
                        className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                        bg-richblack-300 text-black hover:scale-95 transition-all duration-200"
                        style={
                            {
                                boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                            }
                        }
                    >
                        Back 
                    </button>

                    <button
                        className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                        bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                        style={
                            {
                                boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                            }
                        }
                        onClick={goNext}
                    >
                        Next <MdOutlineArrowForwardIos className=' flex justify-center items-center' />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CourseBuilderForm;