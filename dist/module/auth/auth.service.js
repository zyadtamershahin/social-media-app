"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth_service = void 0;
class Auth_service {
    async Login(data) {
        let { name, age, email, password } = data;
        return data;
    }
}
exports.Auth_service = Auth_service;
const auth_service = new Auth_service();
exports.default = auth_service;
