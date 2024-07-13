const { contactUsEmail } = require("../mails/templates/contactUsFormRes");
const mailSender = require("../utils/mailSender");

exports.contactUsController = async(req,res) => {
    try {
        // get data
        const {
            email,
            firstName,
            lastName,
            message,
            phoneNo,
            countryCode
        } = req.body;

        const mailResponse = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(email,firstName,lastName,message,phoneNo,countryCode)
        );

        //console.log("Contact us email response: ", mailResponse);

        return res.status(200).json({
            success: true,
            message: "Mail sent successfully."
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Mail not sent."
        })
    }
}