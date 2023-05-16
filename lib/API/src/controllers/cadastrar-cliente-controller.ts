import { iEmailValidator, iCadastrarClienteService } from "../utils/interfaces";
import { HttpReq} from "../utils/types/http-types";
import HttpResponse from "../utils/helpers/htttp-response";

class CadastrarClienteController {
	constructor(private emailValidator: iEmailValidator, private cadastrarClienteService: iCadastrarClienteService){}

	route(httpRequest: HttpReq){
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
	
		return HttpResponse.ok({});
	}
}



export default CadastrarClienteController;