import CadastrarFuncionarioController from "../controllers/cadastrar-funcionario-controller";
import EmailValidator from "../utils/helpers/email-validator";
import CadastrarFuncionarioService from "../services/cadastrar-funcionario-service";
import UserRepository from "../repositories/user-repository";
import Encrypter from "../utils/helpers/encrypter";

class CadastrarFuncionarioComposer {
	static compose() {
		const emailValidator = new EmailValidator();
		const userRepository = new UserRepository();
		const encrypter = new Encrypter();
		const cadastrarFuncionarioService = new CadastrarFuncionarioService(
			encrypter, 
			userRepository
		);
		
		return new CadastrarFuncionarioController(
			emailValidator,
			cadastrarFuncionarioService
		);
	}
}

export default CadastrarFuncionarioComposer;