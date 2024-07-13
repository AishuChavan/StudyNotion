const Section=require("../models/Section");
const Course=require("../models/Course");


exports.createSection=async (req,res)=>{
    try{
        //fetch the data
        const {sectionName,courseId}=req.body;
        //validation on data
        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:'please fill all the details carefully',
            });
        }
        //create section
        const newSection=await Section.create({sectionName});
        //update course with section ObjectID
        const updatedCourseDetails=await Course.findByIdAndUpdate(
                                            {_id:courseId},
                                            {
                                                $push:{
                                                    courseContent:newSection._id,  
                                                    }                                             
                                            },
                                            {
                                                new:true
                                            }).populate({
                                                path: "courseContent",
                                                populate: {
                                                    path: "subSection",
                                                },
                                            })
                                            .exec();

        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            data:updatedCourseDetails,
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'Unable to create section ,Please try again',
            error:error.message,
        })
    }
}

exports.updateSection=async(req,res)=>{
    try{
        //fetch the data
        const {sectionName,sectionId,courseId}=req.body;
        //validation on that data
        if(!sectionName || !sectionId)
        {
            return res.status(400).json({
                success:false,
                message:'Missing Proprties',
            });
        }
        //update data
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true}).populate("subSection").exec();

        const course = await Course.findById(
            {_id: courseId}
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        //return response

        return res.status(200).json({
            success:true,
            message:'Section Updated Successfully',
            data:course
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section,please try again",
            error:error.message,
        });
    }
}


exports.deleteSection=async (req,res)=>{
    try{
        //get id
        const {sectionId,courseId}=req.params;
        if(!sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {_id: courseId},
            {
                $pull: {
                    coursesContent: sectionId
                }
            },
            {new: true}
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        //use findbyid aand delete 
        await Section.findByIdAndDelete({_id:sectionId});
        //return response
        return res.status(200).json({
            success:true,
            data:updatedCourseDetails,
            message:"Section Deleted Successfully",
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section,please try again",
            error:error.message,
        });
    }
}