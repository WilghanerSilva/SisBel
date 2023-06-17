import ListarFuncionariosCTER from "../controllers/listar-funcionarios-controller";
import UserRepository from "../repositories/user-repository";
import ListarFuncionariosSVC from "../services/listar-funcionarios-service";

class ListarFuncionariosComposer {
	static compose(){
		const userRepository = new UserRepository();
		const listarFuncionariosService = new ListarFuncionariosSVC(userRepository);

		return new ListarFuncionariosCTER(listarFuncionariosService);
	}
}

export default ListarFuncionariosComposer;