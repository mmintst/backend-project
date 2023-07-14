"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status;
(function (Status) {
    Status["Ok"] = "ok";
    Status["Err"] = "error";
})(Status || (Status = {}));
var Codes;
(function (Codes) {
    Codes[Codes["Ok"] = 200] = "Ok";
    Codes[Codes["Created"] = 201] = "Created";
    Codes[Codes["BadRequest"] = 400] = "BadRequest";
    Codes[Codes["Unauthorized"] = 401] = "Unauthorized";
    Codes[Codes["NotFound"] = 404] = "NotFound";
    Codes[Codes["InternalServerError"] = 500] = "InternalServerError";
})(Codes || (Codes = {}));
var Bodies;
(function (Bodies) {
    Bodies["NotImplemented"] = "api not yet implemented";
    Bodies["MissingField"] = "missing field";
    Bodies["MissingParam"] = "missing param";
})(Bodies || (Bodies = {}));
class JsonResp {
    constructor(code, body) {
        this.code = code;
        this.body = body;
        if (code < 400) {
            this.status = Status.Ok;
            return;
        }
        this.status = Status.Err;
    }
    async marshal(res, fieldName) {
        return res
            .status(this.code)
            .json(Object.fromEntries(new Map()
            .set("status", this.status)
            .set(fieldName, this.body)))
            .end();
    }
}
async function NotImplemented(res, usecase) {
    return new JsonResp(Codes.InternalServerError, Bodies.NotImplemented.toString() + `: ${usecase}`).marshal(res, "error");
}
async function MissingField(res, field) {
    const body = `${Bodies.MissingField}: '${field}'`;
    return new JsonResp(Codes.BadRequest, body).marshal(res, "error");
}
async function MissingParam(res, param) {
    const body = `${Bodies.MissingParam}: '${param}'`;
    return new JsonResp(Codes.BadRequest, body).marshal(res, "error");
}
async function Ok(res, body) {
    return new JsonResp(Codes.Ok, body).marshal(res, "data");
}
async function Created(res, body) {
    return new JsonResp(Codes.Created, body).marshal(res, "resource");
}
async function NotFound(res, body) {
    return new JsonResp(Codes.NotFound, body).marshal(res, "message");
}
async function InternalServerError(res, body) {
    return new JsonResp(Codes.InternalServerError, body).marshal(res, "message");
}
async function Unauthorized(res, body) {
    return new JsonResp(Codes.Unauthorized, body).marshal(res, "reason");
}
exports.default = {
    NotImplemented,
    MissingField,
    MissingParam,
    Ok,
    Created,
    NotFound,
    InternalServerError,
    Unauthorized,
    Status,
};
//# sourceMappingURL=response.js.map