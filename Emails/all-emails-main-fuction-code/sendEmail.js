var nodemailer = require("nodemailer");


const Trigger_Email = async(emailid, subject, mailBody, carbonCopy = [], attachment = false)=>{
    var transporter = await nodemailer.createTransport(
        {
          host:process.env.EMAIL_SERVICE_PROVIDER,
          port:process.env.EMAIL_ID_PORT,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER_EMAIL_ID,
            pass: process.env.EMAIL_ID_PASSWORD
          }
        }
      );
      console.log("Into the utils and the attachment is this : ", attachment )
      // test One case
      // content: Buffer.from(JSON.stringify(attachment.data, 'base64')) // The actual file blob data
      // test two case
      // content: Buffer.from(attachment.data, 'base64') // The actual file blob data
    try {
        new Promise((resolve, reject) => {
        transporter.sendMail(
          {
            from: process.env.TRANPORTOR_EMAIL_ID_FROM,
            to: "shoaib.patel@iorta.in",  // add user email id
            cc: carbonCopy,
            subject: "Regarding Testing",
            text:"Hiii Shoaib Bhai Email Is working Fine" ,
            //IF ATTCHMENT IS REQUIRED
            attachments:  (attachment ? [
              {
                filename: attachment?.fileName,          // Change the filename accordingly
                content: Buffer.from(attachment.data)   // The actual file blob data
              }
            ] : [] )
          }, function (error,emailResult) {
            if (error) {
                    console.log("-----The error occured during the email sending operation ---- : ", error);
                    reject(error);
                    return error;
            } else {
                    console.log("-----Mail is sent succesfully----",emailResult)
                    resolve("Mail is sent succesfully" );
                    transporter.close();
                    return 
            }
          });
      })
    
    } catch (error) {
       console.log("-----The error occured during the email sending operation---- : ", error);
      return await error;
    }
  }

module.exports ={
  Trigger_Email : Trigger_Email
}

