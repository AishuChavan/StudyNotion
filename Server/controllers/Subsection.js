const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { findByIdAndUpdate, findByIdAndDelete } = require("../models/User");
const Course = require("../models/Course");
exports.createSubSection=async(req,res)=>{
    try{
        //fetch data from req body
        const {sectionId,title,description,courseId}=req.body;
        //extract file/video
        const video=req.files.video;
        //validation
        if(!sectionId || !title  || !description || !video)
        {
            return res.status(400).json({
                success:false,
                messege:'All fields are required',
            })
        }
        //upload video to cloudinary
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //create a sub-section
        const SubSectionDetails=await SubSection.create({
            title:title,
            // timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //update section with this sub section objectId
        const updateSection=await Section.findByIdAndUpdate({_id:sectionId},
                                                            {$push:{
                                                                subSection:SubSectionDetails._id,
                                                            }},
                                                            {new:true}).populate("subSection");

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
            message:'SubSection Created Successfully',
            data:course,
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}

//updateSubsection
exports.updateSubsection=async (req,res)=>
{
    try{
        //fetch the data
        const {sectionId,courseId,subSectionId,title,description}=req.body;
        const subSection = await SubSection.findById(subSectionId);
        const video=req.files.videoFile;

        //validation on data
        if(!subSection){
            return res.status(400).json({
                success: false,
                message: "Subsection not found."
            });
        };
        if(title !== undefined){
            subSection.title = title;
        }

        if(description !== undefined){
            subSection.description = description;
        }
        
        // update subsection
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }
        //when we want to upload the video before that previous video we have to delete
        // cloudinary.uploader
        // .destroy('docs/stream', {resource_type: 'video', type: 'authenticated'})
        // .then(result => console.log(result));

        //update the subsection
        await subSection.save();
        
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
            message:'SubSection Updated Successfully',
            data:course,
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Error while Updating the Subsection",
            error:error.message,
        })
    }
}
//deleteSubsection
exports.deleteSubsection=async (req,res) =>
{
    try{

        const {courseId,sectionId,subSectionId}= req.body;
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }
        
        // delete subsection from section schema
        await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $pull: {
                    subSection: subSectionId
                }
            }
        )
        const deletesubsection= await SubSection.findByIdAndDelete({_id:subSectionId});
        if (!deletesubsection) {
            return res.status(404).json({ 
                success: false, 
                message: "SubSection not found" 
            })
        }


        const course = await Course.findById(
            {_id: courseId}
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        return res.status(200).json({
            success:true,
            message:'deleted subsection successfully',
            data:course,
        });
        
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'error while deleting  subsection',
        });
    }
}