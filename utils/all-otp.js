

const sendOTP =async(req , res)=>{
    await Generate_OTP_Twillo(req, res)
   //await Generate_OTP_Fast2SMS(req, res)
  }