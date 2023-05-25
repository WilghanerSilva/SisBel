import HttpResponse from "../utils/helpers/htttp-response";
import { iController, iEmailValidator, iCadastrarFuncionarioService } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class CadastrarFuncionarioController implements iController {
	constructor(
		private emailValidator: iEmailValidator,
		private cadastrarFuncionarioService: iCadastrarFuncionarioService,
	){}

	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {
			name,
			email,
			password,
			phone,
			birthDate,
			cpf,
			adress,
			city
		} = httpRequest.body;

		const {userId} = httpRequest.headers;
    
		if(!this.emailValidator || !this.emailValidator.validateEmail)
			return HttpResponse.serverError();
    
		if(!this.cadastrarFuncionarioService || !this.cadastrarFuncionarioService.cadastrar)
			return HttpResponse.serverError();

		if(!name)
			return HttpResponse.badRequest("Name");
    
		if(!email)
			return HttpResponse.badRequest("Email");
    
		if(!password)
			return HttpResponse.badRequest("Password");

		if(!phone)
			return HttpResponse.badRequest("Phone");
    
		if(!birthDate)
			return HttpResponse.badRequest("Birth Date");

		if(!cpf)
			return HttpResponse.badRequest("CPF");

		if(!adress)
			return HttpResponse.badRequest("Adress");
    
		if(!city)
			return HttpResponse.badRequest("City");
    
		if(!userId)
			return HttpResponse.unauthorized("Id faltando");

		try {
			if(!this.emailValidator.validateEmail(email))
				return HttpResponse.unauthorized("Email inválido");
    
			const serviceResult = await this.cadastrarFuncionarioService.cadastrar(
				userId,
				{
					email,
					password,
					name,
					phone,
					adress,
					birthDate,
					cpf,
					city
				}
			);

			if(serviceResult === "isNotAdmin")
				return HttpResponse.unauthorized("O usuário não é um admin");

			if(serviceResult === "emailInUse")
				return HttpResponse.unauthorized("O email já foi utilizado em outra conta");
    
			if(serviceResult === "invalidCPF")
				return HttpResponse.unauthorized("O cpf é inválido");

			return HttpResponse.ok({});

		} catch (error) {
			return HttpResponse.serverError();
		}

		
	}
}

export default CadastrarFuncionarioController;