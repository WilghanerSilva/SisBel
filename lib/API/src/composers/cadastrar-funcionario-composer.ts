import CadastrarFuncionarioCTER from "../controllers/cadastrar-funcionario-controller";
import EmailValidator from "../utils/helpers/email-validator";
import CadastrarFuncionarioSVC from "../services/cadastrar-funcionario-service";
import UserRepository from "../repositories/user-repository";
import Encrypter from "../utils/helpers/encrypter";

class CadastrarFuncionarioComposer {
	static compose() {
		const emailValidator = new EmailValidator();
		const userRepository = new UserRepository();
		const encrypter = new Encrypter();
		const cadastrarFuncionarioSVC= new CadastrarFuncionarioSVC(
			encrypter, 
			userRepository
		);
		
		return new CadastrarFuncionarioCTER(
			emailValidator,
			cadastrarFuncionarioSVC
		);
	}
}

export default CadastrarFuncionarioComposer;