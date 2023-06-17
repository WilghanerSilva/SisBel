import HttpResponse from "../utils/helpers/htttp-response";
import { iController, iListarFuncionariosService } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class ListarFuncionariosCTER implements iController {
	constructor(
    private listarFuncionariosSVC: iListarFuncionariosService
	){}
  
	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {category} = httpRequest.body;

		if(!this.listarFuncionariosSVC || !this.listarFuncionariosSVC.listar)
			return HttpResponse.serverError();

		try {
			const funcionarios = await this.listarFuncionariosSVC.listar(category);

			return HttpResponse.ok({funcionarios});
		} catch (error) {
			console.error(error);
			return HttpResponse.serverError();
		}
	}
}

export default ListarFuncionariosCTER;