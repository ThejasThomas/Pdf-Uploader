"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const ErrorHandler_1 = require("../utils/ErrorHandler");
const globalErrorHandler = (err, req, res, next) => {
    console.error("🔥 Error:", err);
    if (err instanceof ErrorHandler_1.CustomError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
};
exports.globalErrorHandler = globalErrorHandler;
