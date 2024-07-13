const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");

//createRating
exports.createRating=async (req,res)=>{
    try{
        //get user id
        const userId=req.user.id;
        //fetchdata from res body
        const {rating,review,courseId}=req.body;
        //check if user is enrolled or not
        const courseDetails=await Course.findOne(
                                  {_id:courseId,
                                   studentsEnrolled: {$elemMatch: {$eq:userId} },
                                });

        if(!courseDetails)
        {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed=await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                        });

        if(alreadyReviewed)
        {
            return res.status(403).json({
                success:false,
                message:'Course is already reviewed by the user',
            });
        }
        //create rating and review
        const ratingReview= await RatingAndReview.create({
                                        rating,
                                        review,
                                        course:courseId,
                                        user:userId,
                                    });

        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate( {_id:courseId},
                                        {
                                            $push:{
                                                ratingAndReviews:ratingReview._id,
                                            }
                                        },
                                        {new:true}
                                      );

        //console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"rating and review created successfully"
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
//getAverageRating
exports.getAverageRating = async (req,res)=>
{
    try{
        //get course Id
        const courseId= req.body.courseId;

        //calculate avg rating 
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId), 
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])
        //return result
        if(result.length>0)
        {
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        //if no rating/review exist
        return res.status(200).json({
            success:true,
            message:'Average rating is 0,no ratings given till now',
            averageRating:0,
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAllRatingAndReviews
exports.getAllRating = async (req,res)=>{
    try{
        const allReviews=await RatingAndReview.find({})
                              .sort({rating:"desc"})
                              .populate({
                                path:"user",
                                select:"firstName lastName email image",
                              })
                              .populate({
                                path:"course",
                                select:"courseName",
                              })
                              .exec();

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        });

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getAllRatingsOfCourse = async(req,res) => {
    try {
        // get course id
        const {courseId} = req.body || req.params;
        
        //console.log("PRINTING COURSEID ID" ,courseId);
        // get rating and reviews
        const allRatingAndReviews = await Course.findById(
            {_id: courseId},
            {ratingAndReviews: true}
        ).populate({
            path: "ratingAndReviews",
            populate: {
                path: "user",
                select: "firstName lastName"
            }
        }).exec();
        
        //console.log(allRatingAndReviews.ratingAndReviews);

        if(allRatingAndReviews?.ratingAndReviews?.length > 0){
            return res.status(200).json({
                success: true,
                data: allRatingAndReviews.ratingAndReviews.sort((a,b) => b.rating - a.rating),
                message: "Rating and Reviews returned successfully.",
            })
        }
        return res.status(200).json({
            success: true,
            data: 0,
            message: "No Rating and Reviews given till now.",
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while geting all rating and reviews of a course."
        });
    }
}