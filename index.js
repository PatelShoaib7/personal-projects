const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cloudinary = require("cloudinary");
const PORT = process.env.PORT;
const { userRoutes } = require("./Routes/user-routes");
const { adminRoutes } = require("./Routes/admin-routes");
const { connection } = require("./config/dataBase");
const utils = require("./utils/utils");
const {verifyOrigin} = require("./config/verifyOrigin");
const  Open_AuthRouter  = require("./Routes/open-auth-routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
(bodyParser = require("body-parser")),
  //VERIFY ORIGINS
  app.use(cors());
app.use("/open", Open_AuthRouter);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);


/* error handling for 404 routes */
app.use(function (req, res, next) {
  var err = new Error("request not found");
  err.status = 404;

  if(req.url ==  process.env.PRODUCTION_SERVER){
    res.status(err.status || 500).send({
                                        errCode: 23,
                                        errMsg: "!Hello World Application Depeloyedd Suceefully",
                                      });
  }
  return res.status(err.status || 500).send({
                                        errCode: 23,
                                        errMsg: "request not found",
                                      });
  });

app.listen(PORT || 8000, async (req, res) => {
  console.log("----  App  Started Running -----");
  await connection;
  try {
    if (!connection) {
      utils.sendResponse(req, res, 200, "Error In Conneting DataBase", [
        { Sucess: "--- DataBase Connection Error -----" },
      ]);
    }
    console.log("----- Conneted To DataBase ------")
    console.log(`----- Port Started Running on Port ${PORT} ----`);
  } catch (error) {
    if (!connection) {
      utils.sendResponse(req, res, error.errCode, error.errMsg);
    }
  }
});
