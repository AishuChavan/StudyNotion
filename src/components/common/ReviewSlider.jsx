import React, { useEffect, useMemo, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel"
import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/apis';
import ReactStars from 'react-stars';
import { FaStar } from 'react-icons/fa6';


function ReviewSlider({courseId = null}) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const truncateWords = 15;

    const getReviews = async () => {
        setLoading(true);
        try {
            const res = await apiConnector(
                "GET",
                ratingsEndpoints.REVIEWS_DETAILS_API
            );

            if (!res?.data?.success) {
                throw new Error(res?.data?.message);
            }
            setReviews(res?.data?.data);

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const getReviewsOfCourse = async () => {
        setLoading(true);
        try {
            const res = await apiConnector(
                "POST",
                ratingsEndpoints.ALL_REVIEWS_OF_COURSE_API,
                {courseId}
            );

            if (!res?.data?.success) {
                throw new Error(res?.data?.message);
            }

            setReviews(res?.data?.data);

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }


    useEffect(() => {
        if(courseId){
            getReviewsOfCourse();
            return;
        }
        getReviews();
    }, []);

    if (loading) {
        return <>
            <div className=' loader mx-auto '>

            </div>
        </>
    }
    return (
        <>
        {
            !reviews.length  ? (<div></div>) : 
            (
                <>
                    <h1 className=" text-richblack-5 text-center text-4xl font-semibold mt-8">
                        Reviews from other learners
                    </h1>
                    <Carousel className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent w-full">
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {
                                reviews.map((review) => (
                                    <CarouselItem key={review._id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 ">
                                        <div className="flex flex-col gap-3 bg-richblack-800 px-4 py-3 text-[14px] text-richblack-25 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={
                                                        review?.user?.image
                                                            ? review?.user?.image
                                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                                    }
                                                    alt=""
                                                    className="h-9 w-9 rounded-full object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                                    <h2 className="text-[12px] font-medium text-richblack-500">
                                                        {review?.course?.courseName}
                                                    </h2>
                                                </div>
                                            </div>
                                            <p className="font-medium text-richblack-25">
                                                {review?.review.split(" ").length > truncateWords
                                                    ? `${review?.review
                                                        .split(" ")
                                                        .slice(0, truncateWords)
                                                        .join(" ")} ...`
                                                    : `${review?.review}`}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <div className=''>
                                                    <h3 className="font-semibold text-yellow-100 ">
                                                        {review.rating.toFixed(1)}
                                                    </h3>
                                                </div>
                                                <ReactStars
                                                    count={5}
                                                    value={review.rating}
                                                    size={20}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                    emptyIcon={<FaStar />}
                                                    fullIcon={<FaStar />}
                                                />
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))
                            }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
        
                </>
            )
        }
        </>
    );
}

export default ReviewSlider;