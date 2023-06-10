import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iAgendamentoRepository, iRealizarAgendamentoSVC } from "../utils/interfaces";


class RealizarAgendamentoSVC implements iRealizarAgendamentoSVC {
	constructor(
    private agendamentoRepository: iAgendamentoRepository
	){}

	async agendar(date: string, hours: string, funcionarioId: string, clienteId: string, details: string): Promise<string> {
		if(!this.agendamentoRepository || !this.agendamentoRepository.create)
			throw new InvalidDependencyError("Agendamento Repository");

		const dateConverted = new Date(date);

		const dateIsPassed = new Date() > dateConverted;

		if(dateIsPassed)
			return "InvalidDate";

		const isHourFree = await this.agendamentoRepository.checkHour(
			dateConverted,
			funcionarioId,
			hours
		);

		if(!isHourFree)
			return "BusyHours";

		const repositoryResult = await this.agendamentoRepository.create({
			clienteId,
			funcionarioId,
			data: dateConverted,
			horario: hours,
			detalhes: details
		});

		if(!repositoryResult)
			throw new Error("An error occurred while scheduling a new appointment");

		return "ok";
	}
}

export default RealizarAgendamentoSVC;