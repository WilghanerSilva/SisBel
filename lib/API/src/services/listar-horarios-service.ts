import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iAgendamentoRepository, iListarHorariosService } from "../utils/interfaces";

class ListarHorarioSVC implements iListarHorariosService {
	constructor(private agendamentoRepository: iAgendamentoRepository){}
  
	async listar(date: string, funcionarioId: string): Promise<string[]> {
		if(!this.agendamentoRepository || !this.agendamentoRepository.listByDay)
			throw new InvalidDependencyError("Agendamento Repository");
    
		const convertedDate = new Date(date);

		let schedules = ["08:00", "09:00", "10:00", "11:00", "13:00", "16:00"];

		const busySchedules = await this.agendamentoRepository.listByDay(convertedDate, funcionarioId);
    
		busySchedules.forEach(item => {
			schedules = schedules.filter(time => item != time);
		});


		return schedules;
	}
}

export default ListarHorarioSVC;