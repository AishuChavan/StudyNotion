const Category=require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
//write a handler function of create tag

exports.createCategory=async (req,res)=>{
    try{
        //fetch data
        const {name,description}=req.body;
        //validation on that data
        if(!name || !description)
        {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        //create entry in DB
        const categoryDetails=await Category.create({
            name:name,
            description:description,
        })
       // console.log(categoryDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"category Created Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAlltagshandler function
exports.showAllCategories=async (req,res)=>{
    try{
        const allCategories=await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All Categories returned successfully",
            data:allCategories
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message,        
        })
    }
}


//category page details

exports.categoryPageDetails = async (req,res)=>{
    try {
        const { categoryId } = req.body
        //console.log("PRINTING CATEGORY ID: ", categoryId);

        // Get courses for the specified category
        const selectedCategory = await Category.findById(
            {_id: categoryId}
            ).populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
                populate: {
                    path: "instructor",
                },
            })
            .exec()
        //console.log("selectedCategory  ",selectedCategory)
        // Handle the case when the category is not found
        if (!selectedCategory) {
            console.log("Category not found.")
            return res
                .status(404)
                .json({ success: false, message: "Category not found" })
        }

        if (selectedCategory.courses.length === 0) {
            //console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }
        

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        ).populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()
        //console.log("Different COURSE", differentCategory)
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)
        // console.log("mostSellingCourses COURSE", mostSellingCourses)
        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

