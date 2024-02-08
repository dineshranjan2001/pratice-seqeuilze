class ApiError{
    constructor(success,statusCode,message,timestamps){
        this.success=success;
        this.statusCode=statusCode;
        this.message=message;
        this.timestamps=timestamps;
    }
}

export {ApiError}