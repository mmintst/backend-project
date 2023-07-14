"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.generateJwt = void 0;
const response_1 = __importDefault(require("../response"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authSecret = process.env.AUTH_SECRET || "express-demo";
function generateJwt(payload) {
    return jsonwebtoken_1.default.sign(payload, authSecret, {
        algorithm: "HS512",
        /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
        expiresIn: "12h",
        issuer: "express-demo",
        subject: "user-login",
        audience: "user",
    });
}
exports.generateJwt = generateJwt;
function authenticateJwt(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    try {
        if (!token) {
            return response_1.default.Unauthorized(res, "missing JWT token");
        }
        const decoded = jsonwebtoken_1.default.verify(token, authSecret);
        req.token = decoded;
        req.payload = {
            id: decoded["id"],
            username: decoded["username"],
        };
        return next();
    }
    catch (err) {
        console.error(`Auth failed for token ${token}: ${err}`);
        return response_1.default.Unauthorized(res, "authentication failed");
    }
}
exports.authenticateJwt = authenticateJwt;
//# sourceMappingURL=jwt.js.map