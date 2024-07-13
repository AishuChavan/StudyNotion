import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars"
import { useState,useEffect } from "react";
import GetAvgRating from "../../../utilis/avgRating"
const Course_Card=({course,Height})=>
{
    const [avgRatingCount,setAvgRatingCount]=useState(0);
    useEffect( () => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgRatingCount(count);
    },[course]);
    return (
        <div>
           <Link to={`/courses/${course._id}`}>
                <div className=' flex flex-col gap-4'>
                    <div>
                        <img
                            src={course?.thumbnail}
                            alt='course thumbnail'
                            className={`${Height ?? ""} w-full rounded-xl object-cover`}
                        />
                    </div>
                    <div  className=' flex flex-col gap-2'>
                        <p className=' text-richblack-5 text-xl'>{course?.courseName}</p>
                        <p className=' text-richblack-500'>{course?.instructor?.firstName}{" "} {course?.instructor?.lastName}</p>
                        <div className=' flex gap-2 items-center'>
                            <span>
                                {avgRatingCount}
                            </span>
                            <RatingStars Review_Count={avgRatingCount}/>
                            <span className=' text-richblack-500'>{course?.ratingAndReviews?.length} Ratings</span>
                            <p className=' flex font-semibold text-2xl text-richblack-5'>₹ {course?.price}</p>
                        </div>
                    </div>
                </div>
           </Link>
        </div>
    )
}

export default Course_Card;