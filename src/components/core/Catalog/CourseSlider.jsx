import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel"
import Course_Card from "./Course_Card";
const CourseSlider=({Courses})=>
{
    return(
        <div>
           {
                !Courses || Courses?.length === 0 ?
                    <div className=' flex w-full h-full justify-center items-center text-xl font-semibold text-richblack-100 mt-10'>
                        No Course Found.
                    </div> : 
                (
                    <div>
                        <Carousel>
                        <CarouselContent>
                            {
                                Courses.map( (course,i) => (
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={i}>
                                        <Course_Card course={course} Height={"h-[250px]"} />
                                    </CarouselItem>
                                ))
                            }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                        </Carousel>
                    </div>
                )
            }
        </div>
    )
}

export default CourseSlider