import validator from "validator";
import {iEmailValidator} from "../interfaces";
import MissingParamError from "../erros/missingparam-error";

export default class EmailValidator implements iEmailValidator{
  
	validateEmail(email: string): boolean {
		if(!email){throw new MissingParamError("email");}
  
		return validator.isEmail(email);
	}
}