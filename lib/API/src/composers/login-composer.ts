import LoginCTER from "../controllers/login-controller";
import EmailValidator from "../utils/helpers/email-validator";
import LoginSVC from "../services/login-service";
import Encrypter from "../utils/helpers/encrypter";
import UserRepository from "../repositories/user-repository";
import TokenManager from "../utils/helpers/token-manager";


class LoginComposer {
	static compose(){
		const tokenManager = new TokenManager();
		const userRepository = new UserRepository();
		const encrypter = new Encrypter();
		const loginSVC = new LoginSVC(userRepository, encrypter, tokenManager);

		const emailValidator = new EmailValidator();
		const loginCTER =  new LoginCTER(loginSVC, emailValidator);

		return loginCTER;
	}
}

export default LoginComposer;