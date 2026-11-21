"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const handlingerror_1 = require("./common/handlingerror");
const success_response_1 = require("./common/exception/success.response");
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
const env_service_1 = require("./config/env.service");
const connection_1 = require("./database/connection");
const redis_service_1 = require("./common/service/redis.service");
const app = (0, express_1.default)();
const limit = (0, express_rate_limit_1.rateLimit)({
    windowMs: 10 * 60 * 1000, // 15 minutes
    limit: 200,
    message: "Too many requests "
});
app.use(express_1.default.json());
(0, connection_1.database_connection)();
redis_service_1.readis_service_instance.connect();
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use("/auth", auth_controller_1.default);
app.get("/", (req, res, next) => {
    // throw new not_Found_error()
    (0, success_response_1.success_response)({ res, message: "Server is running", data: "test" });
});
app.use(handlingerror_1.gloabal_handling_error);
app.listen(env_service_1.env.port, () => {
    console.log(`Server is running on port ${env_service_1.env.port}`);
});
