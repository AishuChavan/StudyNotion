const Profile=require("../models/Profile");
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploader")
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");




exports.updatedProfile=async (req,res)=>{
    try{
        //get data
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        //get userId
        const id=req.user.id;
        //validation on that data
        if(!contactNumber || !gender || !id)
        {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }
        //find profile
        const userDetails=await User.findById({_id:id});
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;

        await profileDetails.save();
        //return response
        return res.status(200).json({
            success:true,
            message:'Profile Updated Successfully',
            profileDetails,
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
}


//delete Account
exports.deleteAccount=async (req,res)=>{
    try{
        //get the id
        const id=req.user.id;
        //validation on data ->no need of validation as login user can delete account
        const userDetails=await User.findById(id);

        if(!userDetails)
        {
            return res.status(404).json({
                success:false,
                message:'User not found',
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //todo:hw unenroll user from all enrolled course
        //delete user
        await User.findByIdAndDelete({_id:id});

       
        //return response
        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })

    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully',
        })
    }
}


//get all user details profile details
exports.getAllUserDetails=async (req,res)=>{
    try{
        //get id
        const id=req.user.id;
        //validation and get user details
        const userDetails=await User.findById(id).populate("additionalDetails").exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User details not found."
            })
        }
        //return response
        return res.status(200).json({
            success:true,
            message:'User data fetched successfully',
            userDetails,
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        //console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        }).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            }
        });


        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses?.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent?.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.instructorDashboard = async (req,res) => {
    try {
        const courseDetails = await Course.find({instructor: req.user.id});

        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found."
            })
        }

        let totalIncome = 0;
        let totalStudents = 0;
        const courseData = courseDetails.map( (course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmount = totalStudentsEnrolled * course.price;
            totalIncome += totalAmount;
            totalStudents += totalStudentsEnrolled;
            
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                description: course.courseDescription,
                thumbnail: course.thumbnail,
                price: course.price,
                totalStudentsEnrolled,
                totalAmount
            }
            return courseDataWithStats;
        })

        return res.status(200).json({
            success: true,
            data: {courseData,totalIncome, totalStudents},
            message: "Instructor Stats fetched successfully."
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}