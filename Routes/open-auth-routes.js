const Open_AuthRouter  = require('express').Router()
const passport = require("../config/auth-helper");
const GoogleAuth  = require('../Authentication/google-o-auth');



Open_AuthRouter.get('/',function(req, res, next) { res.send("!Hello World")});
Open_AuthRouter.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));
Open_AuthRouter.get('/auth/google/callback', 
                                    passport.authenticate('google',
                                      { failureRedirect: 'open/save/oauth/user/data/failed' , 
                                        session:false}),
                                        function(req, res, next) {
                                                    res.send(
                                                    {
                                                        errMsg:"Suceefully Authenticated Plaese Wait You Will Be Redireted To Main page",
                                                        errCode:-1,
                                                        status :200,
                                                        userData : req.user
                                                    })
                                        })
Open_AuthRouter.get('/save/oauth/user/data/failed', GoogleAuth.Google_Authoriztaion_Failed);





module.exports= Open_AuthRouter 
