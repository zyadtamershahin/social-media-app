"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const validation_service_1 = require("../../common/service/validation.service");
const auth_dto_1 = require("../auth/dto/auth.dto");
const router = (0, express_1.Router)();
router.post('/', (0, validation_service_1.validation)(auth_dto_1.signupSchema), async (req, res) => {
    let { name } = req.body;
    console.log(name);
    let data = await auth_service_1.default.Login(name);
    res.json(data);
});
exports.default = router;
