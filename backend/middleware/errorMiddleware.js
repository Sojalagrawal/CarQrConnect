const notFound=(req,res,next)=>{
    const error=new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); //Calls the next function with the error object. This passes control to the next middleware or error-handling middleware in the Express pipeline. The error object contains information about the not-found condition, and it will be handled by subsequent error-handling middleware or the default Express error handler.Express will skip to the next error-handling middleware (or the default error handler if no error-handling middleware is defined), allowing you to handle the "not found" condition appropriately.
};

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200?500:res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==="production"?null:err.stack, //res.json({ message: err.message, stack: process.env.NODE_ENV === "production" ? null : err.stack });: Sends a JSON response containing error information. It includes the error message (err.message) and, in a non-production environment, the error stack trace (err.stack). In a production environment (NODE_ENV === "production"), the stack trace is set to null to avoid exposing sensitive information.
    });
};
module.exports={notFound,errorHandler};


//These error-handling middleware can be used by placing it at the end of the Express application's middleware stack. When an error occurs during the processing of a request, it triggers this middleware. The middleware sets the appropriate status code and sends a JSON response with error details, making it easier to diagnose and handle errors during development and providing a more user-friendly response in a production environment.