import {iTokenManager} from "../interfaces";
import MissingParamError from "../erros/missingparam-error";
import jwt from "jsonwebtoken";
import * as fs from "fs";

const publicKey = fs.readFileSync("../../../secrets/public.key", "utf8");
const privateKey = fs.readFileSync("../../../secrets/private.key", "utf8");

export default class TokenManager implements iTokenManager{
	generate(userId: string): string {
		if(!userId){throw new MissingParamError("userId");}
		const token = jwt.sign({userId}, privateKey, {
			expiresIn: "30m",
			algorithm: "RS256"
		});

		return token;
	}

	verify(token: string): string | {userId : string} {
		const decoded = jwt.verify(token, publicKey, {algorithms: ["RS256"]});
    
		if(typeof decoded === "string")
			return decoded;

		const {userId} = decoded;
		return {userId : userId as string};
	}
}