import {ApiResponse} from "./ApiResponse.js"
import { HTTPSTATUS, MESSAGE, STATUS } from "./Constant.js"
class ResponseHandler{
    static async successHandler(response,data){
        const apiResponse=new ApiResponse(STATUS.SUCCESS,HTTPSTATUS.OK,MESSAGE.SAVED,data,new Date().toISOString());
        response.status(HTTPSTATUS.OK).json(apiResponse);
    }

    static async updateHandler(response,data){
        const apiResponse=new ApiResponse(STATUS.SUCCESS,HTTPSTATUS.OK,MESSAGE.UPDATED,data,new Date().toISOString());
        response.status(HTTPSTATUS.OK).json(apiResponse);
    }

    static async deleteHandler(response,data){
        const apiResponse=new ApiResponse(STATUS.SUCCESS,HTTPSTATUS.OK,MESSAGE.DELETED,{},new Date().toISOString());
        response.status(HTTPSTATUS.OK).json(apiResponse);
    }
}


export {ResponseHandler}