const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mails/templates/courseEnrollmentEmail"); //remail code
const CourseProgress=require("../models/CourseProgress")
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mails/templates/paymentSuccessEmail");
const crypto=require("crypto");
//initiate the razorpay order
exports.capturePayment=async(req,res)=>
{
    const { courses } = req.body
    const userId = req.user.id
    if (courses.length === 0) {
        return res.json({ success: false, message: "Please Provide Course ID" })
    }

    let total_amount = 0

    for (const course_id of courses) {
        let course
        try {
            // Find the course by its ID
            course = await Course.findById(course_id)

            // If the course is not found, return an error
            if (!course) {
                return res
                    .status(200)
                    .json({ success: false, message: "Could not find the Course" })
            }

            // Check if the user is already enrolled in the course
            const uid = new mongoose.Types.ObjectId(userId)
            if (course.studentsEnrolled.includes(uid)) {
                return res
                    .status(200)
                    .json({ success: false, message: "Student is already Enrolled" })
            }

            // Add the price of the course to the total amount
            total_amount += course.price
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    const options = {
        amount: total_amount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        // Initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(options)
        //console.log(paymentResponse)
        res.json({
            success: true,
            data: paymentResponse,
        })
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ success: false, message: "Could not initiate order." })
    }

}


//verify the payment
exports.verifyPayment=async(req,res)=>
{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses=req.body.courses;
    const userId=req.user.id;
    console.log()
    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId)
    {
        return res.status(200).json({success:false,message:"Payment Failed"});
    }

    let body=razorpay_order_id+"|" + razorpay_payment_id;
    const expectedSignature=crypto
                            .createHmac("sha256",process.env.RAZORPAY_SECRET)
                            .update(body.toString())
                            .digest("hex");
    if(expectedSignature===razorpay_signature)
    {
       // enrolled student
       await enrollStudents(courses,userId,res);
     
        //return res
       return res.status(200).json({success:true,message:"Payment Verified"});
    }

    return res.status(200).json({success:false,message:"Payment Failed"})


}


