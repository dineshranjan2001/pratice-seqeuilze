import {ApiResponse} from "./ApiResponse.js"
import { HTTPSTATUS, MESSAGE, STATUS } from "./Constant.js"
export class ResponseHandler{
    static async successSaveHandler(response,data){
        const apiResponse=new ApiResponse(STATUS.SUCCESS,HTTPSTATUS.OK,MESSAGE.SAVED,data,new Date().toISOString());
        response.status(HTTPSTATUS.OK).json(apiResponse);
    }

    static async successUpdateHandler(response,data){
        const apiResponse=new ApiResponse(STATUS.SUCCESS,HTTPSTATUS.OK,MESSAGE.UPDATED,data,new Date().toISOString());
        response.status(HTTPSTATUS.OK).json(apiResponse);
    }

    static async successDeleteHandler(response,data){
        const apiResponse=new ApiResponse(STATUS.SUCCESS,HTTPSTATUS.OK,MESSAGE.DELETED,{},new Date().toISOString());
        response.status(HTTPSTATUS.OK).json(apiResponse);
    }

    static async successRetrivedHandler(response,data){
        const apiResponse=new ApiResponse(STATUS.SUCCESS,HTTPSTATUS.OK,MESSAGE.RETRIVED,data,new Date().toISOString());
        response.status(HTTPSTATUS.OK).json(apiResponse);
    }
    static async successFileUploadHandler(response,data){
        const apiResponse=new ApiResponse(STATUS.SUCCESS,HTTPSTATUS.OK,MESSAGE.FILE_UPLOADED,data,new Date().toISOString());
        response.status(HTTPSTATUS.OK).json(apiResponse);
    }
    static async successFileUpdateHandler(response,data){
        const apiResponse=new ApiResponse(STATUS.SUCCESS,HTTPSTATUS.OK,MESSAGE.FILE_UPDATED,data,new Date().toISOString());
        response.status(HTTPSTATUS.OK).json(apiResponse);
    }
}


export const {successSaveHandler,successUpdateHandler,successDeleteHandler,successRetrivedHandler,successFileUploadHandler,successFileUpdateHandler}=ResponseHandler;