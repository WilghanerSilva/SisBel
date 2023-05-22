import LoginController from "../controllers/login-controller";
import EmailValidator from "../utils/helpers/email-validator";
import LoginService from "../services/login-service";
import Encrypter from "../utils/helpers/encrypter";
import UserRepository from "../repositories/user-repository";
import TokenManager from "../utils/helpers/token-manager";


class LoginComposer {
	static compose(){
		const tokenManager = new TokenManager();
		const userRepository = new UserRepository();
		const encrypter = new Encrypter();
		const loginService = new LoginService(userRepository, encrypter, tokenManager);

		const emailValidator = new EmailValidator();
		const loginController =  new LoginController(loginService, emailValidator);

		return loginController;
	}
}

export default LoginComposer;