import AgendamentoRepository from "../repositories/agendamento-repository";
import ListarHorarioSVC from "../services/listar-horarios-service";
import ListarHorariosCTER from "../controllers/listar-horarios-controller";

class ListarHorariosComposer {
	static compose(){
		const agendamentoRepository = new AgendamentoRepository();
		const listarHorariosSVC = new ListarHorarioSVC(agendamentoRepository);
    
		return new ListarHorariosCTER(listarHorariosSVC);
	}
}

export default ListarHorariosComposer;