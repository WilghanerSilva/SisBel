import { iEmailValidator, iCadastrarClienteService } from "../utils/interfaces";
import { HttpReq} from "../utils/types/http-types";
import HttpResponse from "../utils/helpers/htttp-response";

class CadastrarClienteCTER {
	constructor(private emailValidator: iEmailValidator, private cadastrarClienteSVC: iCadastrarClienteService){}

	async run(httpRequest: HttpReq){
		const {email, name, phone, password} = httpRequest.body;

		if(!this.emailValidator || !this.emailValidator.validateEmail)
			return HttpResponse.serverError();

		if(!this.cadastrarClienteSVC || !this.cadastrarClienteSVC.cadastrar)
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
				return HttpResponse.unauthorized("O email fornecido é invalido");

			const result = await this.cadastrarClienteSVC.cadastrar(
				email,
				name,
				phone,
				password
			);
      
			if(!result)
				return HttpResponse.unauthorized("O email fornecido já foi cadastrado");
	
			return HttpResponse.ok({...result});

		} catch (error) {
			return HttpResponse.serverError();
		}
	}
}



export default CadastrarClienteCTER;