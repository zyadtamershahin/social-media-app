"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success_response = void 0;
const success_response = ({ res, message = "Done", status = 200, data }) => {
    res.status(status).json({ message, data });
};
exports.success_response = success_response;
