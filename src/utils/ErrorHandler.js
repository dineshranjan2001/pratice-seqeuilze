import { ApiError } from "./ApiError.js";
import { HTTPSTATUS, STATUS } from "./Constant.js";

export class ErrorHandler{
    static async serverError(response,error){
        const apiError=new ApiError(STATUS.FAILED,HTTPSTATUS.INTERNALSERVERERROR,error?.message,new Date().toISOString());
        response.status(HTTPSTATUS.INTERNALSERVERERROR).json(apiError);
    }

    static async fieldRequiredError(response,fieldName){
        const apiError=new ApiError(STATUS.FAILED,HTTPSTATUS.BADREQUEST,`${fieldName} is required`,new Date().toISOString());
        response.status(HTTPSTATUS.BADREQUEST).json(apiError);
    }

    static async fieldValueMismatchError(response,fieldName){
        const apiError=new ApiError(STATUS.FAILED,HTTPSTATUS.BADREQUEST,`Please give valid ${fieldName}`,new Date().toISOString());
        response.status(HTTPSTATUS.BADREQUEST).json(apiError);
    }

    static async allFieldsRequiredError(response){
        const apiError=new ApiError(STATUS.FAILED,HTTPSTATUS.BADREQUEST,`All fields are required`,new Date().toISOString());
        response.status(HTTPSTATUS.BADREQUEST).json(apiError);
    }

    static async userFound(response){
        const apiError=new ApiError(STATUS.FAILED,HTTPSTATUS.INTERNALSERVERERROR,"User already exit",new Date().toISOString());
        response.status(HTTPSTATUS.INTERNALSERVERERROR).json(apiError);
    }

    static async userNotSave(response){
        const apiError=new ApiError(STATUS.FAILED,HTTPSTATUS.INTERNALSERVERERROR,"User not saved",new Date().toISOString());
        response.status(HTTPSTATUS.INTERNALSERVERERROR).json(apiError);
    }
}

export const {serverError,fieldRequiredError,fieldValueMismatchError,allFieldsRequiredError,userFound,userNotSave}=ErrorHandler;