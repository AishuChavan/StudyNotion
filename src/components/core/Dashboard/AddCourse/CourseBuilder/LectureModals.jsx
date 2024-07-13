import React, { useEffect } from 'react';
import { MdOutlineEdit } from "react-icons/md";
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
} from "../../../../ui/alert-dialog"
import { IoIosCloseCircle } from "react-icons/io";

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsApis';
import { setCourse } from '../../../../../slices/courseSlice';
import Upload from '../Upload';
import { RxDropdownMenu } from 'react-icons/rx';
  

function LectureModals({
    modalData,
    add = false,
    view = false,
    edit = false
}) {
    const { course, editCourse } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm();

    useEffect( () => {
        if(view || edit){
            setValue("lectureTitle",modalData.title)
            setValue("lectureDesc",modalData.description)
            setValue("lectureVideo",modalData.videoUrl)
        }
        else{
            setValue("lectureTitle","")
            setValue("lectureDesc","")
            setValue("lectureVideo","")    
        }
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if( currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl )     
            return true;
        return false;
    }

    const handleEditSubSection = async() => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course?._id);
        formData.append("subSectionId",modalData._id);
        formData.append("sectionId",modalData.sectionId);

        if(currentValues.lectureTitle !== modalData.title)
            formData.append("title",currentValues.lectureTitle);
        if(currentValues.lectureDesc !== modalData.description)
            formData.append("title",currentValues.lectureDesc);
        if(currentValues.lectureVideo !== modalData.videoUrl)
            formData.append("video",currentValues.lectureVideo);

        const result = await updateSubSection(formData,token);

        if(result)
            dispatch(setCourse(result));

    }

    const onSubmit = async (data) => {
        if(view)
            return;
        if(edit){
            if(!isFormUpdated())
                toast.error("No changes made to the form");
            else{
                // edit the form 
                handleEditSubSection();
            }
            return ;
        }

        // create mode
        const formData = new FormData();
        formData.append("courseId", course?._id);
        formData.append("sectionId", modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDesc);
        formData.append("video",data.lectureVideo);

        const result = await createSubSection(formData,token);

        if(result){
            dispatch(setCourse(result));
        }
    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger >
                    {   add &&  <span className=' text-yellow-50 font-semibold cursor-pointer'
                                        >
                                + Add Lecture
                            </span>
                    }
                    {
                        edit && <MdOutlineEdit />
                    }
                    {
                        view && <div className=' flex items-center gap-2'>
                                    <RxDropdownMenu />
                                    {modalData?.title}
                                </div>
                    }
                </AlertDialogTrigger>
                    <AlertDialogContent className=" bg-richblack-800 border-0 -p-6">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="p-4 bg-richblack-700 rounded-t-md text-richblack-5 text-xl flex justify-between items-center">
                                {add && "Adding Lecture"} 
                                {edit && "Editing Lecture"} 
                                {view && "Viewing Lecture"} 
                                <AlertDialogCancel 
                                    className=" text-center text-3xl font-bold flex justify-center items-center gap-2 
                                    text-richblack-300 hover:scale-95 transition-all duration-200 rounded-full"
                                >
                                    <IoIosCloseCircle />
                                </AlertDialogCancel>
                            </AlertDialogTitle>
                                <AlertDialogDescription className="p-6 text-richblack-300 text-base">
                                    <form className=' flex flex-col gap-2'
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        
                                    <Upload
                                        name="lectureVideo"
                                        label="Lecture Video"
                                        register={register}
                                        setValue={setValue}
                                        errors={errors}
                                        video={true}
                                        editData={edit ? modalData.videoUrl : null}
                                        viewData={view ? modalData.videoUrl : null}
                                    />


                                        <div className=' flex flex-col items-start justify-center gap-1'>
                                            <label className=' text-richblack-300 text-base'
                                                htmlFor={"lectureTitle"}>
                                                Lecture Title <sup className=' text-destructive'>*</sup>
                                            </label>
                                            <input
                                                id='lectureTitle'
                                                name="lectureTitle"
                                                placeholder="Enter Lecture Title"
                                                {...register("lectureTitle", { required: true })}
                                                className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                                                style={
                                                    {
                                                        boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                                    }
                                                }
                                            />
                                            {
                                                errors.lectureTitle &&
                                                <span className='mt-2 text-sm text-destructive' >
                                                    Please enter lecture title
                                                </span>
                                            }
                                        </div>

                                        <div className=' flex flex-col items-start justify-center gap-1'>
                                            <label className=' text-richblack-300 text-base'
                                                htmlFor={"lectureDesc"}>
                                                Lecture Description<sup className=' text-destructive'>*</sup>
                                            </label>
                                            <textarea
                                                id='lectureDesc'
                                                placeholder="Enter Description"
                                                {...register("lectureDesc", { required: true })}
                                                className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                                                style={
                                                    {
                                                        boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                                    }
                                                }
                                            >
                                            </textarea>
                                            {
                                                errors.lectureDesc &&
                                                <span className='mt-2 text-sm text-destructive' >
                                                    Please enter Description
                                                </span>
                                            }
                                        </div>
                                        {
                                            !view &&  
                                            <button
                                                type="submit"
                                                className=" text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                                                bg-yellow-50 text-black hover:scale-95 transition-all duration-200 w-fit"
                                                style={
                                                    {
                                                        boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                                                    }
                                                }

                                            >
                                                    {
                                                            add && 
                                                            (
                                                                <span>
                                                                    Save
                                                                </span>
                                                            )
                                                    }
                                                    {
                                                            edit && 
                                                            (
                                                                <span>
                                                                    Save Changes
                                                                </span>
                                                            )    
                                                    }
                                            </button>
                                        }
                                    </form>
                                </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default LectureModals;