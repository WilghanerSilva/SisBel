import { Request, Response } from "express";
import AuthMiddleware from "../../middlewares/auth-middleware";
import TokenManager from "../helpers/token-manager";
import { HttpReq, HttpRes } from "../types/http-types";

const tokenManager = new TokenManager();
const authMiddleware = new AuthMiddleware(tokenManager);


class MiddlewareAdapter {
	static adapt(req: Request, res: Response, next:()=>void){
    
		const httpRequest : HttpReq = {
			body: req.body,
			headers: req.headers
		};
    
		const result = authMiddleware.verifyToken(httpRequest);

		if(typeof result === "string") {
			req.headers.userId = result;
			next();
		} else {
			const httpRes = result as HttpRes;

			res.status(httpRes.statusCode).send(httpRes.body);
		}
			
	}
}

export default MiddlewareAdapter;