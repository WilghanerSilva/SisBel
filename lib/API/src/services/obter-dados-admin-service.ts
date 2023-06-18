import { Admin } from "@prisma/client";
import { iUserRepository } from "../utils/interfaces";
import iObterDadosAdminService from "../utils/interfaces/iObterDadosAdminService";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";

class ObterDadosAdminService implements iObterDadosAdminService {
	constructor(private userRepository: iUserRepository){}

	async obter(id: string): Promise<{ message: string; admin?: Omit<Admin, "senha">; }> {
		if(!this.userRepository || !this.userRepository.getUserById)
			throw new InvalidDependencyError("User Repository");
      
		const user = await this.userRepository.getUserById(id);
		
		console.log(user);

		if(!user || user.profile !== "admin")
			return {message: "isNotAdmin", admin: undefined};
    
		return {
			message: "ok", 
			admin: {
				email: user.email,
				id: user.id,
				nome: user.name,
				perfil: user.profile
			} 
		};
	}
}

export default ObterDadosAdminService;