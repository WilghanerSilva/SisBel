import ListarAgendamentosCTER from "../controllers/listar-agendamentos-controller";
import AgendamentoRepository from "../repositories/agendamento-repository";
import ListarAgendamentosSVC from "../services/listar-agendamentos-service";

class ListarAgendamentosComposer {
	static compose(){
		const agendamentoRepository = new AgendamentoRepository();
		const listarAgendamentosSVC = new ListarAgendamentosSVC(agendamentoRepository);

		return new ListarAgendamentosCTER(listarAgendamentosSVC);
	}
}


export default ListarAgendamentosComposer;