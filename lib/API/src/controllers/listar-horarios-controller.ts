import HttpResponse from "../utils/helpers/htttp-response";
import { iController, iListarHorariosService } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class ListarHorariosCTER implements iController {
	constructor(
    private listarHorariosService: iListarHorariosService
	){}

	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {date, funcionarioId} = httpRequest.body;

		if(!this.listarHorariosService || !this.listarHorariosService.listar)
			return HttpResponse.serverError();

		if(!date)
			return HttpResponse.badRequest("Date");

		if(!funcionarioId)
			return HttpResponse.badRequest("FuncionarioId");

		try {
			
			const serviceResult = await this.listarHorariosService.listar(date, funcionarioId);
			return HttpResponse.ok(serviceResult);
		
		} catch (error) {
			
			console.error(error);
			return HttpResponse.serverError();
		}
    
	}
}


export default ListarHorariosCTER;