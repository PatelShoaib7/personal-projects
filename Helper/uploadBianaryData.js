const cloudinary = require("cloudinary");


const getCDNurlFromBianarydata = (binaryData) => {
   
  
  cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      }); 

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        resolve(error);
      } else {
        resolve(result.secure_url);
      }
    });

    // Write the binary data to the upload stream
    uploadStream.write(binaryData);
    uploadStream.end();
  });
};

module.exports = {
  getCDNurlFromBianarydata: getCDNurlFromBianarydata,
};
