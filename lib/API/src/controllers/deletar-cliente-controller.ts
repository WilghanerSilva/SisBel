import HttpResponse from "../utils/helpers/htttp-response";
import { iController, iDeletarClienteService } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class DeletarClienteController implements iController {
	constructor(
    private deletarClienteSVC: iDeletarClienteService
	){}

	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {userId} = httpRequest.headers;

		if(!this.deletarClienteSVC || !this.deletarClienteSVC.delete)
			return HttpResponse.serverError();

		if(!userId)
			return HttpResponse.unauthorized("Você não pode realizar essa ação");

		try {
			const serviceResult = await this.deletarClienteSVC.delete(userId);
      
			if(!serviceResult)
				return HttpResponse.unauthorized("Não foi possível deletar sua conta");

      
			return HttpResponse.ok({});

		} catch (error) {
			return HttpResponse.serverError();
		}

	}
}

export default DeletarClienteController;