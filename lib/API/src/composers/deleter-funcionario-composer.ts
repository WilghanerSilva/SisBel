import UserRepository from "../repositories/user-repository";
import DeletarFuncionarioSVC from "../services/deletar-funcionario-service";
import DeletarFuncionarioCTER from "../controllers/deletar-funcionario-controller";

class DeletarFuncionarioComposer {
	static compose(){
		const userRepository = new UserRepository();
		const deletarFuncionarioSvc = new DeletarFuncionarioSVC(userRepository);

		return new DeletarFuncionarioCTER(deletarFuncionarioSvc);
	}
}

export default DeletarFuncionarioComposer;