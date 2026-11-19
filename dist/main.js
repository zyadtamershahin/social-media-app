"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const handlingerror_1 = require("./common/handlingerror");
const success_response_1 = require("./common/exception/success.response");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", auth_controller_1.default);
app.get("/", (req, res, next) => {
    // throw new not_Found_error()
    (0, success_response_1.success_response)({ res, message: "Server is running", data: "test" });
});
app.use(handlingerror_1.gloabal_handling_error);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
