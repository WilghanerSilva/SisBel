import HttpResponse from "../utils/helpers/htttp-response";
import { iController, iDeletarFuncionarioService } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class DeletarFuncionarioCTER implements iController {
	constructor(
    private deletarFuncionarioSVC: iDeletarFuncionarioService
	){}
  
	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {funcionarioId} = httpRequest.body;
		const {userId} = httpRequest.headers;

		if(!userId)
			return HttpResponse.serverError();
    
		const tempFuncionarioId = funcionarioId ? funcionarioId : userId;

		if(!this.deletarFuncionarioSVC || !this.deletarFuncionarioSVC.deletar)
			return HttpResponse.serverError();

		try {
			const serviceResult = await this.deletarFuncionarioSVC.deletar(tempFuncionarioId, userId);

			if(serviceResult === "isNotAdmin")
				return HttpResponse.unauthorized("É preciso ser um funcionário ou admin para deletar funcionários");
      
			if(serviceResult === "wrongFuncId")
				return HttpResponse.unauthorized("Um funcionário só pode deletar a própria conta");

			if(serviceResult === "missingFunc")
				return HttpResponse.unauthorized("O funcionário não foi encontrado");
      
			return HttpResponse.ok({});    
		} catch (error) {
			console.error(error);
			return HttpResponse.serverError();    
		}

	}
}

export default DeletarFuncionarioCTER;