import { iEmailValidator, iCadastrarClienteService } from "../utils/interfaces";
import { HttpReq} from "../utils/types/http-types";
import HttpResponse from "../utils/helpers/htttp-response";

class CadastrarClienteController {
	constructor(private emailValidator: iEmailValidator, private cadastrarClienteService: iCadastrarClienteService){}

	async route(httpRequest: HttpReq){
		const {email, name, phone, password} = httpRequest.body;

		if(!this.emailValidator || !this.emailValidator.validateEmail)
			return HttpResponse.serverError();

		if(!this.cadastrarClienteService || !this.cadastrarClienteService.cadastrar)
			return HttpResponse.serverError();

		if(!email)
			return HttpResponse.badRequest("Email");
    
		if(!name)
			return HttpResponse.badRequest("Name");

		if(!phone)
			return HttpResponse.badRequest("Phone");

		if(!password)
			return HttpResponse.badRequest("Password");

		try {
			if(!this.emailValidator.validateEmail(email))
				return HttpResponse.unauthorized("Invalid Email");

			const token = await this.cadastrarClienteService.cadastrar(
				email,
				name,
				phone,
				password
			);
      
			if(!token)
				return HttpResponse.unauthorized("Email in use");
	
			return HttpResponse.ok({token});

		} catch (error) {
			console.error(error);
			return HttpResponse.serverError();
		}
	}
}



export default CadastrarClienteController;