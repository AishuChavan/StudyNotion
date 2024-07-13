import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../../ui/accordion";
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
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsApis';
import { setCourse } from '../../../../../slices/courseSlice';
import LectureModals from './LectureModals';
  

function NestedView({handleChangeEditSectionName}) {
    const { course, editCourse } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [subSectionMode, setSubSectionMode] = useState({
        addMode: null,
        viewMode: null,
        editMode: null
    });
    //console.log("course name in the nested view is ",course);
    const handleDeleteSection =  async(id) => {
        let result = await deleteSection({
            sectionId: id,
            courseId: course._id
        },token);

        if(result){
            dispatch(setCourse(result));
        }
    }

    const handleDeleteSubSection = async(sectionId,subSectionId) => {
        let result = await deleteSubSection(
            {
                courseId: course._id,
                sectionId,
                subSectionId
            },token
        );

        if(result)
            dispatch(setCourse(result))
    }

    return (
        <div>
            <div className='bg-richblack-700 rounded-md'>
                {
                    course?.courseContent?.map( (section) => (
                        // Section Accordion 
                        <Accordion type="single" collapsible key={section._id}  
                            className='px-4 text-richblack-50'
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <div className=' flex items-center justify-between w-full'>
                                        <div className=' flex items-center gap-2'>
                                            <RxDropdownMenu />
                                            {section?.sectionName}
                                        </div>
                                        <div className=' flex items-center justify-center gap-2 text-lg border-r border-r-richblack-50 px-2 mx-2'>   
                                            <span 
                                                onClick={() => handleChangeEditSectionName(section._id,section.sectionName)}
                                            >
                                                <MdOutlineEdit />
                                            </span>
                                            <button>
                                                {/* Delete Section Modal  */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <span>
                                                            <RiDeleteBin6Line />
                                                        </span>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className=" bg-richblack-900">
                                                        <AlertDialogHeader>
                                                        <AlertDialogTitle className=" text-richblack-5 text-xl">Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription className=" text-richblack-300 text-base">
                                                            Would you like to delete this section?
                                                            All lectures in this section will be deleted.
                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                        <AlertDialogCancel 
                                                            className=" appearance-none	 text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2 
                                                            bg-richblack-800 text-white hover:scale-95 transition-all duration-200"
                                                            style={
                                                                {
                                                                    boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                                                }
                                                            }
                                                        >Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                                                            bg-destructive text-black hover:scale-95 transition-all duration-200"
                                                            style={
                                                                {
                                                                    boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                                                                }
                                                            }
                                                            onClick={ () => dispatch(handleDeleteSection(section._id))}
                                                        >Delete</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </button>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className=" flex flex-col px-8 justify-start gap-2">
                                    {
                                        section.subSection.map( (subSection) => (
                                        <div key={subSection._id} 
                                            className=' flex items-center justify-between w-full'>
                                            <LectureModals 
                                                    modalData={{...subSection}}
                                                    add={false}
                                                    edit={false}
                                                    view={true}
                                            />
                                            <div className=' flex items-center justify-center gap-2 text-lg border-r border-r-richblack-50 px-2 mx-2'>   
                                                <LectureModals 
                                                    modalData={{...subSection,sectionId: section._id}}
                                                    add={false}
                                                    edit={true}
                                                    view={false}
                                                />
                                                <button>
                                                    {/* Delete subsection Modal  */}
                                                    <AlertDialog>
                                                        <AlertDialogTrigger>
                                                            <span>
                                                                <RiDeleteBin6Line />
                                                            </span>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className=" bg-richblack-900">
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle className=" text-richblack-5 text-xl">Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription className=" text-richblack-300 text-base">
                                                                Would you like to delete this subsection?
                                                                selected lecture will be deleted.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel 
                                                                className=" appearance-none	 text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2 
                                                                bg-richblack-800 text-white hover:scale-95 transition-all duration-200"
                                                                style={
                                                                    {
                                                                        boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                                                    }
                                                                }
                                                            >Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                                                                bg-destructive text-black hover:scale-95 transition-all duration-200"
                                                                style={
                                                                    {
                                                                        boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                                                                    }
                                                                }
                                                                onClick={ () => handleDeleteSubSection(section._id, subSection._id)}
                                                            >Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </button>
                                            </div>
                                        </div>
                                        ))
                                    }

                                    {/* Add Lecture Modal */}
                                    <LectureModals 
                                        modalData={section._id}
                                        add={true}
                                        edit={false}
                                        view={false}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))
                }
            </div>
        </div>
    );
}

export default NestedView;