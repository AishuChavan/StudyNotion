import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsApis';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import RequirementField from './RequirementField';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import TagsComponent from './TagsComponent';
import { COURSE_STATUS } from '../../../../../utilis/constants';
import Upload from '../Upload';
import toast from 'react-hot-toast';

function CourseInformationForm(props) {
    const { course, editCourse } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const [courseCategories, setCourseCategories] = useState([]);
    const fetchCategories = async () => {
        const result = await fetchCourseCategories();
        //console.log("result is there",result);
        if (result?.length > 0)
            setCourseCategories(result);
    }

    useEffect(() => {
        fetchCategories();

        if (editCourse || course) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues()
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
            course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ) {
            return true
        }
        return false
    }

    const onSubmit = async (data) => {

        if (editCourse) {
            // const currentValues = getValues()
            // console.log("changes after editing form values:", currentValues)
            // console.log("now course:", course)
            // console.log("Has Form Changed:", isFormUpdated())
            if (isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()
                console.log(data)
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                        "instructions",
                        JSON.stringify(data.courseRequirements)
                    )
                }
                if (currentValues.courseImage[0] !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }
                console.log("Edit Form data: ", formData)
                const result = await editCourseDetails(formData, token)
                console.log("Form edited");
                if (result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            } else {
                toast.error("No changes made to the form")
            }
            return
        }

        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)


        const result = await addCourseDetails(formData, token)
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className=' flex flex-col gap-4 bg-richblack-800 border-2 border-richblack-700 rounded-md p-4'
        >
            <div className=' flex flex-col items-start justify-center gap-1'>
                <label className=' text-richblack-300 text-base'
                    htmlFor={"courseTitle"}>
                    Course Title <sup className=' text-destructive'>*</sup>
                </label>
                <input
                    id='courseTitle'
                    name="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", { required: true })}
                    className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                    style={
                        {
                            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                        }
                    }
                />
                {
                    errors.courseTitle &&
                    <span className='mt-2 text-sm text-destructive' >
                        Please enter Course Title
                    </span>
                }

            </div>

            <div className=' flex flex-col items-start justify-center gap-1'>
                <label className=' text-richblack-300 text-base'
                    htmlFor={"courseShortDesc"}>
                    Course Description<sup className=' text-destructive'>*</sup>
                </label>
                <textarea
                    id='courseShortDesc'
                    placeholder="Enter Description"
                    {...register("courseShortDesc", { required: true })}
                    className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                    style={
                        {
                            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                        }
                    }
                >
                </textarea>
                {
                    errors.courseShortDesc &&
                    <span className='mt-2 text-sm text-destructive' >
                        Please enter Description
                    </span>
                }
            </div>

            <div className=' flex flex-col items-start justify-center gap-1'>
                <label className=' text-richblack-300 text-base relative'
                    htmlFor={"coursePrice"}>
                    Price<sup className=' text-destructive'>*</sup>
                    <HiOutlineCurrencyRupee className=' absolute top-10 left-2 text-lg text-richblack-200' />
                </label>
                <input
                    id='coursePrice'
                    name="coursePrice"
                    placeholder="Enter Price"
                    {...register("coursePrice", { required: true, valueAsNumber: true })}
                    className=' px-8 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                    style={
                        {
                            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                        }
                    }
                />
                {
                    errors.coursePrice &&
                    <span className='mt-2 text-sm text-destructive' >
                        {errors?.coursePrice?.message || "Please enter Price"}
                    </span>
                }

            </div>

            <div className=' flex flex-col items-start justify-center gap-1'>
                <label className=' text-richblack-300 text-base'
                    htmlFor={"courseCategory"}>
                    Course Category<sup className=' text-destructive'>*</sup>
                </label>
                <select
                    type="text"
                    name="courseCategory"
                    id="courseCategory"
                    defaultValue=""
                    {...register("courseCategory")}
                    className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                    style={
                        {
                            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                        }
                    }
                >
                    <option value="" disabled>Choose a Category</option>
                    {
                        courseCategories.map((ele) => {
                            return (
                                <option key={ele._id} value={ele._id}>
                                    {ele.name}
                                </option>
                            )
                        })
                    }
                </select>
                {
                    errors.courseCategory &&
                    <span className='mt-2 text-sm text-destructive' >
                        Please select a Category
                    </span>
                }
            </div>

            <TagsComponent
                name="courseTags"
                label="Tags"
                placeholder="Choose a Tag"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />

            <div className=' flex flex-col items-start justify-center gap-1'>
                <label className=' text-richblack-300 text-base'
                    htmlFor={"courseBenefits"}>
                    Benefits of the course<sup className=' text-destructive'>*</sup>
                </label>
                <textarea
                    id='courseBenefits'
                    placeholder="Enter Benefits of the course"
                    {...register("courseBenefits", { required: true })}
                    className=' px-3 py-2 rounded-md bg-richblack-700 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                    style={
                        {
                            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                        }
                    }
                >
                </textarea>
                {
                    errors.courseBenefits &&
                    <span className='mt-2 text-sm text-destructive' >
                        Please enter Benefits of the course
                    </span>
                }
            </div>


            <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                placeholder="Enter the requirements"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <div className=' flex items-center gap-2 justify-end'>
                {
                    editCourse &&
                    <button
                        onClick={() => dispatch(setStep(2))}
                        className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                         bg-richblack-300 text-black hover:scale-95 transition-all duration-200"
                        style={
                            {
                                boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                            }
                        }
                    >
                        Contiune without saving
                    </button>
                }

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
                    {editCourse ? "Save Changes" : "Next"} <MdOutlineArrowForwardIos className=' flex justify-center items-center' />
                </button>
            </div>
        </form>
    );
}

export default CourseInformationForm;