import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors"

import { newRepositoryUser } from "./repositories/user";
import { newRepositoryContent } from "./repositories/content";

import { newHandlerUser } from "./handlers/user";
import { newHandlerContent } from "./handlers/content";
import { authenticateJwt } from "./auth/jwt";

async function main() {
    const db = new PrismaClient();

    const repoUser = newRepositoryUser(db);
    const handlerUser = newHandlerUser(repoUser);
    const repoContent = newRepositoryContent(db);
    const handlerContent = newHandlerContent(repoContent);

    const port = process.env.PORT || 8000;
    const server = express();
    server.use(express.json());
    server.use(cors());

    const authRouter = express.Router();
    const userRouter = express.Router();
    const contentRouter = express.Router();

    server.use("/user", userRouter);
    server.use("/content", contentRouter);
    server.use("/auth", authRouter)

    // Check server status
  server.get("/", (_, res) => {
    return res.status(200).json({ status: "ok" }).end();
  });

   // User API
   // POST /user
   userRouter.post("/", handlerUser.register.bind(handlerUser));

   // POST /auth/login
   authRouter.post("/login", handlerUser.login.bind(handlerUser));

   contentRouter.use(authenticateJwt)
   contentRouter.post("/", handlerContent.createContent.bind(handlerContent));
   contentRouter.get("/", handlerContent.getContents.bind(handlerContent))
   contentRouter.get("/:id", handlerContent.getContent.bind(handlerContent))
   contentRouter.delete("/:id", handlerContent.deleteContent.bind(handlerContent));

   server.listen(port, () => console.log(`server listening on ${port}`))
}

main();