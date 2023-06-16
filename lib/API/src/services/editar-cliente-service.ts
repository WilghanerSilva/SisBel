import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iEncrypter, iUserRepository } from "../utils/interfaces";
import iEditarClienteService from "../utils/interfaces/iEditarClienteService";
import { User, UserWithPassword } from "../utils/types/user-types";

class EditarClienteSVC implements iEditarClienteService {
	constructor(
    private userRepository: iUserRepository,
    private encrypter: iEncrypter
	){}


	async editar(
		userId: string,
		data: {
      name?: string,
      password?: string,
      newPassword?: string,
      phone?: string
    }
  
	): Promise<{ user?: User; message: string; }> {
		
		if(!this.userRepository || !this.userRepository.updateCliente)
			throw new InvalidDependencyError("User Repository");

		if(!this.encrypter || !this.encrypter.compare || !this.encrypter.crypt)
			throw new InvalidDependencyError("Encrypter");

		const user = await this.userRepository.getUserById(userId);

		if(!user)
			return {user: undefined, message:"invalidId"};

		const userWithPassword: UserWithPassword = await this.userRepository.getUserByEmail(user.email, true) as UserWithPassword;
		


		if(data.password && data.newPassword)
			if(!await this.encrypter.compare(data.password, userWithPassword.password))
				return {user: undefined, message:"invalidPassword"};
			else
				data.newPassword = await this.encrypter.crypt(data.newPassword);

		const definedData = {
			nome: data.name ? data.name : user.name,
			senha: data.newPassword ? data.newPassword : userWithPassword.password,
			telefone: data.phone ? data.phone : userWithPassword.phone
		};
    
		const repositoryResult = await this.userRepository.updateCliente(userId, definedData);

		if(!repositoryResult)
			return {user: undefined, message: ("invalidId")};

		return {user: repositoryResult, message: "ok"};
	}
}

export default EditarClienteSVC;