import { Request, Response, NextFunction } from 'express';

// Your CustomError class (already provided)
class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Your error function (already provided)
function error(msg: string = 'Something Went Wrong', status: number = 500): CustomError {
    return new CustomError(msg, status);
}

// Global error handling middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // If response headers have already been sent, delegate to default Express error handler
    if (res.headersSent) {
        return next(err);
    }

    // Handle the error
    const status = err instanceof CustomError ? err.status : 500;
    const message = err instanceof CustomError ? err.message : 'Internal Server Error';
    const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;

    // Send error response
    res.status(status).json({
        success: false,
        status: status,
        error: {
            message: message,
            ...(stack && { stack: stack }) // Only include stack trace in development
        }
    });
};

// Export both the error function and errorHandler middleware
export { error, errorHandler };