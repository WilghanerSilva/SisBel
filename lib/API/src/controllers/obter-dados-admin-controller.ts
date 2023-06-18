import HttpResponse from "../utils/helpers/htttp-response";
import { iController } from "../utils/interfaces";
import iObterDadosAdminService from "../utils/interfaces/iObterDadosAdminService";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class ObterDadosAdminCTER implements iController {
	constructor(private obterDadosAdminSVC: iObterDadosAdminService){}

	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {userId} = httpRequest.headers;
    
		if(!this.obterDadosAdminSVC || !this.obterDadosAdminSVC.obter)
			return HttpResponse.serverError();
    
		try {
			const serviceResult = await this.obterDadosAdminSVC.obter(userId);

			if(serviceResult.message === "isNotAdmin" || !serviceResult.admin)
				return HttpResponse.unauthorized("O usuário não é um admin");

			return HttpResponse.ok({
				name: serviceResult.admin.nome,
				email: serviceResult.admin.email,
				id: serviceResult.admin.id,
				profile: serviceResult.admin.perfil
			});    
		} catch (error) {
			console.error(error);
			return HttpResponse.serverError();
		}
	}
}

export default ObterDadosAdminCTER;