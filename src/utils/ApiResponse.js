class ApiResponse{
    constructor(success,statusCode,message,data,timestamps){
        this.success=success,
        this.statusCode=statusCode,
        this.message=message,
        this.data=data,
        this.timestamps=timestamps
    }
}

export {ApiResponse}