import HttpResponse from "../utils/helpers/htttp-response";
import { iController, iListarServicosService } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class ListarServicosCTER implements iController {
	constructor(
    private listarServicosSVC: iListarServicosService
	){}


	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {field, value} = httpRequest.body;

		if(!this.listarServicosSVC || !this.listarServicosSVC.listar)
			return HttpResponse.serverError();

		try {
			const servicos = await this.listarServicosSVC.listar(field, value);
			return HttpResponse.ok({servicos});

		} catch (error) {
			
			console.error(error);
			return HttpResponse.serverError();
		}
	}
}

export default ListarServicosCTER;