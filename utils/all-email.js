const sendEmail_Funationality =async(req , res )=>{
    const finalRespons =  await sendEmail.Trigger_Email("shoaib")
    console.log("-----  finalRespons ------", finalRespons)
  
     res.send({
                msg : "email sent sucxessfullly",
                finalRespons : finalRespons 
              })
              
  }
  
  
 const sendOTP_ON_Email =async(req , res)=>{
    await Generate_OTP_Twillo(req, res)
   //await Generate_OTP_Fast2SMS(req, res)
  }


  module.exports ={
    sendEmail_Funationality : sendEmail_Funationality,
    sendOTP_ON_Email : sendOTP_ON_Email
  }