import { iObterDadosClienteService, iUserRepository } from "../utils/interfaces";
import { User } from "../utils/types/user-types";

class ObterDadosClienteSVC implements iObterDadosClienteService {
	constructor(
    private userRepository: iUserRepository
	){}
  
	async obter(id: string): Promise<User | undefined> {
		const user = await this.userRepository.getUserById(id);

		return user;
	}
}

export default ObterDadosClienteSVC;