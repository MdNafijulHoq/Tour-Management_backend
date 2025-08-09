"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (
// eslint-disable-next-line @typescript-eslint/no-unused-vars
error) => {
    return {
        statusCode: 400,
        message: "Invalid MongoDB ObjectId. Please provide a valid ID",
    };
};
exports.handleCastError = handleCastError;
