//use catchAsync to get rid of the trycatch block
const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

class appError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const errorMessage  = ((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'; 

    res.status(err.statusCode).json({
        status: err.status, 
        message: err.message,
        stack: err.stack,
        error: err
    })
})

module.exports = {
    errorMessage,
    catchAsync,
    appError,
}