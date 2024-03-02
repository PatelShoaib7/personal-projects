module.exports = {
    ALPHA_ONLY: /^[a-zA-Z]+$/,
    // EMAIL: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    EMAIL: /^[A-Za-z0-9_.]+@[a-z]+[.][a-z]{2,3}$/,
    MOBILE_NO:  /^\d{9,12}$/,
    MOBILE_NO_0: /^(0|6|9)\d{9,12}$/,
    MOBILE_NO_9: /^(0|6|9)\d{9,12}$/,
    UID: /^PROF_[0-9]{6}_[0-9]{6}$/,
    ALPHA_SPACE: /^[a-zA-Z ]+$/,
    NUM_ONLY: /^[0-9]+$/,
    USERNAME: /^([6-9]{1}[0-9]{9}|[A-Za-z0-9._]+@[a-z]+[.][a-z]{2,3})$/,
    AADHAR_NO: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
    TIME: /^(1[0-2]|0?[1-9]):([0-5]?[0-9]) (AM|PM|am|pm)$/,
    DATE: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
    MONGO_OBJECT_ID: /^[0-9a-fA-F]{24}$/,
    EMP_CODE:  /^[a-zA-Z0-9]{8}$/,
    ALPHA_NUM: /^[a-zA-Z0-9]{6}$/,
    PAN_CARD_NO: /^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/,
    ABIB_EMAIL: /^[A-Za-z0-9_.]+@[a-z]+[.][a-z]{2,3}$/,
    AG_CODE:  /^[0-9]{8}$/,
    // ALPHA_NUM2: /^[a-zA-Z0-9]{8}$/,
    ALPHA_NUM2: /^(?!^\d+$)[a-zA-Z0-9]+$/,
    ALPHA_ONLY2: /^[a-zA-Z]{8}$/,
  
    USER_NAME: /^[a-zA-Z0-9]{8}$/,
    TIN_NUMBER: /^[a-zA-Z0-9]{10}$/,
    BANK_ACCOUNT:  /^[0-9]{20}$/,
    OONA_EMAIL:/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,5}$/,
    ROLE_CODE:  /^[0-9]{1,20}$/,
    ROLE_NAME : /^[A-Za-z ]{3,50}$/,
    DESIGNATION_NAME : /^[A-Za-z ]{3,100}$/,
  
    AGNTY2Y : /^[0-9-]+$/,
    ALLEMAILS : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    LEADEMAILFRMT : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    MILISECOND_DATE:/^\d{13}$/
  
  };
  
  // /^(0\d{12}|9\d{11})$/
  