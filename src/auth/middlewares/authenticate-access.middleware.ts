import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthenticateAccessMiddleware implements NestMiddleware{
    constructor(
        private autheService: AuthService
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        // if a bearer token were found in the request authorization header 
        // extract then validate using the authService
        // attach the userId to the request 
        
        next();
    }
}