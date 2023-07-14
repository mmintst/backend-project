import { AuthRequest } from "../auth/jwt"
import { Response } from "express";

export interface IHandlerUser {
    register(req: Request, res: Response): Promise<Response>
    login(req: Request, res: Response): Promise<Response>
  }

export interface IHandlerContent {
    createContent(
        req: AuthRequest<{}, {}, {}, {}>,
        res: Response,
      ): Promise<Response>
    getContents(
        req: AuthRequest<{}, {}, {}, {}>,
        res: Response,
      ): Promise<Response>
    getContent(
        req: AuthRequest<{}, {}, {}, {}>,
        res: Response,
      ): Promise<Response>
    deleteContent(
        req: AuthRequest<{}, {}, {}, {}>,
        res: Response,
      ): Promise<Response>
}
