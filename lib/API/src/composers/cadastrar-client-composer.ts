import CadastrarClienteController from "../controllers/cadastrar-cliente-controller";
import CadastrarClienteService from "../services/cadastrar-cliente-service";
import EmailValidator from "../utils/helpers/email-validator";
import UserRepository from "../repositories/user-repository";
import Encrypter from "../utils/helpers/encrypter";
import TokenManager from "../utils/helpers/token-manager";



class CadastrarClienteComposer {

	static compose(){
		const tokenManager = new TokenManager();
		const encrypter = new Encrypter();
		const emailValdator = new EmailValidator();
		const userRepository = new UserRepository();

		const cadastrarClienteService = new CadastrarClienteService(
			userRepository,
			tokenManager,
			encrypter
		);

		return  new CadastrarClienteController(
			emailValdator,
			cadastrarClienteService
		);
	}
}



export default CadastrarClienteComposer;