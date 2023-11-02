const sendResponse = async (req, res, errCode, Msg, errMsg) => {
  // req,
  // res ,
  // 200,
  // "Hellow World !" ,
  // [{Sucess :"Yes You Got It !"}]
  var status;

  res.status(errCode ? errCode : 200).send({
    status: errCode ? errCode : 200,
    Msg,
    errMsg,
  });
};

module.exports = {
  sendResponse: sendResponse,
};
