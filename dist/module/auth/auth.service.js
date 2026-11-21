"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_service = void 0;
const dataBase_repository_1 = require("../../database/repository/dataBase.repository");
const user_model_1 = require("../../database/model/user.model");
class auth_service {
    authrepository;
    constructor() {
        this.authrepository = new dataBase_repository_1.DataBaseRepository(user_model_1.UserModel);
    }
    async Login(data) {
        let dataa = await this.authrepository.create(data);
        return dataa;
    }
}
exports.auth_service = auth_service;
const auth_service_instance = new auth_service();
exports.default = auth_service_instance;
