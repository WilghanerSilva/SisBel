import ListarServicosCTER from "../controllers/listar-servicos-controller";
import ServicoRepository from "../repositories/servico-repository";
import ListarServicosSVC from "../services/listar-servicos-service";

class ListarServicosComposer {
	static compose() {
		const servicoRepository = new ServicoRepository();
		const listarServicosSVC = new ListarServicosSVC(servicoRepository);

		return new ListarServicosCTER(listarServicosSVC);
	}
}

export default ListarServicosComposer;