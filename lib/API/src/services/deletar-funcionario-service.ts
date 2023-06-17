import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iDeletarFuncionarioService, iUserRepository } from "../utils/interfaces";

class DeletarFuncionarioSVC implements iDeletarFuncionarioService {
	constructor(
    private userRepository: iUserRepository
	){}
  
	async deletar(funcId: string, adminId: string): Promise<string> {
		if(!this.userRepository || !this.userRepository.getUserById || !this.userRepository.deleteFuncionario)
			throw new InvalidDependencyError("User Repository");

		if(funcId == adminId){
			const result = await this.userRepository.deleteFuncionario(funcId);

			if(!result)
				return "wrongFuncId";
        
			return "ok"; 
		}else{
			const user = await this.userRepository.getUserById(adminId);
      
			if(!user || user.profile !== "admin")
				return "isNotAdmin";
      
			const result = await this.userRepository.deleteFuncionario(funcId);

			if(!result)
				return "wrongFuncId";

			return "ok";
		}
	}
}


export default DeletarFuncionarioSVC;