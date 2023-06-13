import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iDeletarClienteService, iUserRepository } from "../utils/interfaces";

class DeletarClienteSVC implements iDeletarClienteService {
	constructor(private userRepository: iUserRepository){}

	async delete(id: string): Promise<boolean> {
		if(!this.userRepository || !this.userRepository.deleteCliente)
			throw new InvalidDependencyError("User Repository");
    
		const user = await this.userRepository.getUserById(id);

		if(!user)
			return false;

		if(user.profile != "cliente")
			return false;

		await this.userRepository.deleteCliente(id);

		return true;
	}
}

export default DeletarClienteSVC;