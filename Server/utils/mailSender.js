const nodemailer=require('nodemailer');
const SibApiV3Sdk = require('@getbrevo/brevo');
require("dotenv").config();
const mailSender=async (email,title,body)=>{
    try{
        // let transporter=nodemailer.createTransport({
        //     host:process.env.MAIL_HOST,
        //     auth:{
        //         user:process.env.MAIL_USER,
        //         pass:process.env.MAIL_PASS,
        //     },

           
        // })

        // let info=await transporter.sendMail({
        //     from:'StudyNotion - Aishwarya Chavan',ssss
        //     to:`${email}`,
        //     subject:`${title}`,
        //     html:`${body}`,
        // })
        //console.log("before info ");
        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        let apiKey = apiInstance.authentications['apiKey'];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
        sendSmtpEmail.subject =  `${title}`;
        sendSmtpEmail.htmlContent = `${body} `;
        sendSmtpEmail.sender = {email: process.env.MAIL_USER, name: "Admin"};
        sendSmtpEmail.to = [{email: email}];
  
        // Send the email
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("response of send mail",response);
        return response;
    }
    catch(error)
    {
        console.log("error is in email ",error);
        return error;
    }
}

module.exports=mailSender;