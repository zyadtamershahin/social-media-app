"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gloabal_handling_error = void 0;
exports.gloabal_handling_error = ((err, req, res, next) => {
    console.log(err);
    // let stack = process.env.NODE_ENV === "dev" ? err.stack : null
    const cause = err.cause;
    const status = err.status || 500;
    // const extra= err.cause ? err.cause.extra : null
    res.status(status).json({ message: err.message, cause: err.cause, stack: err.stack });
});
