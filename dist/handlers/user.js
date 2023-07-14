"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newHandlerUser = void 0;
const bcrypt_1 = require("../auth/bcrypt");
const jwt_1 = require("../auth/jwt");
function newHandlerUser(repo) {
    return new HandlerUser(repo);
}
exports.newHandlerUser = newHandlerUser;
class HandlerUser {
    constructor(repo) {
        this.repo = repo;
    }
    async register(req, res) {
        const { username, name, password } = req.body;
        if (!username || !name || !password) {
            return res
                .status(400)
                .json({ error: "missing username, or name, or password in body" })
                .end();
        }
        try {
            const user = await this.repo.createUser({
                username,
                name,
                password: await (0, bcrypt_1.hashPassword)(password)
            });
            return res
                .status(201)
                .json({ ...user, password: undefined })
                .end();
        }
        catch (err) {
            const errMsg = `failed to create user: ${username}`;
            console.error({ error: `${errMsg}: ${err}` });
            return res.status(500).json({ error: errMsg }).end();
        }
    }
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "missing username or password in body" })
                .end();
        }
        try {
            const user = await this.repo.getUser(username);
            if (!user) {
                return res
                    .status(404)
                    .json({ error: `no such user: ${username}` })
                    .end();
            }
            if (await (0, bcrypt_1.compareHash)(password, user.password)) {
                return res
                    .status(401)
                    .json({ error: `invalid username or password` })
                    .end();
            }
            const token = (0, jwt_1.generateJwt)({ id: user.id, username: user.username });
            return res
                .status(200)
                .json({ status: `${username} logged in`, accessToken: token })
                .end();
        }
        catch (err) {
            console.error({ error: `failed to get user ${err}` });
            return res.status(500).json({ error: `failed to login` }).end();
        }
    }
}
//# sourceMappingURL=user.js.map