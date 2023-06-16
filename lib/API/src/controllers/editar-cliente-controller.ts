import HttpResponse from "../utils/helpers/htttp-response";
import { iController } from "../utils/interfaces";
import iEditarClienteService from "../utils/interfaces/iEditarClienteService";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class EditarClienteCTER implements iController {
	constructor(private editarClienteService: iEditarClienteService){}


	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {name, password, newPassword, phone} = httpRequest.body;
		const {userId} = httpRequest.headers;

		if(!this.editarClienteService || !this.editarClienteService.editar)
			return HttpResponse.serverError();
    
		if(!!newPassword && !password)
			return HttpResponse.unauthorized("É necessário enviar a senha atual para alterar a passada");

		if(!name && !password && !newPassword && !phone)
			return HttpResponse.badRequest("Todos os parametros");

		try {
			
			const serviceResult = await this.editarClienteService.editar(
				userId,
				{
					name,
					password,
					newPassword,
					phone
				}
			);

			if(serviceResult.message === "invalidPassword")
				return HttpResponse.unauthorized("Senha inválida");

			if(serviceResult.message === "invalidId")
				return HttpResponse.serverError();
		
			return HttpResponse.ok({user: serviceResult.user});
		} catch (error) {
			console.error(error);
			return HttpResponse.serverError();
		}
	}
}

export default EditarClienteCTER;