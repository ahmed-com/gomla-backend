import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthenticateAccessMiddleware implements NestMiddleware{
    constructor(
        private autheService: AuthService
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.get('Authorization');
        if(!authHeader){
            next();
            return;
        }

        const accessToken = authHeader.split(' ')[1];
        if(!accessToken){
            next();
            return;
        }

        const payload = await this.autheService.verifyAccessToken(accessToken);
        req.userId = payload.sub;

        next();
    }
}