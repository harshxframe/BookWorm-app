
export const apiResponse = (error=true, data, message="Null", code=501)=>{
    return {
        "error":error,
        "data":data,
        "message":message,
        "code":code
    };
}