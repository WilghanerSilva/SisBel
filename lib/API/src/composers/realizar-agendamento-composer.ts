import RealizarAgendamentoSVC from "../services/realizar-agendamento-service";
import RealizarAgendamentoCTER from "../controllers/realizar-agendamento-controller";
import AgendamentoRepository from "../repositories/agendamento-repository";



class RealizarAgendamentoComposer {
	static compose(){
		const agendamentoRepository = new AgendamentoRepository();
		const realizarAgendamentoSVC = new RealizarAgendamentoSVC(
			agendamentoRepository
		);

		return new RealizarAgendamentoCTER(
			realizarAgendamentoSVC
		);
	}
}

export default RealizarAgendamentoComposer;