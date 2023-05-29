import HttpResponse from "../utils/helpers/htttp-response";
import { iController, iEmailValidator, iLoginService } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class LoginCTER implements iController {
	constructor(private loginSVC: iLoginService, private emailValidator: iEmailValidator){}

	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {email, password} = httpRequest.body;


		if(!this.emailValidator ||  !this.emailValidator.validateEmail)
			return HttpResponse.serverError();
    
		if(!this.loginSVC || !this.loginSVC.auth)
			return HttpResponse.serverError();

		if(!email)
			return HttpResponse.badRequest("Email");

		if(!password)
			return HttpResponse.badRequest("Password");
      
		try {
			if(!this.emailValidator.validateEmail(email))
				return HttpResponse.unauthorized("O email fornecido é inválido");
			
			const token = await this.loginSVC.auth(email, password);
      
			console.log(!token); 

			if(!token)
				return HttpResponse.unauthorized("Senha ou email errados");

			return HttpResponse.ok({token});  
		} catch (error) {
			return HttpResponse.serverError();
		}

	}
}

export default LoginCTER;