const express = require('express');
const accountSid = process.env.ACCOUNT_SID; // Replace with your Twilio account SID
const authToken =  process.env.AUTH_TOKEN; // Replace with your Twilio auth token
const twilio = require('twilio')(accountSid, authToken);
var fast2sms = require('fast-two-sms');


// // Generate and send OTP via SMS
const Generate_OTP_Twillo= async (req, res) => {
//   const phoneNumber = req.body.phoneNumber;
//   if (!phoneNumber) {
//     return res.status(400).json({ message: 'Phone number is required' });
//   }

      //Generate a random 4-digit OTP
     const otp = Math.floor(1000 + Math.random() * 900000);

//   // Send the OTP via SMS
  twilio.messages.create({
    body: `Your OTP is: ${otp}`,
    from: process.env.TWILIO_SENDER_NO, // Replace with your Twilio phone number
    to: "7620594587",
  })
  .then(message => {
    console.log(`OTP sent to 919156879709 : ${otp}`);
    res.status(200).json({ message: 'OTP sent successfully' , otp});
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Error sending OTP' });
  });
}

const Generate_OTP_Fast2SMS =async (req , res)=>{
     const otp = Math.floor(1000 + Math.random() * 900000);

var options = {
    authorization:"AOWFZJPDn6B5NpvShuUXCg0YzkcEixVeyL2dlTRj1o4fH93KGs46eyY8SLpM3sJtc0CGBZ7xAglPwFTr",
    message :`Hello Shoaib Here , Thank you for using My service. Your Otp is ${otp}`,
    numbers:["9156879709"],
};

  const final = await fast2sms.sendMessage(options)
  .then((response)=>{
        console.log("--------------response-----------",response);
       return response
        // res.send({errMsg :"Otp Has Been Sent Suceefully", response})
  })
  .catch((error)=>{
    return error
        console.log("--------------error----------",error)  
        res.send({errMsg :"Error In Sending The Response", error})

  })
  console.log("-------------final resonse----",final)
}


module.exports ={
    Generate_OTP_Twillo : Generate_OTP_Twillo,
    Generate_OTP_Fast2SMS : Generate_OTP_Fast2SMS
}