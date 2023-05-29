import CadastrarServicoControler from "../controllers/cadastrar-servico-controller";
import ServicoRepository from "../repositories/servico-repository";
import UserRepository from "../repositories/user-repository";
import CadastrarServicoSVC from "../services/cadastrar-servico-service";

class CadastrarServicoComposer {
	static compose() {
		const servicoRepository = new ServicoRepository();
		const userRepository = new UserRepository();
		const cadastrarServicoSVC = new CadastrarServicoSVC(
			servicoRepository, userRepository
		);
		const cadastrarServicoController = new CadastrarServicoControler(
			cadastrarServicoSVC
		);

		return cadastrarServicoController;
	}
} 

export default CadastrarServicoComposer;