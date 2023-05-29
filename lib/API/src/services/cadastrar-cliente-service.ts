import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iUserRepository, iCadastrarClienteService, iTokenManager, iEncrypter } from "../utils/interfaces";

class CadastrarClienteSVC implements iCadastrarClienteService {
	constructor(
    private userRepository: iUserRepository, 
    private tokenManager: iTokenManager,
    private encrypter: iEncrypter  
	){}
  
	async cadastrar(email: string, name: string, phone: string, password: string): Promise<{profile: string, token: string} | null> {
		if(!this.userRepository || !this.userRepository.createCliente || !this.userRepository.getUserByEmail)
			throw new InvalidDependencyError("UserRepository");
    
		if(!this.tokenManager || !this.tokenManager.generate)
			throw new InvalidDependencyError("TokenManager");

		if(!this.encrypter || !this.encrypter.crypt)
			throw new InvalidDependencyError("Encrypter");

		if(await this.userRepository.getUserByEmail(email, false))
			return null;

		const user = await this.userRepository.createCliente({
			nome: name,
			email, 
			telefone: phone,
			senha: await this.encrypter.crypt(password),
			perfil: "cliente"
		});

		if(!user)
			throw new Error("An error occurred while creating the user");

		return {
			profile: user.profile,
			token: this.tokenManager.generate(user.id)
		};
	}
}


export default CadastrarClienteSVC;