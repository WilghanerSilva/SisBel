import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iEncrypter, iLoginService, iTokenManager, iUserRepository } from "../utils/interfaces";
import { UserWithPassword } from "../utils/types/user-types";

class LoginService implements iLoginService {
	constructor(
    private userRepository: iUserRepository,
    private encrypter: iEncrypter,
    private  tokenManager: iTokenManager
	){}

	async auth(email: string, password: string): Promise<string> {
		if(!this.userRepository || !this.userRepository.getUserByEmail)
			throw new InvalidDependencyError("UserService");

		if(!this.encrypter || !this.encrypter.compare)
			throw new InvalidDependencyError("Encrypter");

		if(!this.tokenManager || !this.tokenManager.generate)
			throw new InvalidDependencyError("TokenManager");

		const user = await this.userRepository.getUserByEmail(email, true);

		if(!user)
			return "";
    
		const userWithPassword = user as UserWithPassword;

		const passwordIsValid = await this.encrypter.compare(
			password,
			userWithPassword.password
		);

		if(!passwordIsValid)
			return "";

		const token = this.tokenManager.generate(user.id);

		return token;
	}
}

export default LoginService;