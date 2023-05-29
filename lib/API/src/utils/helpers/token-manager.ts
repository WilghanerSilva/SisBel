import {iTokenManager} from "../interfaces";
import MissingParamError from "../erros/missingparam-error";
import jwt from "jsonwebtoken";

const publicKey = process.env.public_key;
const privateKey = process.env.private_key;

export default class TokenManager implements iTokenManager{
	generate(userId: string): string {
		if(!privateKey)
			throw new Error("Missing privateKey");

		if(!userId){throw new MissingParamError("userId");}
		const token = jwt.sign({userId}, privateKey, {
			expiresIn: "30m",
			algorithm: "RS256"
		});

		return token;
	}

	verify(token: string): string | {userId : string} {
		if(!publicKey)
			throw new Error("Missing publicKey");
		
		const decoded = jwt.verify(token, publicKey, {algorithms: ["RS256"]});
    

		if(typeof decoded === "string")
			return decoded;

		const {userId} = decoded;
		return {userId : userId as string};
	}
}