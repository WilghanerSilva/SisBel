import { Agendamentos } from "@prisma/client";
import { iAgendamentoRepository, iListarAgendamentosService } from "../utils/interfaces";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";

class ListarAgendamentosSVC implements iListarAgendamentosService {
	constructor(private agendamentoRepository: iAgendamentoRepository){}
  
	async listar(userId: string): Promise<Agendamentos[]> {
		if(!this.agendamentoRepository || !this.agendamentoRepository.listByUserId)
			throw new InvalidDependencyError("Agendamento Repository");
    
		const agendamentos = await this.agendamentoRepository.listByUserId(userId);

		return agendamentos;
	}
}

export default ListarAgendamentosSVC;