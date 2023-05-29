import HttpResponse from "../utils/helpers/htttp-response";
import { iCadastrarServicoService, iController } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class CadastrarServicoControler implements iController {
	constructor(
    private cadastrarServicoService: iCadastrarServicoService
	){}
	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {name, audience, category} = httpRequest.body;
		const {userId} = httpRequest.headers;

		if(!this.cadastrarServicoService || !this.cadastrarServicoService.cadastrar)
			return HttpResponse.serverError();

		if(!name)
			return HttpResponse.badRequest("Name");

		if(!audience)
			return HttpResponse.badRequest("Audience");

		if(!category)
			return HttpResponse.badRequest("Category");

		if(!userId)
			return HttpResponse.unauthorized("É necessário que você seja um admin");

		try {
			const serviceResult = await this.cadastrarServicoService.cadastrar(
				userId,
				name,
				audience,
				category
			);
    
			if(!serviceResult)
				return HttpResponse.unauthorized("Já existe um serviço com esse nome");

			return HttpResponse.ok({});  
		} catch (error) {
			console.error(error);
			return HttpResponse.serverError();
		}
		
	}
}

export default CadastrarServicoControler;