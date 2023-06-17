import HttpResponse from "../utils/helpers/htttp-response";
import { iController, iRealizarAgendamentoSVC } from "../utils/interfaces";
import { HttpReq, HttpRes } from "../utils/types/http-types";

class RealizarAgendamentoCTER implements iController {
	constructor(
    private realizarAgendamentoSVC: iRealizarAgendamentoSVC
	){}

	async run(httpRequest: HttpReq): Promise<HttpRes> {
		const {date, time, details, funcionarioId, servicoId} = httpRequest.body;
		const {userId} = httpRequest.headers;

		if(!userId)
			return HttpResponse.unauthorized("Autenticação inválida");

		if(!this.realizarAgendamentoSVC || !this.realizarAgendamentoSVC.agendar)
			return HttpResponse.serverError();

		if(!date)
			return HttpResponse.badRequest("Date");

		if(!time)
			return HttpResponse.badRequest("Time");

		if(!funcionarioId)
			return HttpResponse.badRequest("Funcionario Id");

		if(!servicoId)
			return HttpResponse.badRequest("Servico Id");

		try {
			const serviceResult = await this.realizarAgendamentoSVC.agendar(
				date, time,funcionarioId, userId, details, servicoId
			);

			if(serviceResult === "InvalidDate")
				return HttpResponse.unauthorized("Data inválida");

			if(serviceResult === "BusyHours")
				return HttpResponse.unauthorized("O horário escolhido não está vago");

			return HttpResponse.ok({});
		} catch (error) {
			console.error(error);
			return HttpResponse.serverError();
		}

		
	}
}

export default RealizarAgendamentoCTER;