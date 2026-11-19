"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.not_Found_error = exports.forbidden_error = exports.unAuthorized_error = exports.bad_Request_error = exports.Applecation_error = void 0;
class Applecation_error extends Error {
    status;
    constructor(message, status, cause) {
        super(message, { cause });
        this.status = status;
        this.name = this.constructor.name;
    }
}
exports.Applecation_error = Applecation_error;
class bad_Request_error extends Applecation_error {
    constructor(message = "Bad Request", cause) {
        super(message, 400, cause);
    }
}
exports.bad_Request_error = bad_Request_error;
class unAuthorized_error extends Applecation_error {
    constructor(message = "UnAuthorized", cause) {
        super(message, 401, cause);
    }
}
exports.unAuthorized_error = unAuthorized_error;
class forbidden_error extends Applecation_error {
    constructor(message = "Forbidden", cause) {
        super(message, 403, cause);
    }
}
exports.forbidden_error = forbidden_error;
class not_Found_error extends Applecation_error {
    constructor(message = "Not Found", cause) {
        super(message, 404, cause);
    }
}
exports.not_Found_error = not_Found_error;
