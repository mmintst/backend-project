"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./repositories/user");
const content_1 = require("./repositories/content");
const user_2 = require("./handlers/user");
const content_2 = require("./handlers/content");
const jwt_1 = require("./auth/jwt");
async function main() {
    const db = new client_1.PrismaClient();
    const repoUser = (0, user_1.newRepositoryUser)(db);
    const handlerUser = (0, user_2.newHandlerUser)(repoUser);
    const repoContent = (0, content_1.newRepositoryContent)(db);
    const handlerContent = (0, content_2.newHandlerContent)(repoContent);
    const port = process.env.PORT || 8000;
    const server = (0, express_1.default)();
    server.use(express_1.default.json());
    server.use((0, cors_1.default)());
    const authRouter = express_1.default.Router();
    const userRouter = express_1.default.Router();
    const contentRouter = express_1.default.Router();
    server.use("/user", userRouter);
    server.use("/content", contentRouter);
    server.use("/auth", authRouter);
    // Check server status
    server.get("/", (_, res) => {
        return res.status(200).json({ status: "ok" }).end();
    });
    // User API
    // POST /user
    userRouter.post("/", handlerUser.register.bind(handlerUser));
    // POST /auth/login
    authRouter.post("/login", handlerUser.login.bind(handlerUser));
    contentRouter.use(jwt_1.authenticateJwt);
    contentRouter.post("/", handlerContent.createContent.bind(handlerContent));
    contentRouter.get("/", handlerContent.getContents.bind(handlerContent));
    contentRouter.get("/:id", handlerContent.getContent.bind(handlerContent));
    contentRouter.delete("/:id", handlerContent.deleteContent.bind(handlerContent));
    server.listen(port, () => console.log(`server listening on ${port}`));
}
main();
//# sourceMappingURL=index.js.map