const enrollStudents=async(courses,userId,res)=>
{
    try{
    if(!courses || !userId)
    {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses)
    {
        const enrolledCourse=await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )
        if(!enrolledCourse)
        {
            return res.status(500).json({success:false,message:"Course not Found"});
        }
        const courseProgress = await CourseProgress.create({
            courseId: courseId,
            userId: userId,
            completedVideos: [],
        })
        const enrolledStudent=await User.findByIdAndUpdate(userId,
            {
                $push:
                {
                    courses:courseId,
                    courseProgress: courseProgress._id,
                }
            },
            {
                new:true
            },
        )

        const emailResponse=await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName}`)
        )

        //console.log("email send successfully",emailResponse);
    }
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({success:false,message:e.message});
    }

}



exports.sendPaymentSuccessEmail=async(req,res)=>
{
    const {orderId,paymentId,amount}=req.body;
    const userId = req.user.id
    console.log("before ");
    if (!orderId || !paymentId || !amount || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all the details" })
    }

    try {
        const enrolledStudent = await User.findById(userId)
        console.log("Sending email ");
        const result=await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        )
       // console.log("send",result);
    } catch (error) {
        console.log("error in sending mail", error)
        return res
            .status(400)
            .json({ success: false, message: "Could not send email" })
    }
}







// capture payment and create order
// exports.capturePayment = async (req, res) => {
//     try {
//         // get userId and courseId
//         const { courseId } = req.body;
//         const userId = req.user.id;

//         // validation
//         // valid course
//         if (!courseId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid course Id"
//             })
//         }
//         // valid course details
//         let course;
//         try {
//             course = await Course.findById(courseId);
//             if (!course) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Could not find course details"
//                 })
//             }
//         } catch (error) {
//             console.log(error.message);
//             return res.status(500).json({
//                 success: false,
//                 error: error.message,
//                 message: "Error while fetching course details."
//             })
//         }
//         // check user already paid or not for this course
//         const uid = new mongoose.Types.ObjectId(userId);    // userId is string before so convert it into ObjectId
//         if (course.studentsEnrolled.includes(uid)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Student is already enrolled, can't buy again."
//             })
//         }

//         // create order
//         const amount = course.price;
//         const currency = "INR";
//         const options = {
//             amount: amount * 100,
//             currency: currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId: courseId,
//                 userId: userId
//             }
//         }

//         try {
//             // initiate the payment and send response
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             return res.status(200).json({
//                 success: true,
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount,
//                 message: "Payment captured successfully."
//             })

//         } catch (error) {
//             console.log(error.message);
//             return res.status(500).json({
//                 success: false,
//                 error: error.message,
//                 message: "Error while initiating a payment."
//             })
//         }
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({
//             success: false,
//             error: error.message,
//             message: "Error while capturing a payment."
//         })
//     }
// }

// // verfiy Signature of Razorpay and Server
// exports.verifySignature = async (req, res) => {
//     try {
//         const webHookSecret = "123456";                         // this is available on server
//         const signature = req.header["x-razorpay-signature"];   // Razorpay sends this in request header

//         // SHA -> Secure Hashing Algo
//         // HMAC -> Hash-based Message Authentication , parameters of HMAC -> 1] Name of Hashing Algo 2] Secret
//         const shasum = crypto.createHmac("sha256", webHookSecret);
//         // we update the hash content using the update() function
//         shasum.update(JSON.stringify(req.body));
//         // to get the hash value we use the digest() function 
//         const digest = shasum.digest("hex");        // hexadecimal format

//         if (shasum === digest) {
//             console.log("Payment is Authorised");

//             const { courseId, userId } = req.body.payload.payment.entity.notes;
//             // Perform the actions
//             try {
//                 // enroll student in the course
//                 const enrolledCourse = await Course.findByIdAndUpdate(
//                     { _id: courseId },
//                     {
//                         $push: {
//                             studentsEnrolled: userId
//                         }
//                     },
//                     { new: true }
//                 );
//                 if (!enrolledCourse) {
//                     return res.status(404).json({
//                         success: false,
//                         message: "Course not found"
//                     })
//                 };
//                 console.log(enrolledCourse);
//                 // enter courseId into User schema
//                 const enrolledStudent = await User.findByIdAndUpdate(
//                     { _id: id },
//                     {
//                         $push: {
//                             courses: courseId
//                         }
//                     },
//                     { new: true }
//                 );
//                 if (!enrolledStudent) {
//                     return res.status(404).json({
//                         success: false,
//                         message: "Student not found"
//                     })
//                 };
//                 console.log(enrolledStudent);

//                 //mail send krdo confirmation wala 
//                 const emailResponse = await mailSender(
//                     enrolledStudent.email,
//                     "Congratulations from StudyNotion",
//                     "Congratulations, you are onboarded into new StudyNotion Course",
//                 );

//                 return res.status(200).json({
//                     success: true,
//                     message: `Payment verified and enrolled into course successfully.`
//                 });

//             } catch (error) {
//                 console.log(error.message);
//                 return res.status(500).json({
//                     success: false,
//                     error: error.message,
//                     message: "Not able to enroll in course."
//                 });
//             }
//         }
//         else {
//             return res.status(404).json({
//                 success: false,
//                 message: "Not able to authorize the payment."
//             })
//         }

//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({
//             success: false,
//             error: error.message,
//             message: "Error while authorising a payment."
//         });
//     }
// }



//capture the payment and initiate the razorpay order
// exports.capturePayment=async (req,res)=>{
//     try{
//         //get courseId and UserId
//         const {course_id}=req.body;
//         const userId=req.user.id;
//         //validation
//         //valid courseId
//         if(!course_id)
//         {
//             return res.json({
//                 success:false,
//                 message:'Please provide valid course ID',
//             })
//         }
//         //valid courseDetails
//         let course;
//         try{
//             course=await Course.findById(course_id);
//             if(!course)
//             {
//                 return res.json({
//                     success:false,
//                     message:'Could not find the course',
//                 });
//             }
//             //user already pay for the same course
//             const uid=new mongoose.Types.ObjectId(userId); //user id is in string and in course schema student id in object id format we have to convert id
//             if(course.studentsEnrolled.includes(uid))
//             {
//                 return res.status(200).json({
//                     success:false,
//                     message:'Student is already enrolled',
//                 });
//             }
//         }
//         catch(error)
//         {
//             console.error(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
    
//         //order create
//         const amount=course.price;
//         const currency="INR";

//         const options={
//             amount:amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:course_id,
//                 userId,
//             }
//         };

//         try{
//             //initiate the payment using razorpay
//             const paymentResponse=await instance.orders.create(options);
//             console.log(paymentResponse);
//             //return response
//             return res.status(200).json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount,
//             });
//         }
//         catch(error)
//         {
//             console.log(error);
//             res.json({
//                 success:false,
//                 message:"Could not initiate order",
//             });
//         }
        
//     }
//     catch(error)
//     {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Something went wrong while doing payment",
//         });
//     }
// };


// //verify signature of Razorpay and Server
// exports.verifySignature= async (req,res)=>{
    
//     const webhookSecret="123456";

//     const signature=req.headers["x-razorpay-signature"];
//     const shasum=crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));

//     const digest=shasum.digest("hex");

//     if(signature === digest)
//     {
//         console.log("Payment is Authorised");

//         const {courseId,userId}=req.body.payload.payment.entity.notes;

//         try{
//             //fulfill the action
//             //find the course and enroll the student in it
//             const enrolledCourse=await Course.findOneAndUpdate(
//                                             {_id:courseId,},
//                                             {$push:{studentsEnrolled:userId}},
//                                             {new:true},
//             );

//             if(!enrolledCourse)
//             {
//                 return res.status(500).json({
//                     success:false,
//                     message:'Course not Found',
//                 });
//             }
//             console.log(enrolledCourse);

//             //find the student and add the course to their list enrolled course me
//             const enrolledStudent=await User.findOneAndUpdate(
//                                         {_id:userId},
//                                         {$push:{courses:courseId}},
//                                         {new:true},
//             );

//             console.log(enrolledStudent);

//             //confirmation mail send 
//             const emailResponse=await mailSender(
//                                     enrolledStudent.email,
//                                     "Congratulation,from Aishwarya ",
//                                     "Congratulation ,you are oboarded into new Aish's Course",
//             );
//             console.log(emailResponse);
//             return res.satus(200).json({
//                 success:true,
//                 message:"Signature Verified and course added"
//             })
//         }
//         catch(error)
//         {
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"action not fullfill",
//         })
//     }
// };