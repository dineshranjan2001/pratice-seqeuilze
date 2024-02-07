// Httpstatus code
const HTTPSTATUS = {
  OK: 200,
  CREATED: 201,
  NOCONTENT: 204,
  INTERNALSERVERERROR: 500,
  BADREQUEST: 400,
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
  FORBIDDEN: 403,
};

// httpstatus sucess status
const STATUS={
    SUCCESS:true,
    FAILED:false
}


// common messages for http response
const MESSAGE={
    ALLSUCCESS:"Api over all success status",
    ALLFAILED:"Api over all error status",
    UNAUTHORIZED:"You are not authorized",
    RETRIVED:"Data fetched successfully",
    SAVED:"Data saved successfully",
    NOTSAVED:"Data not saved",
    DELETED:"Data deleted successfully",
    NOTDELETED:"Data not deleted",
    DATANOTFOUND:"Data not found",
    UPDATED:"Data updated successfully",
    NOTUPDATED:"Data not updated",
    INTERNALSERVERERROR:"Internal Server Error",
    LOGGEDINSUCCESS:"Logged in successfully",
    INVALIDCREDENTIALS:"Invalid credentials",
    INVALID:"Please give valid data",
    SOMETHINGWRONG:"Something went wrong",


}


export {HTTPSTATUS,STATUS,MESSAGE}