import React, { useEffect } from "react";
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
} from "../ui/alert-dialog";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { createRating } from "../../services/operations/courseDetailsApis";
import { IoIosCloseCircle } from "react-icons/io";
import { setVideoEnded } from "../../slices/viewCourseSlice";

function ReviewModal(props) {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { courseEntireData } = useSelector((state) => state.viewCourse)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const ratingChanged = (newRating) => {
        // console.log(newRating)
        setValue("courseRating", newRating)
    }
    
    useEffect(() => {
        setValue("courseExperience", "")
        setValue("courseRating", 0)
    }, [])
    
    const onSubmit = async (data) => {
        await createRating(
            {
              courseId: courseEntireData._id,
              rating: data.courseRating,
              review: data.courseExperience,
            },
            token
        )
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <button className="yellowButton text-sm font-medium "
                    onClick={() => dispatch(setVideoEnded(false))}
                >
                    Add Review
                </button>
            </AlertDialogTrigger>
                <AlertDialogContent className=" bg-richblack-800 border-0 -p-6">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="p-4 bg-richblack-700 rounded-t-md text-richblack-5 text-xl flex justify-between items-center">
                            Add Review
                            <AlertDialogCancel
                                 className=" text-center text-3xl font-bold flex justify-center items-center gap-2 
                                 text-richblack-300 hover:scale-95 transition-all duration-200 rounded-full"
                            >
                                <IoIosCloseCircle />
                            </AlertDialogCancel>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-richblack-300 text-base">

                            <div className="p-6">
                                <div className="flex items-center justify-center gap-x-4">
                                    <img
                                        src={user?.image}
                                        alt={user?.firstName + "profile"}
                                        className="aspect-square w-[50px] rounded-full object-cover"
                                    />
                                    <div className="">
                                        <p className="font-semibold text-richblack-5">
                                            {user?.firstName} {user?.lastName}
                                        </p>
                                        <p className="text-sm text-richblack-5">Posting Publicly</p>
                                    </div>
                                </div>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="mt-6 flex flex-col items-center"
                                >
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={30}
                                        activeColor="#ffd700"
                                    />
                                    <div className="flex w-11/12 flex-col space-y-2">
                                        <label
                                            className="text-sm text-richblack-5"
                                            htmlFor="courseExperience"
                                        >
                                            Add Your Experience <sup className="text-pink-200">*</sup>
                                        </label>
                                        <textarea
                                            id="courseExperience"
                                            placeholder="Add Your Experience"
                                            {...register("courseExperience", { required: true })}
                                            className="form-style resize-x-none min-h-[130px] w-full"
                                        />
                                        {errors.courseExperience && (
                                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                                Please Add Your Experience
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-6 flex w-11/12 justify-end gap-x-2">
                                        <AlertDialogCancel
                                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-bold text-richblack-900`}
                                        >
                                            Cancel
                                        </AlertDialogCancel>
                                        <button
                                            type="submit"
                                            className=" text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                                        bg-yellow-50 text-black hover:scale-95 transition-all duration-200 w-fit"
                                            style={
                                                {
                                                    boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                                                }
                                            }

                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>
    );
}

export default ReviewModal;
