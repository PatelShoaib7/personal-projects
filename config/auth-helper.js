const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const userModel = require('../models/userModel');
const user = require('../api/pdf-merger/user');
const { componentsToColor } = require('pdf-lib');
const { Google_Authoriztaion } = require('../Authentication/google-o-auth');
const { default: mongoose } = require('mongoose');
const { propfind } = require('../Routes/open-auth-routes');

require('dotenv').config();

    passport.use(
        new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://persaonal-projecr-shoaib.onrender.com/auth/open/auth/google/callback',
        scope: ['profile','email']
      }, 
       async function(accessToken, refreshToken, profile, cb) {
        console.log("-----------------accessToken------------------------------------",accessToken)
        console.log("---------------------refreshToken--------------------------------",refreshToken)
      
        Check_User_Existance_AndSaveToDB(profile)
       
        return cb(null, profile , accessToken);
     
      }
    ));


 const Check_User_Existance_AndSaveToDB =async (profile)=>{
  console.log("-------------------------profile----------------------------",profile)
  JSON.stringify(  profile )
  const {name  , picture, id} = profile;
   const email  =profile?.emails 
                  && profile?.emails?.length  ? profile?.emails[0].value : null

  //INSERT EMAIL AT ROOT LEVAL
   profile.email = email

   //DELETING AND ADDING NEW ID CUSING === ERROR FROM MONDO DB _ID BSON TYPE ERROOR
   profile.uniquesIdByGoogle=id;
   delete profile.id;

   //ONLY ADD IN DB IF USER IN NOT PRESENT
   let find_User_Exist = await userModel.findOne({$and : [
                                                          {"uniquesIdByGoogle" : profile.uniquesIdByGoogle},
                                                          {"email":email }
                                                         ]})
   if(!find_User_Exist){
       let data = await userModel(profile)
       data.save()
   }
   return 
 }

module.exports = passport