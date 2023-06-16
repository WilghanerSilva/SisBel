import { iController } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";
import iObterDadosClienteService from "../utils/interfaces/iObterDadosClienteService";
import HttpResponse from "../utils/helpers/htttp-response";

class ObterDadosClienteCTER implements iController{
	constructor(
    private obterDadosClienteService: iObterDadosClienteService
	){}
  
	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {userId} = httpRequest.headers;

		if(!this.obterDadosClienteService || !this.obterDadosClienteService.obter)
			return HttpResponse.serverError();

		if(!userId)
			return HttpResponse.serverError();

		try {
			const user = await this.obterDadosClienteService.obter(userId);

			if(!user)
				return HttpResponse.serverError();

			return HttpResponse.ok(user);
		} catch (error) {
			console.error(error);
			return HttpResponse.serverError();
		}

	}
}

export default ObterDadosClienteCTER;