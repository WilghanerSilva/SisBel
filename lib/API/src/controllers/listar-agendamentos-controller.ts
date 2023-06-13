import HttpResponse from "../utils/helpers/htttp-response";
import { iController, iListarAgendamentosService } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class ListarAgendamentosCTER implements iController {
	
	constructor(private listarAgendamentosSVC: iListarAgendamentosService){}
  
	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {id} = httpRequest.body;

		if(!this.listarAgendamentosSVC || !this.listarAgendamentosSVC.listar)
			return HttpResponse.serverError();

		if(!id)
			return HttpResponse.badRequest("ID");


		try {
			const serviceResult = await this.listarAgendamentosSVC.listar(id);

			return HttpResponse.ok(serviceResult);
		} catch (error) {
			console.error(error);
			return HttpResponse.serverError();
		}
	}
}

export default ListarAgendamentosCTER;